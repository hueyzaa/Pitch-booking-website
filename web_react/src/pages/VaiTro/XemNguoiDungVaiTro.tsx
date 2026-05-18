import { TeamOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getListData } from '@app/api/getData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import CustomTable from '@app/components/customs/Table/CustomTable';
import { useState } from 'react';
import { Form } from 'antd';
import { Checkbox } from 'antd';
import { notificationController } from '@app/controllers/notificationController';
import { deleteManyData } from '@app/api/deleteData.api';
import { addManyUsersToRole } from '@app/api/postData.api';

interface Props {
  vaiTroId: number;
  tenVaiTro: string;
}

const XemNguoiDungVaiTro = ({ vaiTroId, tenVaiTro }: Props) => {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [selectLoading, setSelectLoading] = useState(false);
  const [selectForm] = Form.useForm();
  const [allUsers, setAllUsers] = useState<any[]>([]);

  // Mở modal select nhiều user
  const showSelectModal = async () => {
    setIsSelectModalOpen(true);
    setSelectLoading(true);

    // Lấy tất cả người dùng
    const allUsersRes = await getListData('users', { limit: -1 });

    // Lấy danh sách user đã thuộc nhóm quyền này
    const params = {
      'f[0][field]': 'vai_tro.id',
      'f[0][operator]': 'equal',
      'f[0][value]': vaiTroId
    };
    const res = await getListData('users', { ...params, limit: -1 });
    const existingUserIds = (res?.data || []).map((u: any) => u.id);

    // Chỉ lấy những người dùng chưa có trong vai trò này
    const availableUsers = (allUsersRes?.data || []).filter((user: any) => !existingUserIds.includes(user.id));
    setAllUsers(availableUsers);
    setSelectedUserIds([]);
    selectForm.setFieldsValue({ user_ids: [] });
    setSelectLoading(false);
  };

  const handleSelectCancel = () => {
    selectForm.resetFields();
    setIsSelectModalOpen(false);
    setSelectedUserIds([]);
    setAllUsers([]);
  };

  // Hàm xử lý thêm nhiều người dùng vào nhóm quyền
  const handleAddManyUsersSelect = async () => {
    if (selectedUserIds.length === 0) return;
    setSelectLoading(true);
    try {
      await addManyUsersToRole('users', { vai_tro_id: vaiTroId, user_ids: selectedUserIds });
      setIsSelectModalOpen(false);
      showModal(); // Refresh lại danh sách
      handleSelectCancel();
    } catch (err: any) {
      notificationController.error({ message: err.message });
    }
    setSelectLoading(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const showModal = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    // Lấy danh sách người dùng theo vai trò
    const params = {
      limit: -1,
      'f[0][field]': 'vai_tro.id',
      'f[0][operator]': 'equal',
      'f[0][value]': vaiTroId
    };
    const res = await getListData('users', params);
    setUsers(res?.data || []);
    setIsLoading(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRowKeys([]);
  };

  const handleDeleteMany = async () => {
    if (selectedRowKeys.length === 0) return;
    setIsLoading(true);
    try {
      await deleteManyData('users', { vai_tro_id: vaiTroId, user_ids: selectedRowKeys });
      // Reset selectedRowKeys sau khi xóa thành công
      setSelectedRowKeys([]);
      // Refresh lại danh sách
      showModal();
    } catch (err: any) {
      notificationController.error({ message: err.message });
    }
    setIsLoading(false);
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedRowKeys.length === users.length && users.length > 0}
          indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < users.length}
          onChange={(e) => {
            setSelectedRowKeys(e.target.checked ? users.map((u) => u.id) : []);
          }}
        />
      ),
      dataIndex: 'checkbox',
      width: 50,
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={(e) => {
            setSelectedRowKeys(
              e.target.checked ? [...selectedRowKeys, record.id] : selectedRowKeys.filter((id) => id !== record.id)
            );
          }}
        />
      )
    },
    { title: 'Họ tên', dataIndex: 'ho_va_ten', width: 180 },
    { title: 'Tài khoản', dataIndex: 'tai_khoan', width: 180 },

    { title: 'SĐT', dataIndex: 'so_dien_thoai', width: 140 },
    { title: 'Danh sách vai trò', dataIndex: 'danh_sach_vai_tro', width: 300 }
  ];

  const selectColumns = [
    {
      title: (
        <Checkbox
          checked={selectedUserIds.length === allUsers.length && allUsers.length > 0}
          indeterminate={selectedUserIds.length > 0 && selectedUserIds.length < allUsers.length}
          onChange={(e) => {
            setSelectedUserIds(e.target.checked ? allUsers.map((u) => u.id) : []);
          }}
        />
      ),
      dataIndex: 'checkbox',
      width: 50,
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedUserIds.includes(record.id)}
          onChange={(e) => {
            setSelectedUserIds(
              e.target.checked ? [...selectedUserIds, record.id] : selectedUserIds.filter((id) => id !== record.id)
            );
          }}
        />
      )
    },
    { title: 'Họ tên', dataIndex: 'ho_va_ten', width: 180 },
    { title: 'Tài khoản', dataIndex: 'tai_khoan', width: 180 },

    { title: 'SĐT', dataIndex: 'so_dien_thoai', width: 140 },
    { title: 'Danh sách vai trò', dataIndex: 'danh_sach_vai_tro', width: 300 }
  ];

  return (
    <>
      <BaseButton
        icon={<TeamOutlined />}
        type='text'
        size='small'
        title={`Xem danh sách người dùng`}
        onClick={showModal}
      />
      <BaseModal
        title={`Danh sách người dùng của vai trò "${tenVaiTro}"`}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        centered
        width={1300}
        footer={[
          <BaseButton
            size='small'
            key='deleteMany'
            icon={<DeleteOutlined />}
            type='primary'
            danger
            disabled={selectedRowKeys.length === 0}
            loading={isLoading}
            onClick={handleDeleteMany}
          >
            Xóa
          </BaseButton>
        ]}
      >
        <div style={{ marginBottom: 16, justifyContent: 'flex-end', display: 'flex' }}>
          <BaseButton icon={<PlusOutlined />} size='small' type='primary' onClick={showSelectModal}>
            Thêm
          </BaseButton>
        </div>
        <CustomTable
          rowKey='id'
          columns={columns}
          defaultColumns={columns}
          dataTable={users}
          loading={isLoading}
          pagination={false}
        />
      </BaseModal>

      {/* Modal thêm nhiều người dùng vào nhóm quyền bằng danh sách check */}
      <BaseModal
        title={`Thêm người dùng vào nhóm quyền "${tenVaiTro}"`}
        open={isSelectModalOpen}
        onCancel={handleSelectCancel}
        maskClosable={false}
        centered
        width={1300}
        footer={[
          <BaseButton
            key='addManyUsers'
            type='primary'
            disabled={selectedUserIds.length === 0}
            loading={selectLoading}
            onClick={handleAddManyUsersSelect}
            size='small'
          >
            Lưu
          </BaseButton>
        ]}
      >
        <CustomTable
          rowKey='id'
          columns={selectColumns}
          defaultColumns={selectColumns}
          dataTable={allUsers}
          loading={selectLoading}
          pagination={false}
        />
      </BaseModal>
    </>
  );
};

export default XemNguoiDungVaiTro;
