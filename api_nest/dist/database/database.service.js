"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const main_config_1 = require("../configs/main.config");
const core_exception_1 = require("../core/exceptions/core.exception");
const _ = require("lodash");
const moment = require("moment");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(DatabaseService_1.name);
    }
    async findWithPagination(filters, query, columns, columnsOverwrite, groupBy) {
        const finalColumns = this.mergeColumns(columns, columnsOverwrite);
        if (finalColumns.length > 0) {
            query.select(finalColumns);
        }
        this.applyFilters(query, filters);
        if (groupBy) {
            query.groupBy(groupBy);
        }
        const [sql, parameters] = query.getQueryAndParameters();
        const countQuery = `SELECT COUNT(*) as row_total FROM (${sql}) as subquery`;
        this.applySort(query, filters);
        const limit = this.parseLimit(filters.limit);
        const pageNum = this.parsePage(filters.page);
        if (limit > 0) {
            query.limit(limit);
            query.offset((pageNum - 1) * limit);
        }
        const [list, countResult] = await Promise.all([
            query.getRawMany(),
            this.dataSource.query(countQuery, Object.values(parameters)),
        ]);
        const total = countResult && countResult[0]
            ? parseInt(countResult[0].row_total || '0')
            : 0;
        const listWithoutAlias = list.map((item) => {
            if (!query.alias || !item || Object.keys(item).length === 0) {
                return item;
            }
            const newItem = {};
            const aliasPrefix = `${query.alias}_`;
            Object.keys(item).forEach((key) => {
                if (key.startsWith(aliasPrefix)) {
                    const newKey = key.replace(aliasPrefix, '');
                    newItem[newKey] = item[key];
                }
                else {
                    newItem[key] = item[key];
                }
            });
            return newItem;
        });
        return this.paginateResponse(listWithoutAlias, total, limit, pageNum);
    }
    async findWithPaginationAndRelations(filters, query, columns, columnsOverwrite) {
        const finalColumns = this.mergeColumns(columns, columnsOverwrite);
        if (finalColumns.length > 0) {
            query.select(finalColumns);
        }
        this.applyFilters(query, filters);
        this.applySort(query, filters);
        const limit = this.parseLimit(filters.limit);
        const pageNum = this.parsePage(filters.page);
        if (limit > 0) {
            query.take(limit);
            query.skip((pageNum - 1) * limit);
        }
        const [list, total] = await query.getManyAndCount();
        return this.paginateResponse(list, total, limit, pageNum);
    }
    mergeColumns(columns, columnsOverwrite) {
        let finalColumns = columns || [];
        if (columnsOverwrite) {
            finalColumns = _.union(finalColumns, columnsOverwrite);
        }
        return finalColumns;
    }
    parseLimit(limit) {
        return Math.max(_.toNumber(limit) || 10, 0);
    }
    parsePage(page) {
        return Math.max(_.toNumber(page) || 1, 1);
    }
    paginateResponse(list, total, limit, currentPage) {
        const totalCurrent = list.length;
        const lastPage = limit > 0 ? Math.ceil(total / limit) : 1;
        const from = limit > 0 ? (currentPage - 1) * limit + 1 : 1;
        const to = limit > 0 ? Math.min(from + totalCurrent - 1, total) : total;
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
            from: total === 0 ? 0 : from,
            to: to,
            current_page: currentPage,
            next_page: currentPage < lastPage ? currentPage + 1 : currentPage,
            last_page: lastPage,
        };
    }
    applySort(query, filters) {
        if (filters.sort_column) {
            let sortColumn = filters.sort_column;
            if (!sortColumn.includes('.') && query.alias) {
                sortColumn = `${query.alias}.${sortColumn}`;
            }
            const sortDirection = _.includes(['ASC', 'DESC'], _.toUpper(filters.sort_direction))
                ? _.toUpper(filters.sort_direction)
                : 'ASC';
            query.orderBy(sortColumn, sortDirection);
        }
    }
    applyFilters(query, filters) {
        if (!filters.f || !Array.isArray(filters.f) || filters.f.length === 0) {
            return;
        }
        this.logger.debug(`Đang áp dụng filters: ${JSON.stringify(filters.f)}`);
        filters.f.forEach((item) => {
            const fieldName = item.field;
            const fieldNamePattern = /^[a-zA-Z0-9_\-\.]+$/;
            if (!fieldNamePattern.test(fieldName)) {
                throw new core_exception_1.HttpCoreException('Tên trường lọc chứa ký tự không hợp lệ', '400');
            }
            const operator = item.operator.toLowerCase();
            if (/ngay/.test(fieldName) &&
                operator === main_config_1.FILTER_OPERATOR.LESS_THAN_OR_EQUAL_TO) {
                item.value = moment(item.value)
                    .utcOffset('+0700')
                    .endOf('day')
                    .format('YYYY-MM-DD HH:mm:ss');
            }
            const paramName = `${fieldName.replace(/\./g, '_')}_${_.uniqueId()}`;
            switch (operator) {
                case main_config_1.FILTER_OPERATOR.EQUAL:
                case main_config_1.FILTER_OPERATOR.NOT_EQUAL:
                case main_config_1.FILTER_OPERATOR.LESS_THAN:
                case main_config_1.FILTER_OPERATOR.LESS_THAN_OR_EQUAL_TO:
                case main_config_1.FILTER_OPERATOR.GREATER_THAN:
                case main_config_1.FILTER_OPERATOR.GREATER_THAN_OR_EQUAL_TO: {
                    const operatorMap = {
                        [main_config_1.FILTER_OPERATOR.EQUAL]: '=',
                        [main_config_1.FILTER_OPERATOR.NOT_EQUAL]: '<>',
                        [main_config_1.FILTER_OPERATOR.LESS_THAN]: '<',
                        [main_config_1.FILTER_OPERATOR.LESS_THAN_OR_EQUAL_TO]: '<=',
                        [main_config_1.FILTER_OPERATOR.GREATER_THAN]: '>',
                        [main_config_1.FILTER_OPERATOR.GREATER_THAN_OR_EQUAL_TO]: '>=',
                    };
                    if (operatorMap[operator]) {
                        query.andWhere(`${fieldName} ${operatorMap[operator]} :${paramName}`, {
                            [paramName]: item.value,
                        });
                    }
                    break;
                }
                case main_config_1.FILTER_OPERATOR.CONTAIN:
                    query.andWhere(`${fieldName} LIKE :${paramName}`, {
                        [paramName]: `%${item.value}%`,
                    });
                    break;
                case main_config_1.FILTER_OPERATOR.EQUAL_TO: {
                    const start = moment(`${item.value} 00:00:01`)
                        .utcOffset('+0700')
                        .toDate();
                    const end = moment(`${item.value} 23:59:59`)
                        .utcOffset('+0700')
                        .toDate();
                    query.andWhere(`${fieldName} BETWEEN :${paramName}_start AND :${paramName}_end`, { [`${paramName}_start`]: start, [`${paramName}_end`]: end });
                    break;
                }
                case main_config_1.FILTER_OPERATOR.BETWEEN: {
                    let values = item.value;
                    if (_.isString(values)) {
                        try {
                            values = JSON.parse(values);
                        }
                        catch (e) {
                        }
                    }
                    if (Array.isArray(values) && values.length >= 2) {
                        query.andWhere(`${fieldName} BETWEEN :${paramName}_1 AND :${paramName}_2`, { [`${paramName}_1`]: values[0], [`${paramName}_2`]: values[1] });
                    }
                    break;
                }
                case main_config_1.FILTER_OPERATOR.INCLUDES: {
                    let values = item.value;
                    if (_.isString(values)) {
                        try {
                            values = JSON.parse(values);
                        }
                        catch (e) {
                            values = [values];
                        }
                    }
                    else {
                        values = _.castArray(values);
                    }
                    if (!Array.isArray(values) || values.length === 0) {
                        throw new core_exception_1.HttpCoreException(`Giá trị filter IN cho trường ${item.field} không hợp lệ`, '400');
                    }
                    query.andWhere(`${fieldName} IN (:...${paramName})`, {
                        [paramName]: values,
                    });
                    break;
                }
                default:
                    break;
            }
        });
    }
};
DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map