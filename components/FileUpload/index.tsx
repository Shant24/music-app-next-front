import React, { memo, useRef } from 'react';
import styles from './styles.module.scss';

interface FileUploadProps {
  setFile: Function;
  accept: string;
  children?: React.ReactChild | React.ReactChild[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children
}) => {
  const defaultInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  return (
    <div onClick={() => defaultInputRef.current.click()}>
      <input
        ref={defaultInputRef}
        type="file"
        accept={accept}
        className={styles.fileUploadDefaultInput}
        onChange={handleChange}
      />
      {children}
    </div>
  );
};

export default memo(FileUpload);
