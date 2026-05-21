import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { API_URL } from '@app/configs/api-configs';
import { loaiGiaoDichSelect } from '@app/configs/select-configs';

interface ThuChiFilterFormProps {
  onSearch: (filters: { field: string; operator: string; value: string }[]) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export const ThuChiFilterForm = ({ onSearch, onReset, isLoading = false }: ThuChiFilterFormProps) => {
  const { t } = useTranslation();
  const [form] = BaseForm.useForm();

  const handleFinish = (values: any) => {
    const filters: { field: string; operator: string; value: string }[] = [];

    if (values.loai_giao_dich !== undefined && values.loai_giao_dich !== null) {
      filters.push({
        field: 'thu_chi.loai_giao_dich',
        operator: 'equal',
        value: values.loai_giao_dich
      });
    }

    if (values.danh_muc) {
      filters.push({
        field: 'thu_chi.danh_muc',
        operator: 'contain',
        value: values.danh_muc.trim()
      });
    }

    if (values.id_khach_hang) {
      filters.push({
        field: 'thu_chi.id_khach_hang',
        operator: 'equal',
        value: values.id_khach_hang
      });
    }

    if (values.id_san) {
      filters.push({
        field: 'thu_chi.id_san',
        operator: 'equal',
        value: values.id_san
      });
    }

    if (values.ten_nguoi_tao) {
      filters.push({
        field: 'nguoi_tao.ho_va_ten',
        operator: 'contain',
        value: values.ten_nguoi_tao.trim()
      });
    }

    if (values.ngay_giao_dich && values.ngay_giao_dich.length === 2) {
      const fromDate = values.ngay_giao_dich[0] ? moment(values.ngay_giao_dich[0]).format('YYYY-MM-DD 00:00:00') : '';
      const toDate = values.ngay_giao_dich[1] ? moment(values.ngay_giao_dich[1]).format('YYYY-MM-DD 23:59:59') : '';
      if (fromDate && toDate) {
        filters.push({
          field: 'thu_chi.ngay_giao_dich',
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

  return (
    <BaseForm form={form} layout='vertical' onFinish={handleFinish}>
      <BaseRow gutter={[16, 16]}>
        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='loai_giao_dich' label='Loại giao dịch'>
            <BaseSelect options={loaiGiaoDichSelect} placeholder='Chọn loại giao dịch' allowClear size='small' />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='danh_muc' label='Danh mục'>
            <BaseInput placeholder='Nhập danh mục' allowClear size='small' />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <SelectFormApi
            name='id_khach_hang'
            label='Khách hàng'
            placeholder='Chọn khách hàng'
            path={API_URL.KHACH_HANG + '/options'}
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
          <BaseForm.Item name='ten_nguoi_tao' label='Người tạo'>
            <BaseInput placeholder='Nhập tên người tạo' allowClear size='small' />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='ngay_giao_dich' label='Ngày giao dịch'>
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

export default ThuChiFilterForm;
