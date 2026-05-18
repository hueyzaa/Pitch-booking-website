import { InfoCircleOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import { useDispatch } from 'react-redux';

interface ICustomColumns {
  columns: any;
  update: ({ index, checked }: any) => void;
}

const CustomColumns = ({ columns, update }: ICustomColumns) => {
  return (
    <BasePopover content={<CustomColumnsOverlay columns={columns} update={update} />} trigger='click'>
      <BaseButton type='primary' size='small'>
        Tuỳ chỉnh cột
      </BaseButton>
    </BasePopover>
  );
};

const CustomColumnsOverlay = ({ columns, update }: any) => {
  const dispatch = useDispatch();
  const handleColumnToggle = (checked: boolean, index: any) => {
    dispatch(update({ index, checked }));
  };

  return (
    <>
      <span style={{ fontSize: '12px' }}>
        <InfoCircleOutlined /> &nbsp; Thiết lập chỉ áp dụng trên thiết bị này
      </span>
      {columns.map((item: any, index: number) => {
        return (
          <BaseRow key={index} gutter={[10, 10]}>
            <BaseCol>
              <BaseSwitch defaultChecked={item.status} onChange={(checked) => handleColumnToggle(checked, index)} />
            </BaseCol>
            <BaseCol>
              <span>{item.name}</span>
            </BaseCol>
          </BaseRow>
        );
      })}
    </>
  );
};

export default CustomColumns;
