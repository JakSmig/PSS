import { InboxOutlined } from '@ant-design/icons';
import { Button, UploadFile, UploadProps } from 'antd';
// eslint-disable-next-line no-duplicate-imports
import { message, Upload } from 'antd';
// import Compressor from 'compressorjs';
import React, { useState } from 'react';

import { useReviewStore } from '../../../store/reviewStore';
import './UploadForm.less';

const { Dragger } = Upload;

const UploadForm = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const { setImage } = useReviewStore();
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    style: { width: '400px' },
    accept: '.png, .jpg',
    beforeUpload: file => {
      setFileList([...fileList, file]);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // eslint-disable-next-line no-console
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      // eslint-disable-next-line no-console
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  // const handleCompressedUpload = (file: File) => {
  //   new Compressor(file, {
  //     quality: 0.6,
  //     success: result => {
  //       setCompressedFile(result);
  //     },
  //   });
  // };

  const onLoad = (fileString: string) => {
    setImage(fileString);
  };
  const getBase64 = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result as string);
    };
  };
  const handleSubmit = () => {
    const file = fileList[0];
    // if (file.size && file.size > 500000) {
    //   handleCompressedUpload(file as unknown as File);
    //   getBase64(compressedFile as Blob);
    // } else {
    getBase64(file as unknown as Blob);
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
      </Dragger>
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export { UploadForm };
