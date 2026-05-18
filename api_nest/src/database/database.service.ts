import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import { FILTER_OPERATOR } from '../configs/main.config';
import { HttpCoreException } from '../core/exceptions/core.exception';
import { FilterData } from './interfaces/filter-data.interface';
import * as _ from 'lodash';
import * as moment from 'moment';

//Interface định nghĩa kết quả trả về chuẩn cho phân trang.

export interface PaginationResult<T> {
  collection: T[];
  total: number;
  total_current: number;
  from: number;
  to: number;
  current_page: number;
  next_page: number;
  last_page: number;
}

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Phân trang dữ liệu sử dụng Raw Query (Truy vấn thô).
   *
   * Sử dụng phương thức này khi:
   * - Cần hiệu năng cao nhất (raw SQL thường nhanh hơn xử lý qua Entity).
   * - Câu truy vấn phức tạp mà QueryMapper của TypeORM xử lý không tối ưu.
   *
   * Lưu ý quan trọng:
   * - Kết quả trả về là dữ liệu thô (Raw Data), các field sẽ không được map thành Entity Object.
   * - Tên các field trả về sẽ theo tên cột trong database (hoặc alias nếu có).
   *
   * @param filters Dữ liệu bộ lọc, sắp xếp, phân trang nhận từ request (thường là Query Params).
   * @param query Đối tượng QueryBuilder đã được khởi tạo sẵn với câu query cơ bản.
   * @param columns Danh sách các cột muốn lấy ra (SELECT ...). Nếu không truyền sẽ lấy tất cả hoặc theo query gốc.
   * @param columnsOverwrite Danh sách các cột muốn lấy thêm hoặc ghi đè (kết hợp với param columns).
   * @param groupBy Câu lệnh GROUP BY (nếu cần gom nhóm dữ liệu).
   */
  async findWithPagination<T>(
    filters: FilterData,
    query: SelectQueryBuilder<T>,
    columns?: string[],
    columnsOverwrite?: string[],
    groupBy?: string,
  ): Promise<PaginationResult<any>> {
    // 1. Cấu hình các cột cần Select
    // Gộp danh sách columns và columnsOverwrite lại để tạo ra danh sách cuối cùng
    const finalColumns = this.mergeColumns(columns, columnsOverwrite);
    if (finalColumns.length > 0) {
      query.select(finalColumns);
    }

    // 2. Áp dụng Bộ lọc (Filters)
    // Phân tích filters.f và thêm các điều kiện WHERE vào query
    this.applyFilters(query, filters);

    // 3. Áp dụng Group By (nếu có)
    if (groupBy) {
      query.groupBy(groupBy);
    }

    // 4. Tính Tổng số bản ghi (Total Rows)
    // Để đếm chính xác khi có Group By hoặc các query phức tạp, ta dùng subquery.
    // Thực hiện truy vấn: SELECT COUNT(*) FROM (câu_query_gốc) as subquery
    const [sql, parameters] = query.getQueryAndParameters();
    const countQuery = `SELECT COUNT(*) as row_total FROM (${sql}) as subquery`;

    // 5. Áp dụng Sắp xếp (Sort)
    this.applySort(query, filters);

    // 6. Cấu hình Phân trang (Pagination) & Thực thi
    const limit = this.parseLimit(filters.limit); // Số lượng bản ghi mỗi trang
    const pageNum = this.parsePage(filters.page); // Trang hiện tại

    if (limit > 0) {
      query.limit(limit); // Thêm LIMIT vào query
      query.offset((pageNum - 1) * limit); // Thêm OFFSET vào query
    }

    // Thực thi song song (Parallel execution) để tối ưu thời gian:
    // - Task 1: Lấy danh sách dữ liệu (getQuery)
    // - Task 2: Đếm tổng số bản ghi (countQuery)
    const [list, countResult] = await Promise.all([
      query.getRawMany(), // Lấy dữ liệu dạng Raw
      this.dataSource.query(countQuery, Object.values(parameters)), // Thực thi câu SQL đếm raw
    ]);

    // Lấy giá trị tổng số dòng từ kết quả count
    const total =
      countResult && countResult[0]
        ? parseInt(countResult[0].row_total || '0')
        : 0;

    // Xử lý loại bỏ alias prefix trong tên cột (nếu có)
    const listWithoutAlias = list.map((item) => {
      // Nếu không có alias trong query hoặc item rỗng thì giữ nguyên
      if (!query.alias || !item || Object.keys(item).length === 0) {
        return item;
      }

      const newItem = {};
      const aliasPrefix = `${query.alias}_`;

      Object.keys(item).forEach((key) => {
        // Chỉ loại bỏ prefix nếu key thực sự bắt đầu bằng "alias_"
        if (key.startsWith(aliasPrefix)) {
          const newKey = key.replace(aliasPrefix, '');
          newItem[newKey] = item[key];
        } else {
          newItem[key] = item[key];
        }
      });

      return newItem;
    });

    // Trả về kết quả đã được format chuẩn
    return this.paginateResponse(listWithoutAlias, total, limit, pageNum);
  }

  /**
   * Phân trang dữ liệu và map về Entity (kèm Relations).
   *
   * Sử dụng phương thức này khi:
   * - Muốn làm việc với đối tượng Entity đầy đủ của TypeORM.
   * - Cần lấy cả các quan hệ (Relations) đi kèm (ví dụ: User kèm theo Profile, Role...).
   *
   * Lưu ý:
   * - Hiệu năng có thể thấp hơn findWithPagination một chút do overhead của việc mapping Entity.
   *
   * @param filters Dữ liệu bộ lọc, sắp xếp, phân trang.
   * @param query Đối tượng QueryBuilder ban đầu.
   * @param columns Danh sách các cột (thuộc tính) muốn select.
   * @param columnsOverwrite Các cột muốn select thêm.
   */
  async findWithPaginationAndRelations<T>(
    filters: FilterData,
    query: SelectQueryBuilder<T>,
    columns?: string[],
    columnsOverwrite?: string[],
  ): Promise<PaginationResult<T>> {
    // 1. Cấu hình các cột cần Select
    const finalColumns = this.mergeColumns(columns, columnsOverwrite);

    // Lưu ý: Với getMany (lấy Entity), việc select columns cần cẩn thận để map đúng vào property của Entity.
    if (finalColumns.length > 0) {
      query.select(finalColumns);
    }

    // 2. Áp dụng Bộ lọc (Filters)
    this.applyFilters(query, filters);

    // 3. Áp dụng Sắp xếp (Sort)
    this.applySort(query, filters);

    // 4. Cấu hình Phân trang
    const limit = this.parseLimit(filters.limit);
    const pageNum = this.parsePage(filters.page);

    if (limit > 0) {
      query.take(limit); // Tương đương LIMIT trong SQL
      query.skip((pageNum - 1) * limit); // Tương đương OFFSET trong SQL
    }

    // 5. Thực thi truy vấn
    // getManyAndCount: Trả về [danh_sách_entity, tổng_số_count]
    const [list, total] = await query.getManyAndCount();

    // Trả về kết quả format chuẩn
    return this.paginateResponse(list, total, limit, pageNum);
  }

  // --- Các hàm hỗ trợ (Helper Methods) ---

  /**
   * Gộp danh sách các cột cần select.
   * Sử dụng lodash union để loại bỏ trùng lặp.
   */
  private mergeColumns(
    columns?: string[],
    columnsOverwrite?: string[],
  ): string[] {
    let finalColumns = columns || [];
    if (columnsOverwrite) {
      finalColumns = _.union(finalColumns, columnsOverwrite);
    }
    return finalColumns;
  }

  /**
   * Parse và validate giá trị limit (số lượng bản ghi/trang).
   * Mặc định là 10 nếu không truyền hoặc không hợp lệ.
   */
  private parseLimit(limit?: number | string): number {
    return Math.max(_.toNumber(limit) || 10, 0);
  }

  /**
   * Parse và validate giá trị page (trang hiện tại).
   * Mặc định là 1 nếu không truyền hoặc không hợp lệ.
   */
  private parsePage(page?: number | string): number {
    return Math.max(_.toNumber(page) || 1, 1);
  }

  /**
   * Tính toán và format kết quả trả về theo chuẩn PaginationResult.
   */
  private paginateResponse<T>(
    list: T[],
    total: number,
    limit: number,
    currentPage: number,
  ): PaginationResult<T> {
    const totalCurrent = list.length;
    // Tính tổng số trang (Total Pages)
    const lastPage = limit > 0 ? Math.ceil(total / limit) : 1;
    // Tính chỉ số bắt đầu (From)
    const from = limit > 0 ? (currentPage - 1) * limit + 1 : 1;
    // Tính chỉ số kết thúc (To)
    const to = limit > 0 ? Math.min(from + totalCurrent - 1, total) : total;

    // Trường hợp đặc biệt: limit <= 0 (Lấy tất cả)
    if (limit <= 0) {
      return {
        collection: list,
        total: totalCurrent,
        total_current: totalCurrent,
        from: 1,
        to: totalCurrent,
        current_page: 1,
        next_page: 1,
        last_page: 1,
      };
    }

    return {
      collection: list,
      total: total,
      total_current: totalCurrent,
      from: total === 0 ? 0 : from, // Nếu không có dữ liệu thì from = 0
      to: to,
      current_page: currentPage,
      next_page: currentPage < lastPage ? currentPage + 1 : currentPage, // Tính trang tiếp theo
      last_page: lastPage,
    };
  }

  /**
   * Logic xử lý Sắp xếp (Sort).
   * Thêm mệnh đề ORDER BY vào query builder.
   */
  private applySort<T>(query: SelectQueryBuilder<T>, filters: FilterData) {
    if (filters.sort_column) {
      let sortColumn = filters.sort_column;
      // Nếu tên cột chưa có alias (vd "id") và query có alias (vd "user"),
      // tự động thêm alias vào (thành "user.id") để tránh lỗi ambiguous column.
      if (!sortColumn.includes('.') && query.alias) {
        sortColumn = `${query.alias}.${sortColumn}`;
      }

      // Kiểm tra hướng sắp xếp (ASC/DESC), mặc định ASC
      const sortDirection = _.includes(
        ['ASC', 'DESC'],
        _.toUpper(filters.sort_direction),
      )
        ? _.toUpper(filters.sort_direction)
        : 'ASC';

      query.orderBy(sortColumn, sortDirection as 'ASC' | 'DESC');
    }
  }

  /**
   * Logic xử lý Bộ lọc (Filter).
   * Duyệt qua mảng filters.f và thêm các điều kiện AND WHERE tương ứng vào query.
   */
  private applyFilters<T>(query: SelectQueryBuilder<T>, filters: FilterData) {
    if (!filters.f || !Array.isArray(filters.f) || filters.f.length === 0) {
      return;
    }

    this.logger.debug(`Đang áp dụng filters: ${JSON.stringify(filters.f)}`);

    filters.f.forEach((item) => {
      const fieldName = item.field;

      // Bảo mật: Kiểm tra tên field chỉ chứa ký tự cho phép để tránh SQL Injection cơ bản
      const fieldNamePattern = /^[a-zA-Z0-9_\-\.]+$/;
      if (!fieldNamePattern.test(fieldName)) {
        throw new HttpCoreException(
          'Tên trường lọc chứa ký tự không hợp lệ',
          '400',
        );
      }

      const operator = item.operator.toLowerCase();

      // Xử lý đặc biệt cho kiểu ngày tháng (Date)
      // Nếu lọc "nhỏ hơn hoặc bằng" (<=) ngày, tự động lấy đến cuối ngày đó (23:59:59)
      if (
        /ngay/.test(fieldName) &&
        operator === FILTER_OPERATOR.LESS_THAN_OR_EQUAL_TO
      ) {
        item.value = moment(item.value)
          .utcOffset('+0700')
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss');
      }

      // Tạo tên tham số (parameter name) unique cho query builder để tránh trùng lặp khi dùng nhiều filter
      const paramName = `${fieldName.replace(/\./g, '_')}_${_.uniqueId()}`;

      switch (operator) {
        // Các toán tử so sánh cơ bản
        case FILTER_OPERATOR.EQUAL: // =
        case FILTER_OPERATOR.NOT_EQUAL: // <>
        case FILTER_OPERATOR.LESS_THAN: // <
        case FILTER_OPERATOR.LESS_THAN_OR_EQUAL_TO: // <=
        case FILTER_OPERATOR.GREATER_THAN: // >
        case FILTER_OPERATOR.GREATER_THAN_OR_EQUAL_TO: {
          // >=
          const operatorMap = {
            [FILTER_OPERATOR.EQUAL]: '=',
            [FILTER_OPERATOR.NOT_EQUAL]: '<>',
            [FILTER_OPERATOR.LESS_THAN]: '<',
            [FILTER_OPERATOR.LESS_THAN_OR_EQUAL_TO]: '<=',
            [FILTER_OPERATOR.GREATER_THAN]: '>',
            [FILTER_OPERATOR.GREATER_THAN_OR_EQUAL_TO]: '>=',
          };

          if (operatorMap[operator]) {
            query.andWhere(
              `${fieldName} ${operatorMap[operator]} :${paramName}`,
              {
                [paramName]: item.value,
              },
            );
          }
          break;
        }

        // Toán tử tìm kiếm gần đúng (LIKE) - Case Insensitive thường dùng ILIKE (tùy DB), ở đây dùng LIKE theo config cũ
        case FILTER_OPERATOR.CONTAIN:
          query.andWhere(`${fieldName} LIKE :${paramName}`, {
            [paramName]: `%${item.value}%`,
          });
          break;

        // Toán tử bằng tuyệt đối (Xử lý cho khoảng thời gian trong ngày)
        // Ví dụ: Tìm ngày = '2023-01-01' => Tìm từ '2023-01-01 00:00:01' đến '2023-01-01 23:59:59'
        case FILTER_OPERATOR.EQUAL_TO: {
          const start = moment(`${item.value} 00:00:01`)
            .utcOffset('+0700')
            .toDate();
          const end = moment(`${item.value} 23:59:59`)
            .utcOffset('+0700')
            .toDate();
          query.andWhere(
            `${fieldName} BETWEEN :${paramName}_start AND :${paramName}_end`,
            { [`${paramName}_start`]: start, [`${paramName}_end`]: end },
          );
          break;
        }

        // Toán tử BETWEEN (Trong khoảng)
        // Giá trị value cần là mảng [min, max] hoặc chuỗi JSON mảng
        case FILTER_OPERATOR.BETWEEN: {
          let values = item.value;
          if (_.isString(values)) {
            try {
              values = JSON.parse(values);
            } catch (e) {
              /* ignore error */
            }
          }

          if (Array.isArray(values) && values.length >= 2) {
            query.andWhere(
              `${fieldName} BETWEEN :${paramName}_1 AND :${paramName}_2`,
              { [`${paramName}_1`]: values[0], [`${paramName}_2`]: values[1] },
            );
          }
          break;
        }

        // Toán tử IN (Nằm trong danh sách)
        case FILTER_OPERATOR.INCLUDES: {
          let values = item.value;
          // Xử lý nếu value là chuỗi JSON
          if (_.isString(values)) {
            try {
              values = JSON.parse(values);
            } catch (e) {
              values = [values]; // Nếu parse lỗi, coi như là 1 giá trị đơn
            }
          } else {
            values = _.castArray(values);
          }

          if (!Array.isArray(values) || values.length === 0) {
            throw new HttpCoreException(
              `Giá trị filter IN cho trường ${item.field} không hợp lệ`,
              '400',
            );
          }

          query.andWhere(`${fieldName} IN (:...${paramName})`, {
            [paramName]: values,
          });
          break;
        }

        default:
          // Bỏ qua các toán tử không hỗ trợ
          break;
      }
    });
  }
}
