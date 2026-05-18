import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import AssignOverlay from './AssignOverlay';

interface IProps {
  list: any;
  buttonName: string;
  path: string;
}

const Assign = ({ list, buttonName, path }: IProps) => {
  return (
    <BasePopover placement='bottomRight' trigger='click' content={<AssignOverlay list={list} path={path} />}>
      <BaseButton type='primary' size='small'>
        {buttonName}
      </BaseButton>
    </BasePopover>
  );
};

export default Assign;
