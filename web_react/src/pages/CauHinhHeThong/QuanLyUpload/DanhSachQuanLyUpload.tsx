import { getDataById, getListData } from '@app/api/getData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import BaseImageWithTokenAndDeviceId from '@app/components/common/BaseImage/BaseImageWithTokenAndDeviceId';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';
import CustomTable from '@app/components/customs/Table/CustomTable';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { API_URL } from '@app/configs/api-configs';
import { apiURL } from '@app/configs/configs';
import { LOAI_FILE } from '@app/constants/commom';
import { useAppSelector } from '@app/hooks/reduxHooks';
import useColumnSearch from '@app/hooks/useColumnSearch';
import { usePagination } from '@app/hooks/usePagination';
import { Actions } from '@app/interfaces/interfaces';
import { createFilterQueryFromArray, generateHashStringAndParamsString } from '@app/utils/utils';
import { Modal } from 'antd';
import { Form } from 'antd';
import axios from 'axios';
import fileDownload from 'js-file-download';
import moment from 'moment';
import { useEffect, useState } from 'react';
import './fix-ant-image-preview.css';
import { store } from '@app/store/store';
import { postData } from '@app/api/postData.api';
import { EyeOutlined } from '@ant-design/icons';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';

const DanhSachQuanLyUpload = ({ path, permission }: { path: string; permission: Actions }) => {
  const [permissionForm] = Form.useForm();
  const [danhSach, setDanhSach] = useState<{ data: any; total: number } | undefined>({ data: [], total: 0 });
  const { filter, handlePageChange, handleLimitChange } = usePagination({ page: 1 });
  const { inputSearch, query, dateSearch } = useColumnSearch();
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);
  const [isLoading, setIsLoading] = useState(false);
  const currentUserId = store.getState().user.user?.id;
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [permissionLoading, setPermissionLoading] = useState(false);

  // Lấy danh sách user đã được phân quyền xem file
  const fetchGrantedUsers = async (fileId: number) => {
    setPermissionLoading(true);
    try {
      const res = await getDataById(fileId, path);
      // Lấy user_id từ data.permissions
      const ids = Array.isArray(res?.permissions) ? res.permissions.map((p: any) => p.user_id) : [];
      setSelectedUserIds(ids);
      permissionForm.setFieldsValue({ user_ids: ids });
    } catch {
      setSelectedUserIds([]);
      permissionForm.setFieldsValue({ user_ids: [] });
    }
    setPermissionLoading(false);
  };

  const handleShowPermissionModal = async (file: any) => {
    setSelectedFile(file);
    setShowPermissionModal(true);
    await fetchGrantedUsers(file.id);
  };

  const handleGrantPermission = async () => {
    if (!selectedFile) return;
    setPermissionLoading(true);
    await postData(`${path}/${selectedFile.id}/grant-view`, { user_ids: selectedUserIds });
    setShowPermissionModal(false);
    setSelectedUserIds([]);
    setPermissionLoading(false);
  };

  const getDanhSach = async () => {
    setIsLoading(true);
    const params = { ...filter, ...createFilterQueryFromArray(query) };
    const danhSach = await getListData(path, params);
    if (danhSach) {
      setIsLoading(false);
    }
    setDanhSach(danhSach);
  };
  const defaultColumns: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'right',
      render: (_text: any, _record: any, index: any) => {
        return filter.limit && (filter.page - 1) * filter.limit + index + 1;
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      align: 'center',
      render: (id: number, record: any) => {
        return (
          <BaseSpace size={0}>
            {permission.delete && record.nguoi_tao === currentUserId && (
              <Delete path={path} id={id} onShow={getDanhSach} />
            )}
            {/* Chỉ chủ file mới được phân quyền */}
            {record.nguoi_tao === currentUserId && (
              <BaseButton
                size='small'
                type='text'
                title='Phân quyền xem'
                icon={<EyeOutlined />}
                onClick={() => handleShowPermissionModal(record)}
              />
            )}
          </BaseSpace>
        );
      }
    },
    // {
    //   title: 'Loại file',
    //   dataIndex: 'loai_file',
    //   width: 100,
    //   align: 'center',
    //   render: (loai_file: string) => {
    //     return <Tag color={LOAI_FILE_VALUE[loai_file]?.color}>{LOAI_FILE_VALUE[loai_file]?.name}</Tag>;
    //   }
    // },
    {
      title: 'Tên file ban đầu',
      dataIndex: 'original_name',
      ...inputSearch({ dataIndex: 'original_name', operator: 'contain', nameColumn: 'Tên file' })
    },

    {
      title: 'Đường dẫn file',
      dataIndex: 'file_path',
      ...inputSearch({ dataIndex: 'file_path', operator: 'contain', nameColumn: 'Đường dẫn file' })
    },

    {
      title: 'Tên file trên hệ thống',
      dataIndex: 'file_name',
      ...inputSearch({ dataIndex: 'file_name', operator: 'contain', nameColumn: 'File name' })
    },
    {
      title: 'Xem trước',
      dataIndex: 'path',
      render: (path: string, record: any) => {
        const isPdf = path.endsWith('.pdf');
        const isSecret = record.loai_file == LOAI_FILE.SECRET;
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isPdf ? (
              <a
                href={
                  isSecret
                    ? apiURL + '/' + path + '?' + generateHashStringAndParamsString({ originalUrl: path })
                    : apiURL + '/' + path
                }
                target='_blank'
                rel='noopener noreferrer'
              >
                Xem PDF
              </a>
            ) : isSecret ? (
              <BaseImageWithTokenAndDeviceId
                apiURL={apiURL}
                src={path}
                style={{
                  maxHeight: '20vh',
                  maxWidth: '20vw'
                }}
              />
            ) : (
              <BaseImage
                src={apiURL + '/' + path}
                style={{
                  maxHeight: '20vh',
                  maxWidth: '20vw'
                }}
              />
            )}
          </div>
        );
      },
      ...inputSearch({ dataIndex: 'path', operator: 'contain', nameColumn: 'Xem file' })
    },
    {
      title: 'Tải về',
      dataIndex: 'path',
      render: (path: string, record: any) => {
        const isSecret = record.loai_file == LOAI_FILE.SECRET;
        const handleDownload = (url: string, filename: string) => {
          axios
            .get(url, {
              responseType: 'blob'
            })
            .then((res) => {
              fileDownload(res.data, filename);
            });
        };
        return (
          <BaseButton
            size='small'
            type='primary'
            onClick={() =>
              handleDownload(
                isSecret
                  ? apiURL + '/' + path + '?' + generateHashStringAndParamsString({ originalUrl: path })
                  : apiURL + '/' + path,
                record.original_name
              )
            }
          >
            Tải về
          </BaseButton>
        );
      }
    },
    {
      title: 'Path',
      dataIndex: 'path',
      render: (path: string) => {
        return apiURL + '/' + path;
      },
      ...inputSearch({ dataIndex: 'path', operator: 'contain', nameColumn: 'Path' })
    },
    {
      title: 'Size',
      dataIndex: 'size',

      render: (size: number) => {
        return (size / 1024 / 1024).toFixed(2) + ' MB';
      },
      ...inputSearch({ dataIndex: 'size', operator: 'contain', nameColumn: 'Size' })
    },
    {
      title: 'File type',
      dataIndex: 'file_type',
      ...inputSearch({ dataIndex: 'file_type', operator: 'contain', nameColumn: 'File type' })
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'ngay_tao',
      align: 'right',
      render: (record: string): string => {
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm') || '';
      },
      ...dateSearch({ dataIndex: 'ngay_tao', nameColumn: 'Thời gian tạo' })
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'ngay_cap_nhat',
      align: 'right',
      render: (record: string): string => {
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm') || '';
      },
      ...dateSearch({ dataIndex: 'ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
    }
  ];

  useEffect(() => {
    getDanhSach();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, filter, query]);

  return (
    <>
      <CustomTable
        rowKey='id'
        dataTable={danhSach?.data}
        defaultColumns={defaultColumns}
        filter={filter}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        total={danhSach?.total}
        loading={isLoading}
      />
      <Modal
        title='Phân quyền xem file'
        open={showPermissionModal}
        onCancel={() => {
          setShowPermissionModal(false);
          setSelectedUserIds([]);
          setSelectedFile(null);
          permissionForm.resetFields();
        }}
        onOk={handleGrantPermission}
        okText='Phân quyền'
        cancelText='Đóng'
        confirmLoading={permissionLoading}
      >
        <BaseForm form={permissionForm} layout='vertical'>
          <SelectFormApi
            name='user_ids'
            label='Chọn người dùng'
            path={`${API_URL.NGUOI_DUNG}/options`}
            placeholder='Chọn người dùng được xem'
            onChange={(values: number[]) => setSelectedUserIds(values)}
            value={selectedUserIds}
            size='large'
            mode='multiple'
            reload={showPermissionModal}
          />
        </BaseForm>
      </Modal>
    </>
  );
};

export default DanhSachQuanLyUpload;
