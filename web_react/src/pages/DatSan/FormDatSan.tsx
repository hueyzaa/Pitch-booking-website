import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import { BaseDatePicker } from '@app/components/common/pickers/BaseDatePicker';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { formatter, parser } from '@app/utils/utils';
import { TimePicker, Form } from 'antd';
import { apiInstance } from '@app/api/core.api';
import { useEffect } from 'react';
import moment from 'moment';

interface FormDatSanProps {
  isEditing?: boolean;
  disabled?: boolean;
}

const parseTime = (val: any) => {
  if (!val) return moment.invalid();
  if (moment.isMoment(val)) return val;
  if (typeof val === 'string') {
    return moment(val, ['HH:mm:ss', 'HH:mm', 'YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DDTHH:mm:ss']);
  }
  return moment(val);
};

const FormDatSan = ({ isEditing = false, disabled = false }: FormDatSanProps) => {
  const form = Form.useFormInstance();
  const idSan = Form.useWatch('id_san', form);
  const gioBatDau = Form.useWatch('gio_bat_dau', form);
  const gioKetThuc = Form.useWatch('gio_ket_thuc', form);
  const phanTramGiamGia = Form.useWatch('phan_tram_giam_gia', form) ?? 0;

  useEffect(() => {
    async function calculateTotal() {
      console.log('[DEBUG] WATCHED VALUES:', { idSan, gioBatDau, gioKetThuc, phanTramGiamGia });

      if (!idSan || !gioBatDau || !gioKetThuc) {
        console.log('[DEBUG] Missing required values, returning early.');
        return;
      }

      try {
        // Fetch pitch price
        const resp = await apiInstance.get(`${API_URL.QUAN_LY_GIA}/san/${idSan}`);
        console.log('[DEBUG] API Response for price:', resp);
        const priceRule = resp?.data;
        const giaTheoGio = priceRule ? Number(priceRule.gia_theo_gio) : 0;
        console.log('[DEBUG] Extracted baseline hourly price:', giaTheoGio);

        // Parse moments safely
        const mStart = parseTime(gioBatDau);
        const mEnd = parseTime(gioKetThuc);

        console.log('[DEBUG] Parsed moment objects:', {
          startValid: mStart.isValid(),
          endValid: mEnd.isValid(),
          startStr: mStart.format('HH:mm:ss'),
          endStr: mEnd.format('HH:mm:ss')
        });

        if (!mStart.isValid() || !mEnd.isValid()) {
          console.log('[DEBUG] One or both moment objects are invalid, skipping calculation.');
          return;
        }

        // Calculate hours and minutes diff to ignore date discrepancies
        const startHour = mStart.hour();
        const startMinute = mStart.minute();
        const endHour = mEnd.hour();
        const endMinute = mEnd.minute();

        let durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
        if (durationMinutes < 0) {
          durationMinutes += 24 * 60; // Overnight booking
        }
        const durationHours = durationMinutes / 60;
        console.log('[DEBUG] Calculated duration hours:', durationHours);

        if (durationHours > 0) {
          const donGia = giaTheoGio * (1 - phanTramGiamGia / 100);
          const total = Math.round(durationHours * donGia);
          console.log('[DEBUG] Setting total price field to:', total);
          form.setFieldsValue({ tong_tien: total });
        } else {
          console.log('[DEBUG] Setting total price field to 0.');
          form.setFieldsValue({ tong_tien: 0 });
        }
      } catch (err) {
        console.error('[DEBUG] Error calculating total booking amount:', err);
      }
    }

    calculateTotal();
  }, [idSan, phanTramGiamGia, gioBatDau, gioKetThuc, form]);

  const trangThaiOptions = [
    { value: 0, label: 'Chưa thanh toán' },
    { value: 1, label: 'Đã thanh toán' },
    { value: 2, label: 'Đã hủy' }
  ];

  return (
    <BaseRow gutter={[10, 10]}>
      {isEditing || disabled ? (
        <BaseCol span={24}>
          <BaseForm.Item name='ma_dat_san' label='Mã đặt sân'>
            <BaseInput disabled />
          </BaseForm.Item>
        </BaseCol>
      ) : null}

      <BaseCol span={12}>
        <SelectFormApi
          name='id_nguoi_dung'
          label='Khách hàng'
          path={API_URL.NGUOI_DUNG + '/options'}
          placeholder='Chọn khách hàng'
          disabled={disabled}
          rules={[{ required: true, message: 'Khách hàng không được bỏ trống' }]}
          onChange={(value, option) => {
            const discount = value ? (option?.phan_tram_giam_gia ?? 0) : 0;
            form.setFieldsValue({ phan_tram_giam_gia: discount });
          }}
        />
      </BaseCol>

      <BaseCol span={12}>
        <SelectFormApi
          name='id_san'
          label='Sân'
          path={API_URL.SAN + '/options'}
          placeholder='Chọn sân'
          disabled={disabled}
          rules={[{ required: true, message: 'Sân không được bỏ trống' }]}
        />
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='phan_tram_giam_gia' label='Phần trăm giảm giá (%)' initialValue={0}>
          <BaseInputNumber disabled style={{ width: '100%' }} placeholder='Giảm giá' />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name='ngay_dat'
          label='Ngày đặt'
          rules={[{ required: true, message: 'Ngày đặt không được bỏ trống' }]}
        >
          <BaseDatePicker
            format='DD/MM/YYYY'
            placeholder='Chọn ngày đặt'
            disabled={disabled}
            style={{ width: '100%' }}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name='gio_bat_dau'
          label='Giờ bắt đầu'
          rules={[{ required: true, message: 'Giờ bắt đầu không được bỏ trống' }]}
        >
          <TimePicker
            format='HH:mm'
            placeholder='Giờ bắt đầu'
            disabled={disabled}
            style={{ width: '100%' }}
            size='small'
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item
          name='gio_ket_thuc'
          label='Giờ kết thúc'
          rules={[{ required: true, message: 'Giờ kết thúc không được bỏ trống' }]}
        >
          <TimePicker
            format='HH:mm'
            placeholder='Giờ kết thúc'
            disabled={disabled}
            style={{ width: '100%' }}
            size='small'
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item
          name='tong_tien'
          label='Tổng tiền'
          rules={[{ required: true, message: 'Tổng tiền không được bỏ trống' }]}
        >
          <BaseInputNumber
            parser={parser}
            formatter={formatter}
            placeholder='Nhập tổng tiền'
            disabled={disabled}
            style={{ width: '100%' }}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item
          name='trang_thai'
          label='Trạng thái'
          rules={[{ required: true, message: 'Trạng thái không được bỏ trống' }]}
        >
          <BaseSelect options={trangThaiOptions} placeholder='Chọn trạng thái' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='ghi_chu' label='Ghi chú'>
          <BaseInput.TextArea placeholder='Nhập ghi chú' rows={3} disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormDatSan;
