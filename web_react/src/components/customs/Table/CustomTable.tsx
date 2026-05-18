import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { notificationController } from '@app/controllers/notificationController';
import { formatter, parser } from '@app/utils/utils';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PaginationStyle, TableStyle } from './Table.style';
import { IEditableCell, ITable } from './interface';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';

export type EditableTableProps = Parameters<typeof BaseTable>[0];

export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EditableContext = React.createContext<any>(null);

const EditableRow: React.FC = ({ ...props }) => {
  const [form] = BaseForm.useForm();
  return (
    <BaseForm form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </BaseForm>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  inputType,
  handleSave,
  data,
  ...restProps
}: IEditableCell) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  const renderCell = () => {
    switch (inputType) {
      case 'number':
        return (
          <BaseInputNumber
            size='small'
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            parser={parser}
            formatter={formatter}
            className='w-full'
          />
        );
      case 'date':
        return (
          <DatePicker
            size='small'
            locale={locale}
            ref={inputRef}
            format='DD/MM/YYYY'
            onBlur={save}
            onChange={save}
            className='w-full'
          />
        );
      case 'select':
        return <BaseSelect options={data} className='w-full' ref={inputRef} size='small' onBlur={save} />;
      default:
        return <BaseInput size='small' ref={inputRef} className='w-full' onPressEnter={save} onBlur={save} />;
    }
  };

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    let fieldsValue: any = null;
    if (record) {
      fieldsValue = record;
    } else {
      return false;
    }
    if (inputType === 'date') {
      Object.keys(fieldsValue).forEach((key) => {
        if (fieldsValue[key]) {
          if (/ngay_|_ngay/.test(key) || /ngay/.test(key) || /thoi_gian|_thoi/.test(key)) {
            fieldsValue[key] = moment(fieldsValue[key], 'HH:mm:ss');
          }
        }
      });
    }
    form.setFieldsValue({ [dataIndex]: fieldsValue[dataIndex] });
  };
  const [open, setOpen] = useState(false);

  const save = () => {
    setOpen(true);
  };

  const onConfirm = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
      setOpen(false);
    } catch (errInfo: any) {
      notificationController.error({
        message: errInfo
      });
    }
  };

  const onCancel = () => {
    setOpen(false);
    setEditing(false);
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <BasePopconfirm title='Bạn có muốn lưu không' open={open} onConfirm={onConfirm} onCancel={onCancel}>
        <BaseForm.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} không được bỏ trống.`
            }
          ]}
        >
          {renderCell()}
        </BaseForm.Item>
      </BasePopconfirm>
    ) : (
      <div onClick={toggleEdit} className='px-[7px] cursor-pointer' role='presentation'>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const CustomTable = ({
  defaultColumns,
  dataTable,
  handleSave,
  rowKey,
  rowSelection,
  filter,
  loading,
  scroll = { x: 1000 },
  handlePageChange,
  handleLimitChange,
  total
}: ITable) => {
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => {
        return {
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          inputType: col.inputType,
          data: col.data,
          handleSave
        };
      }
    };
  });

  return (
    <>
      <TableStyle
        scroll={scroll}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        loading={loading}
        pagination={false}
        dataSource={dataTable}
        columns={columns as ColumnTypes}
        rowKey={rowKey}
        rowSelection={rowSelection}
      />
      {total ? (
        <PaginationStyle
          current={filter?.page}
          total={total}
          pageSize={filter?.limit}
          onChange={handlePageChange}
          onShowSizeChange={(_current, pageSize) => {
            if (filter && handleLimitChange) {
              handleLimitChange(pageSize);
            }
          }}
          showSizeChanger
          defaultPageSize={filter?.limit}
          showTotal={(total) => `Tổng cộng ${total} bản ghi`}
        />
      ) : null}
    </>
  );
};

export default CustomTable;
