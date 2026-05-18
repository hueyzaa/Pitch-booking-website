import type { SelectProps } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select';
import { getDataSelect } from '@app/api/getData.api';
import { BaseSelect } from '../common/selects/BaseSelect/BaseSelect';

export interface SelectApiProps extends SelectProps {
  filter?: any; //createFilterQuery(0, 'ly_do.loai', 'equal', 'THU')
  path: string;
  reload?: boolean;
  style?: CSSProperties;
  onChange?: (
    value: unknown,
    option: DefaultOptionType | BaseOptionType | (DefaultOptionType | BaseOptionType)[]
  ) => void;
}

const SelectApi = ({ mode, path, filter, placeholder, disabled, reload, value, style, onChange }: SelectApiProps) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([{ value: '', label: '' }]);

  useEffect(() => {
    async function getData() {
      const data = await getDataSelect(path, filter);
      const optionsSelect = data.map((item: any) => {
        return { ...item, value: item.id || item.value, label: item.ten || item.name || item.label };
      });
      if (data.length === 0) {
        return;
      }
      setOptions(optionsSelect);
    }
    getData();
  }, [filter, path, reload]);

  return (
    <BaseSelect
      options={options}
      placeholder={placeholder}
      mode={mode}
      showSearch
      allowClear
      size='small'
      onChange={onChange}
      value={value}
      disabled={disabled}
      style={style}
    />
  );
};

export default SelectApi;
