import { postData } from '@app/api/postData.api';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { NguoiDungVaiTro } from '@app/interfaces/interfaces';
import { BaseOptionType } from 'antd/lib/cascader';
import { DefaultOptionType } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doLogin } from '@app/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
export const RoleSelect: React.FC<{}> = () => {
  const [options, setOptions] = useState<{ value: string | number; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  //load vai tro
  const onChange = async (
    value: unknown,
    option: BaseOptionType | DefaultOptionType | (BaseOptionType | DefaultOptionType)[]
  ): Promise<void> => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await postData(
        '/auth/update-personal-role',
        { ma_vai_tro: value },
        undefined,
        'Vai trò đã được thay đổi thành công'
      );
      if (res) {
        dispatch(doLogin({ ...user, ...res }));
        navigate('/');
      }
      setValue(value as string);
    } catch (error: any) {
      notificationController.error({
        message: error?.message as string
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const value = user?.ma_vai_tro ?? '';
        const opts = user?.nguoi_dung_vai_tros?.map((item: NguoiDungVaiTro) => ({
          value: item.vai_tro?.ma_vai_tro ?? '',
          label: item.vai_tro?.ten_vai_tro ?? ''
        }));
        setOptions(opts || []);
        setValue(value);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  return (
    <BaseSelect
      disabled={options.length <= 1}
      options={options}
      value={value}
      placeholder='Vai trò'
      size='small'
      showSearch
      loading={loading}
      onChange={onChange}
      style={{ minWidth: 160 }}
    />
  );
};

export default RoleSelect;
