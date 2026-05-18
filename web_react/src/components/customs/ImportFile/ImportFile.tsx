import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/core.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseUpload } from '@app/components/common/BaseUpload/BaseUpload';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { apiURL } from '@app/configs/configs';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { Typography } from 'antd';
import { UploadFile as UploadFileAntd, UploadProps } from 'antd/lib/upload/interface';
import { useState } from 'react';
import { Spreadsheet } from 'react-spreadsheet';
import * as XLSX from 'xlsx';

const normFile = (e: any) => (Array.isArray(e) ? e : e?.fileList);

interface Cell {
  value: string;
}

type Data = (Cell | undefined)[][];

const ImportFile = ({
  pathFileMau,
  pathImport,
  download,
  title,
  caption,
  acceptFileExtension = '.xls,.xlsx',
  countFile = 1
}: {
  pathFileMau: string;
  pathImport: string;
  download?: string;
  title?: string;
  caption?: string;
  acceptFileExtension?: string;
  countFile?: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFileAntd[]>([]);
  const [data, setData] = useState<Data>([]);
  const dispatch = useAppDispatch();
  const [form] = BaseForm.useForm();

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
    resetFileState();
  };

  const resetFileState = () => {
    setFileList([]);
    setData([]);
    form.resetFields();
  };

  const fetchFileMau = () => window.open(apiURL + pathFileMau);

  const handleImport = async () => {
    if (fileList.length > 0) {
      const formData = new FormData();
      const file = fileList[0]?.originFileObj;
      if (!file) return;
      formData.append('file', file);
      try {
        const response = await apiInstance.post(pathImport, formData);
        handleImportResponse(response);
      } catch (error: any) {
        notificationController.error({ message: error.message });
      } finally {
        setIsModalOpen(false);
      }
    }
  };

  const handleImportResponse = (response: any) => {
    if (response.data) {
      handleCancel();
      dispatch(appActions.toggleReload('DANH_SACH'));
      window.open(import.meta.env.VITE_API_URL + response.data.filePath.replace('public', ''), '_blank');
    } else {
      notificationController.error({
        message: `Import thất bại`
      });
    }
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const acceptedExtensions = ['.xlsx', '.xls'];
    const file = newFileList[0]?.originFileObj;

    if (!file) return;

    const fileExtension = getFileExtension(file.name);
    if (!acceptedExtensions.includes(fileExtension)) {
      return showError('Vui lòng chọn đúng định dạng file excel');
    }

    setFileList(newFileList);
    processExcelFile(file);
  };

  const getFileExtension = (filename: string) => `.${filename.split('.').pop()?.toLowerCase()}`;

  const showError = (message: string) => {
    notificationController.error({ message });
  };

  const processExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const columnNames = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const formattedData = sheetData.map((row: any) =>
        row.map((cell: any, colIndex: number) => formatCellValue(cell, columnNames[colIndex]))
      );

      setData(formattedData);
    };
    reader.readAsBinaryString(file);
  };

  const formatCellValue = (cell: any, columnName: string) => {
    if (columnName.toLowerCase().includes('ngày')) {
      return { value: XLSX.SSF.format('mm/dd/yyyy', cell) };
    }
    return { value: cell.toString() };
  };

  return (
    <>
      <BaseButton
        icon={<UploadOutlined />}
        onClick={showModal}
        type='primary'
        size='small'
        title={title}
        style={{ marginTop: '10px', float: 'right' }}
      />
      <BaseModal
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        size='large'
        centered
        footer={[
          <BaseButton
            size='small'
            key='submit'
            type='primary'
            form='formUpload'
            htmlType='submit'
            disabled={fileList.length === 0}
          >
            Upload
          </BaseButton>
        ]}
      >
        <BaseRow>
          <BaseCol span={24}>
            <BaseButton type='default' onClick={fetchFileMau} size='small' style={{ marginBottom: '10px' }}>
              Tải file mẫu
            </BaseButton>
          </BaseCol>
          <BaseCol span={24}>{data.length > 0 && <Spreadsheet data={data} />}</BaseCol>
        </BaseRow>

        <BaseForm form={form} id='formUpload' onFinish={handleImport}>
          <BaseForm.Item name='upload' valuePropName='fileList' getValueFromEvent={normFile}>
            <BaseRow style={{ display: 'flex', justifyContent: 'space-around' }}>
              <BaseUpload
                listType='picture-card'
                accept={acceptFileExtension}
                maxCount={countFile}
                beforeUpload={() => false}
                onChange={onChange}
                onRemove={resetFileState}
                multiple={countFile > 1}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              </BaseUpload>
            </BaseRow>
          </BaseForm.Item>
          {caption && <Typography style={{ marginTop: '10px' }}>{caption}</Typography>}
          {download && (
            <div style={{ marginTop: '10px' }}>
              <Typography.Link href={download} target='_blank'>
                Tải file mẫu
              </Typography.Link>
            </div>
          )}
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default ImportFile;
