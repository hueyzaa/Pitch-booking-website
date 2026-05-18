import { SelectProps } from '@app/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { BaseForm } from '../common/forms/BaseForm/BaseForm';
import { getDataSelect } from '@app/api/getData.api';
import { BaseSelect } from '../common/selects/BaseSelect/BaseSelect';

const SelectFormApi = ({
  mode,
  name,
  label,
  rules,
  initialValue,
  path,
  filter,
  placeholder,
  onChange,
  size = 'small',
  disabled,
  reload,
  value
}: SelectProps) => {
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
    <BaseForm.Item name={name} label={label} rules={rules} initialValue={initialValue}>
      <BaseSelect
        options={options}
        placeholder={placeholder}
        mode={mode}
        onChange={onChange}
        showSearch
        allowClear
        size={size}
        disabled={disabled}
        value={value}
      />
    </BaseForm.Item>
  );
};

export default SelectFormApi;
