import { ReloadOutlined } from '@ant-design/icons';
import { getListData } from '@app/api/getData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCheckbox } from '@app/components/common/BaseCheckbox/BaseCheckbox';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { Roles } from '@app/interfaces/interfaces';
import { ConvertTextCheckBox, ConvertTextRoles } from '@app/utils/converts';
import { createFilterQuery, normalizeText } from '@app/utils/utils';
import { FormInstance, Input, Space } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Fragment, useMemo, useState } from 'react';

const { Search } = Input;

const FormVaiTro = ({
  vaiTroMacDinh,
  isEditing,
  isOnlyView = false,
  form
}: {
  vaiTroMacDinh: Roles[];
  setVaiTroMacDinh: (data: Roles[]) => void;
  isEditing: boolean;
  isOnlyView?: boolean;
  form: FormInstance;
}) => {
  const [search, SetSearch] = useState<string>('');

  const handleCheckAllItem = (item: Roles) => (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const values: Record<string, boolean> = {};
    Object.keys(item.actions).forEach((key) => {
      values[`${item.name}_${key}`] = checked;
    });
    values[`checkall_${item.name}`] = checked;
    form.setFieldsValue(values);
  };

  const onChange = (item: Roles, key: string) => (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    form.setFieldValue(`${item.name}_${key}`, checked);

    const allChecked = Object.keys(item.actions).every((actionKey) => form.getFieldValue(`${item.name}_${actionKey}`));
    form.setFieldValue(`checkall_${item.name}`, allChecked);
  };

  const onChangeVaiTro = async (value: string) => {
    const vaiTro = await getListData(`${API_URL.VAI_TRO}`, createFilterQuery(0, 'vai_tro.ma_vai_tro', 'equal', value));
    const phanQuyen = JSON.parse(vaiTro.data[0].phan_quyen);
    const values: Record<string, any> = {};
    phanQuyen.forEach((item: Roles) => {
      let allChecked = true;
      Object.entries(item.actions).forEach(([key, val]) => {
        values[`${item.name}_${key}`] = val;
        if (!val) allChecked = false;
      });
      values[`checkall_${item.name}`] = allChecked;
    });
    form.setFieldsValue(values);
  };

  const hanldeSearch = (value: string) => {
    SetSearch(value);
  };

  //Todo: hàm search
  const filtedVaiTro = useMemo<Roles[]>(() => {
    const normaltext = normalizeText(search);
    if (!search) return vaiTroMacDinh;
    return vaiTroMacDinh.filter((item) => item.name.includes(normaltext));
  }, [vaiTroMacDinh, search]);

  //Todo: hàm refresh
  const handleRefresh = () => {
    SetSearch('');
  };

  return (
    <BaseRow gutter={[10, 10]}>
      <BaseCol span={12}>
        <BaseForm.Item
          name='ma_vai_tro'
          label='Mã vai trò'
          rules={[{ required: true, message: 'Mã vai trò không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập mã' disabled={isEditing || isOnlyView} />
        </BaseForm.Item>
      </BaseCol>
      <BaseCol span={12}>
        <BaseForm.Item
          name='ten_vai_tro'
          label='Tên vai trò'
          rules={[{ required: true, message: 'Tên vai trò không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập tên' disabled={isEditing || isOnlyView} />
        </BaseForm.Item>
      </BaseCol>
      {!isOnlyView && (
        <BaseCol span={12}>
          <SelectFormApi
            name=' '
            label='Chọn quyền từ vai trò có sẵn'
            path={`${API_URL.VAI_TRO}${API_URL.OPTIONS}`}
            placeholder='Chọn vai trò'
            onChange={onChangeVaiTro}
          />
        </BaseCol>
      )}
      <BaseCol span={24}>
        <Space>
          <Search
            size='small'
            placeholder='Tìm kiếm'
            defaultValue={search}
            value={search}
            onSearch={hanldeSearch}
            onChange={(e) => SetSearch(e.target.value)}
            style={{ width: 200 }}
          />
          <BaseButton size='small' icon={<ReloadOutlined />} onClick={handleRefresh} />
        </Space>
      </BaseCol>
      <BaseCol span={24}>
        <BaseTypography.Title level={5} style={{ marginBottom: '0' }}>
          Phân quyền
        </BaseTypography.Title>
      </BaseCol>
      <BaseCol span={24}>
        <BaseRow justify='space-between' gutter={[10, 10]}>
          {filtedVaiTro.map((item: any) => {
            return (
              <Fragment key={item.name}>
                <BaseCol md={4} xs={10} style={{ textAlign: 'left' }}>
                  <BaseTypography.Text style={{ fontSize: '13px' }}>{ConvertTextRoles(item.name)}</BaseTypography.Text>
                </BaseCol>
                <BaseCol md={20} xs={14}>
                  <BaseRow justify='end'>
                    {Object.entries(item.actions).map(([key, value]: any) => (
                      <BaseCol md={3} xs={12} key={key} style={{ textAlign: 'left' }}>
                        <BaseForm.Item name={`${item.name}_${key}`} valuePropName='checked' initialValue={value}>
                          <BaseCheckbox onChange={onChange(item, key)} disabled={isOnlyView}>
                            <BaseTypography.Text style={{ fontSize: '13px' }}>
                              {ConvertTextCheckBox(key)}
                            </BaseTypography.Text>
                          </BaseCheckbox>
                        </BaseForm.Item>
                      </BaseCol>
                    ))}
                    <BaseCol md={3} xs={12}>
                      <BaseForm.Item name={`checkall_${item.name}`} valuePropName='checked'>
                        <BaseCheckbox onChange={handleCheckAllItem(item)} disabled={isOnlyView}>
                          <BaseTypography.Text style={{ fontSize: '13px' }}>Tất cả</BaseTypography.Text>
                        </BaseCheckbox>
                      </BaseForm.Item>
                    </BaseCol>
                  </BaseRow>
                </BaseCol>
              </Fragment>
            );
          })}
        </BaseRow>
      </BaseCol>
    </BaseRow>
  );
};

export default FormVaiTro;
