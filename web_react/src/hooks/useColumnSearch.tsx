import { SearchOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import { BaseDatePicker } from '@app/components/common/pickers/BaseDatePicker';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import SelectApi from '@app/components/select/SelectApi';
import { optionDateTime, optionNumber } from '@app/configs/select-configs';
import { formatter, parser } from '@app/utils/utils';
import { DatePicker } from 'antd';
import type { ColumnType } from 'antd/es/table';
import moment from 'moment';
import { useState } from 'react';

interface SearchItem {
  field: string;
  operator: string;
  value: string;
}
export enum TypeSearch {
  INPUT = 'input',
  SELECT = 'select',
  DATE = 'date',
  NUMBER = 'number'
}
interface IDataSearch {
  dataIndex: string;
  operator?: string;
  filter?: any;
  nameColumn?: string;
}

const useColumnSearch = () => {
  const [searchText, setSearchText] = useState<SearchItem[]>([]);
  const [dateOpetator, setDateOpetator] = useState<any>('between');
  const [numberOpetator, setNumberOpetator] = useState<any>('equal');
  const handleColumnSearch = (selectedKeys: any, dataIndex: string, operator: string, type?: TypeSearch) => () => {
    if (!selectedKeys[0]) return;
    const updatedSearchText = searchText.filter((item) => item.field !== dataIndex);
    if (operator === 'between') {
      if (selectedKeys[0]) {
        updatedSearchText.push({ field: dataIndex, operator: operator, value: JSON.stringify(selectedKeys[0]) });
      }
    } else {
      updatedSearchText.push({ field: dataIndex, operator: operator, value: selectedKeys[0] || '' });
    }
    setSearchText(updatedSearchText);
  };

  const handleReset = (clearFilters: () => void, dataIndex: string) => {
    const updatedSearchText = searchText.filter((item) => item.field !== dataIndex);
    setSearchText(updatedSearchText);
    clearFilters();
  };

  const inputSearch = ({ dataIndex, operator = 'contain', nameColumn }: IDataSearch): ColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters, close }) => (
      <BaseSpace size={8} direction='vertical' style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        {nameColumn && (
          <BaseTypography.Text style={{ textAlign: 'center' }}>
            <b>Tìm kiếm theo &#34;{nameColumn}&#34;</b>
          </BaseTypography.Text>
        )}
        <BaseInput
          placeholder='Nhập nội dung'
          value={selectedKeys[0] as any}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={handleColumnSearch(selectedKeys, dataIndex, operator)}
        />
        <div>
          <BaseButton type='primary' onClick={handleColumnSearch(selectedKeys, dataIndex, operator)} size='small'>
            Tìm
          </BaseButton>
          &nbsp;
          <BaseButton onClick={() => clearFilters && handleReset(clearFilters, dataIndex)} size='small'>
            Làm mới
          </BaseButton>
          <BaseButton
            type='text'
            size='small'
            onClick={() => {
              close();
            }}
          >
            Đóng
          </BaseButton>
        </div>
      </BaseSpace>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  });

  const selectSearch = ({
    dataIndex,
    path,
    operator = 'equal',
    filter,
    nameColumn
  }: {
    dataIndex: string;
    path: string;
    operator?: string;
    filter?: any;
    nameColumn?: string;
  }): ColumnType<any> => {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters, close }: any) => (
        <BaseSpace size={8} direction='vertical' style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          {nameColumn && (
            <BaseTypography.Text style={{ textAlign: 'center' }}>
              <b>Tìm kiếm theo &#34;{nameColumn}&#34;</b>
            </BaseTypography.Text>
          )}
          <SelectApi
            style={{ marginBottom: 8, display: 'block', minWidth: 210 }}
            onChange={(e) => setSelectedKeys(e ? [e] : [])}
            placeholder='Chọn ngày'
            value={selectedKeys[0]}
            path={path}
            filter={filter}
            allowClear
          />
          <div>
            <BaseButton type='primary' onClick={handleColumnSearch(selectedKeys, dataIndex, operator)} size='small'>
              Tìm
            </BaseButton>
            &nbsp;
            <BaseButton
              onClick={() => {
                if (clearFilters) {
                  handleReset(clearFilters, dataIndex);
                }
                selectedKeys[0] = null;
              }}
              size='small'
            >
              Làm mới
            </BaseButton>
            <BaseButton
              type='text'
              size='small'
              onClick={() => {
                close();
              }}
            >
              Đóng
            </BaseButton>
          </div>
        </BaseSpace>
      ),
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    };
  };

  const dateSearch = ({
    dataIndex,
    nameColumn,
    type = 'date'
  }: {
    dataIndex: string;
    nameColumn?: string;
    type?: 'date' | 'dateTime';
  }) => {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters, close }: any) => (
        <BaseSpace direction='vertical' size={8} style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          {nameColumn && (
            <BaseTypography.Text style={{ textAlign: 'center' }}>
              <b>Tìm kiếm theo &#34;{nameColumn}&#34;</b>
            </BaseTypography.Text>
          )}
          <BaseSelect
            style={{ display: 'block' }}
            options={optionDateTime}
            size='small'
            placeholder='Chọn ngày'
            allowClear
            value={dateOpetator}
            onChange={(value) => {
              setDateOpetator(value);
              selectedKeys[0] = null;
            }}
          />
          <div>
            {dateOpetator === 'between' ? (
              <DatePicker.RangePicker
                showTime={type === 'dateTime'}
                size='small'
                onChange={(e: any) =>
                  setSelectedKeys(
                    e
                      ? type === 'dateTime'
                        ? [[moment(e[0]).format('YYYY-MM-DD HH:mm:00'), moment(e[1]).format('YYYY-MM-DD HH:mm:00')]]
                        : [[moment(e[0]).format('YYYY-MM-DD 00:00:00'), moment(e[1]).format('YYYY-MM-DD 00:00:00')]]
                      : []
                  )
                }
                placeholder={['Từ ngày', 'Đến ngày']}
                style={{ width: '100%' }}
                format={type === 'dateTime' ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'}
                value={selectedKeys[0] && [moment(selectedKeys[0][0]), moment(selectedKeys[0][1])]}
              />
            ) : (
              <BaseDatePicker
                onChange={(e: any) => setSelectedKeys(e ? [moment(e).format('YYYY-MM-DD')] : [])}
                size='small'
                format='DD/MM/YYYY'
                placeholder='Chọn ngày'
                value={selectedKeys[0] && moment(selectedKeys[0])}
              />
            )}
          </div>
          <div>
            <BaseButton type='primary' onClick={handleColumnSearch(selectedKeys, dataIndex, dateOpetator)} size='small'>
              Tìm
            </BaseButton>
            &nbsp;
            <BaseButton
              onClick={() => {
                if (clearFilters) {
                  handleReset(clearFilters, dataIndex);
                }
                selectedKeys[0] = null;
              }}
              size='small'
            >
              Làm mới
            </BaseButton>
            <BaseButton
              type='text'
              size='small'
              onClick={() => {
                close();
              }}
            >
              Đóng
            </BaseButton>
          </div>
        </BaseSpace>
      ),
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    };
  };
  const numberSearch = ({ dataIndex, nameColumn }: { dataIndex: string; nameColumn?: string }) => {
    const [value1, setValue1] = useState<any>(null);
    const [value2, setValue2] = useState<any>(null);
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters, close }: any) => (
        <BaseSpace direction='vertical' size={8} style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          {nameColumn && (
            <BaseTypography.Text style={{ textAlign: 'center' }}>
              <b>Tìm kiếm theo &#34;{nameColumn}&#34;</b>
            </BaseTypography.Text>
          )}
          <BaseSelect
            style={{ display: 'block' }}
            options={optionNumber}
            size='small'
            placeholder='Chọn loại'
            allowClear
            value={numberOpetator}
            onChange={(value) => {
              setNumberOpetator(value);
              selectedKeys[0] = null;
            }}
          />
          <div>
            <BaseRow>
              {numberOpetator !== 'between' ? (
                <BaseCol span={24}>
                  <BaseInputNumber
                    placeholder='Nhập số'
                    size='small'
                    formatter={formatter}
                    parser={parser}
                    value={value1}
                    onChange={(e) => setValue1(e)}
                    onPressEnter={handleColumnSearch([value1], dataIndex, numberOpetator)}
                  />
                </BaseCol>
              ) : (
                <>
                  <BaseCol span={12}>
                    <BaseInputNumber
                      placeholder='Nhập số'
                      size='small'
                      formatter={formatter}
                      parser={parser}
                      value={value1}
                      onChange={(e) => setValue1(e)}
                      onPressEnter={handleColumnSearch([[value1, value2]], dataIndex, numberOpetator)}
                    />
                  </BaseCol>
                  <BaseCol span={12}>
                    <BaseInputNumber
                      placeholder='Nhập số'
                      size='small'
                      formatter={formatter}
                      parser={parser}
                      value={value2}
                      onChange={(e) => setValue2(e)}
                      onPressEnter={handleColumnSearch([[value1, value2]], dataIndex, numberOpetator)}
                    />
                  </BaseCol>
                </>
              )}
            </BaseRow>
          </div>
          <div>
            <BaseButton
              type='primary'
              onClick={handleColumnSearch(
                numberOpetator === 'between' ? [[value1, value2]] : [value1],
                dataIndex,
                numberOpetator
              )}
              size='small'
            >
              Tìm
            </BaseButton>
            &nbsp;
            <BaseButton
              onClick={() => {
                if (clearFilters) {
                  handleReset(clearFilters, dataIndex);
                }
                selectedKeys[0] = null;
              }}
              size='small'
            >
              Làm mới
            </BaseButton>
            <BaseButton
              type='text'
              size='small'
              onClick={() => {
                close();
              }}
            >
              Đóng
            </BaseButton>
          </div>
        </BaseSpace>
      ),
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    };
  };
  const selectSearchWithOutApi = ({
    dataIndex,
    operator = 'equal',
    options,
    nameColumn
  }: {
    dataIndex: string;
    operator?: 'equal' | 'contain';
    options: { value: string | number; label: string }[];
    nameColumn?: string;
  }) => {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters, close }: any) => (
        <BaseSpace direction='vertical' style={{ padding: 8 }} size={8} onKeyDown={(e) => e.stopPropagation()}>
          {nameColumn && (
            <BaseTypography.Text style={{ textAlign: 'center' }}>
              <b>Tìm kiếm theo &#34;{nameColumn}&#34;</b>
            </BaseTypography.Text>
          )}
          <BaseSelect
            style={{ marginBottom: 8, display: 'block' }}
            onChange={(e) => setSelectedKeys(e ? [e] : [])}
            placeholder='Chọn ngày'
            value={selectedKeys[0]}
            options={options}
            allowClear
          />
          <div>
            <BaseButton type='primary' onClick={handleColumnSearch(selectedKeys, dataIndex, operator)} size='small'>
              Tìm
            </BaseButton>
            &nbsp;
            <BaseButton
              onClick={() => {
                if (clearFilters) {
                  handleReset(clearFilters, dataIndex);
                }
              }}
              size='small'
            >
              Làm mới
            </BaseButton>
            <BaseButton
              type='text'
              size='small'
              onClick={() => {
                close();
              }}
            >
              Đóng
            </BaseButton>
          </div>
        </BaseSpace>
      ),
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    };
  };

  return { inputSearch, query: searchText, selectSearch, selectSearchWithOutApi, dateSearch, numberSearch };
};

export default useColumnSearch;
