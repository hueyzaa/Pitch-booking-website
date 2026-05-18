import { IPagination } from '@app/hooks/usePagination';
import { ColumnTypes } from './CustomTable';
import { BaseTableProps } from '@app/components/common/BaseTable/BaseTable';

export interface IEditableCell {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: number;
  record: any;
  inputType: string;
  data: any;
  handleSave: (record: any) => void;
}

export interface ITable extends BaseTableProps<any> {
  defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    inputType?: string;
    data?: any;
  })[];
  dataTable: any;
  setDataTable?: any;
  handleSave?: (record: any) => void;
  rowSelection?: any;
  filter?: IPagination;
  handlePageChange?: (page: number) => void;
  handleLimitChange?: (limit: number) => void;
  total?: number;
}
