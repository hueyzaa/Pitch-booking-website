import { getListData } from '@app/api/getData.api';
import ExcelIcon from '@app/assets/icons/excel.svg';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { notificationController } from '@app/controllers/notificationController';
import { hideLoading, showLoading } from '@app/utils/redux.utils';
import { camelCasePathUrl } from '@app/utils/utils';
import _ from 'lodash';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

interface Column {
  title: string | React.ReactNode;
  titleForExcel?: string;
  dataForExcel?: (records: any) => string;
  dataIndex?: string;
  align?: 'left' | 'right' | 'center';
  width?: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

interface TableProps {
  columns: Column[] | any[];
  fileName?: string;
  path: string;
  data?: any[];
  params: any;
  style?: CSSProperties;
}

const ExportTable: React.FC<TableProps> = ({ columns, fileName, path, params, style, data }) => {
  columns = columns.filter((item) => (item?.title?.toString() !== 'Hành động' && item.title) || item.titleForExcel);
  const tableRef = useRef<any>(null);
  const [dataExport, setDataExport] = useState<any[]>([]);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: fileName ? fileName : camelCasePathUrl(path),
    sheet: 'Sheet1'
  });

  const exportTable = async () => {
    try {
      showLoading();
      if (data) {
        setDataExport(data);
      } else {
        const danhSach = await getListData(path, { ...params, page: 1, limit: -1 });
        setDataExport(danhSach.data);
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message
      });
    } finally {
      hideLoading();
    }
  };

  const getColumnTitle = (column: Column) => {
    return column.titleForExcel || (typeof column.title === 'string' ? column.title : '');
  };

  const haslv2 = columns.some((column) => column.level2TitleRender && column.level2TitleRender.length > 0);
  const hasChildren = columns.some((column) => column.children && column.children.length > 0);

  useEffect(() => {
    if (dataExport?.length > 0) {
      onDownload();
      setDataExport([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataExport]);

  // Hàm xử lý giá trị để thêm dấu ' trước số điện thoại, CCCD
  const formatCellValue = (value: any, column: any) => {
    if (value === null || value === undefined) return '';

    // Kiểm tra nếu là cột SĐT, số điện thoại hoặc CCCD
    const columnTitle = column.title?.toString().toLowerCase() || '';
    if (
      columnTitle.includes('sđt') ||
      columnTitle.includes('số điện thoại') ||
      columnTitle.includes('cccd') ||
      columnTitle.includes('căn cước') ||
      columnTitle.includes('số tài khoản') ||
      columnTitle.includes('stk')
    ) {
      // Thêm dấu ' trước giá trị để Excel không chuyển thành số
      return `="${value}"`;
    }

    return value;
  };

  return (
    <>
      <BaseButton
        icon={<img src={ExcelIcon} alt='xuất file excel' width={30} height={30} />}
        type='text'
        size='small'
        onClick={exportTable}
        style={
          style
            ? style
            : {
                color: 'var(--green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
        }
      />
      <TableStyles>
        <table style={{ fontSize: '17.3px', fontFamily: 'Times New Roman' }} border={1} ref={tableRef}>
          <thead>
            <tr>
              {columns.map((column) => {
                if (column.children) {
                  return (
                    <th
                      key={uuidv4()}
                      align='center'
                      colSpan={column.children.length || 1}
                      style={{ width: column.width }}
                    >
                      {getColumnTitle(column)}
                    </th>
                  );
                } else {
                  return (
                    <th
                      key={uuidv4()}
                      align='center'
                      colSpan={column.level2TitleRender?.length || 1}
                      style={{ width: column.width }}
                    >
                      {getColumnTitle(column)}
                    </th>
                  );
                }
              })}
            </tr>
            {hasChildren && (
              <tr>
                {columns.map((column) => {
                  if (column.children) {
                    return column.children.map((child: any) => <th key={uuidv4()}>{child.title}</th>);
                  } else {
                    return <th key={uuidv4()}></th>;
                  }
                })}
              </tr>
            )}
            {haslv2 && (
              <tr>
                {columns.map((column) => {
                  if (column.level2TitleRender && column.level2TitleRender.length > 0) {
                    return (
                      <React.Fragment key={uuidv4()}>
                        {column.level2TitleRender.map((item: any) => (
                          <th align='center' style={{ width: item.width }}>
                            {item.title}
                          </th>
                        ))}
                      </React.Fragment>
                    );
                  }
                  return <th key={uuidv4()} style={{ display: 'none' }}></th>;
                })}
              </tr>
            )}
          </thead>
          <tbody>
            {dataExport?.map((record, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((column) => {
                  const { dataIndex, render } = column;
                  const value = dataIndex ? record[dataIndex] : record;
                  if (column?.level2TitleRender?.length > 0) {
                    return (
                      <>
                        {column?.level2TitleRender?.map((item: any) => {
                          const arr = value as any[];
                          return (
                            <td key={uuidv4()} style={{ textAlign: item?.align || 'left' }}>
                              {arr?.map((it: any) => (
                                <div key={uuidv4()}>
                                  {item.render
                                    ? item.render(_.get(it, item?.dataIndex))
                                    : formatCellValue(_.get(it, item?.dataIndex), item)}
                                </div>
                              ))}
                            </td>
                          );
                        })}
                      </>
                    );
                  } else {
                    if (column.children) {
                      return (
                        <>
                          {column.children.map((child: any) => {
                            return (
                              <td key={uuidv4()} style={{ textAlign: child.align || 'left' }}>
                                {child.render
                                  ? child.render(formatCellValue(value[child.dataIndex], child), record, rowIndex)
                                  : formatCellValue(value[child.dataIndex], child)}
                              </td>
                            );
                          })}
                        </>
                      );
                    } else {
                      return (
                        <td key={uuidv4()} style={{ textAlign: column.align || 'left' }}>
                          {column.renderExcel
                            ? column.renderExcel(value, record, rowIndex)
                            : render
                              ? render(formatCellValue(value, column), record, rowIndex)
                              : formatCellValue(value, column)}
                        </td>
                      );
                    }
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </TableStyles>
    </>
  );
};

const TableStyles = styled.div`
  display: none;
  width: 100%;
  height: 50vh;
  overflow-x: auto;
  overflow-y: auto;
  border: 1px solid #ccc;
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      padding: 8px;
      border: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
  }
`;

export default ExportTable;
