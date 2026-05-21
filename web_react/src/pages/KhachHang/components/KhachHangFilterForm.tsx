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
import { API_URL } from '@app/configs/api-configs';

interface KhachHangFilterFormProps {
  onSearch: (filters: { field: string; operator: string; value: string }[]) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export const KhachHangFilterForm = ({ onSearch, onReset, isLoading = false }: KhachHangFilterFormProps) => {
  const { t } = useTranslation();
  const [form] = BaseForm.useForm();

  const handleFinish = (values: any) => {
    const filters: { field: string; operator: string; value: string }[] = [];

    if (values.ho_va_ten) {
      filters.push({
        field: 'ho_va_ten',
        operator: 'contain',
        value: values.ho_va_ten.trim()
      });
    }

    if (values.so_dien_thoai) {
      filters.push({
        field: 'so_dien_thoai',
        operator: 'contain',
        value: values.so_dien_thoai.trim()
      });
    }

    if (values.id_doi_tuong) {
      filters.push({
        field: 'khach_hang.id_doi_tuong',
        operator: 'equal',
        value: values.id_doi_tuong
      });
    }

    if (values.ten_nguoi_tao) {
      filters.push({
        field: 'nguoi_tao.ho_va_ten',
        operator: 'contain',
        value: values.ten_nguoi_tao.trim()
      });
    }

    if (values.ngay_tao && values.ngay_tao.length === 2) {
      const fromDate = values.ngay_tao[0] ? moment(values.ngay_tao[0]).format('YYYY-MM-DD 00:00:00') : '';
      const toDate = values.ngay_tao[1] ? moment(values.ngay_tao[1]).format('YYYY-MM-DD 23:59:59') : '';
      if (fromDate && toDate) {
        filters.push({
          field: 'khach_hang.ngay_tao',
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
          <BaseForm.Item name='ho_va_ten' label='Họ và tên'>
            <BaseInput placeholder='Nhập họ và tên' allowClear size='small' />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='so_dien_thoai' label='Số điện thoại'>
            <BaseInput placeholder='Nhập số điện thoại' allowClear size='small' />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <SelectFormApi
            name='id_doi_tuong'
            label='Đối tượng'
            placeholder='Chọn đối tượng'
            path={API_URL.DOI_TUONG + '/options'}
            size='small'
          />
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='ten_nguoi_tao' label='Người tạo'>
            <BaseInput placeholder='Nhập tên người tạo' allowClear size='small' />
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
              <BaseForm.Item>
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

export default KhachHangFilterForm;
