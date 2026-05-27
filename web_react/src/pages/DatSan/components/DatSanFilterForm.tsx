import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { API_URL } from '@app/configs/api-configs';

interface DatSanFilterFormProps {
  onSearch: (filters: { field: string; operator: string; value: string }[]) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export const DatSanFilterForm = ({ onSearch, onReset, isLoading = false }: DatSanFilterFormProps) => {
  const { t } = useTranslation();
  const [form] = BaseForm.useForm();

  const handleFinish = (values: any) => {
    const filters: { field: string; operator: string; value: string }[] = [];

    if (values.id_nguoi_dung) {
      filters.push({
        field: 'dat_san.id_nguoi_dung',
        operator: 'equal',
        value: values.id_nguoi_dung
      });
    }

    if (values.id_san) {
      filters.push({
        field: 'dat_san.id_san',
        operator: 'equal',
        value: values.id_san
      });
    }

    if (values.trang_thai !== undefined && values.trang_thai !== null) {
      filters.push({
        field: 'dat_san.trang_thai',
        operator: 'equal',
        value: values.trang_thai
      });
    }

    if (values.ngay_dat && values.ngay_dat.length === 2) {
      const fromDate = values.ngay_dat[0] ? moment(values.ngay_dat[0]).format('YYYY-MM-DD') : '';
      const toDate = values.ngay_dat[1] ? moment(values.ngay_dat[1]).format('YYYY-MM-DD') : '';
      if (fromDate && toDate) {
        filters.push({
          field: 'dat_san.ngay_dat',
          operator: 'between',
          value: JSON.stringify([fromDate, toDate])
        });
      }
    }

    if (values.ngay_tao && values.ngay_tao.length === 2) {
      const fromDate = values.ngay_tao[0] ? moment(values.ngay_tao[0]).format('YYYY-MM-DD 00:00:00') : '';
      const toDate = values.ngay_tao[1] ? moment(values.ngay_tao[1]).format('YYYY-MM-DD 23:59:59') : '';
      if (fromDate && toDate) {
        filters.push({
          field: 'dat_san.ngay_tao',
          operator: 'between',
          value: JSON.stringify([fromDate, toDate])
        });
      }
    }

    onSearch(filters);
  };

  const handleResetClick = () => {
    form.resetFields();
    onReset();
  };

  const trangThaiOptions = [
    { value: 0, label: 'Chưa thanh toán' },
    { value: 1, label: 'Đã thanh toán' },
    { value: 2, label: 'Đã hủy' }
  ];

  return (
    <BaseForm form={form} layout='vertical' onFinish={handleFinish}>
      <BaseRow gutter={[16, 16]}>
        <BaseCol xs={24} sm={12} lg={6}>
          <SelectFormApi
            name='id_nguoi_dung'
            label='Khách hàng'
            placeholder='Chọn khách hàng'
            path={API_URL.NGUOI_DUNG + '/options'}
            size='small'
          />
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <SelectFormApi
            name='id_san'
            label='Sân'
            placeholder='Chọn sân'
            path={API_URL.SAN + '/options'}
            size='small'
          />
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='trang_thai' label='Trạng thái'>
            <BaseSelect options={trangThaiOptions} placeholder='Chọn trạng thái' allowClear size='small' />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='ngay_dat' label='Ngày đặt'>
            <DatePicker.RangePicker
              placeholder={['Từ ngày', 'Đến ngày']}
              style={{ width: '100%' }}
              format='DD/MM/YYYY'
              allowClear
              size='small'
            />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='ngay_tao' label='Thời gian tạo'>
            <DatePicker.RangePicker
              placeholder={['Từ ngày', 'Đến ngày']}
              style={{ width: '100%' }}
              format='DD/MM/YYYY'
              allowClear
              size='small'
            />
          </BaseForm.Item>
        </BaseCol>

        {/* Buttons */}
        <BaseCol span={24}>
          <BaseRow justify='end'>
            <BaseCol>
              <BaseForm.Item style={{ marginBottom: 0 }}>
                <BaseSpace>
                  <BaseButton icon={<ReloadOutlined />} onClick={handleResetClick} size='small' disabled={isLoading}>
                    Làm mới
                  </BaseButton>
                  <BaseButton
                    type='primary'
                    htmlType='submit'
                    icon={<SearchOutlined />}
                    size='small'
                    loading={isLoading}
                  >
                    Tìm kiếm
                  </BaseButton>
                </BaseSpace>
              </BaseForm.Item>
            </BaseCol>
          </BaseRow>
        </BaseCol>
      </BaseRow>
    </BaseForm>
  );
};

export default DatSanFilterForm;
