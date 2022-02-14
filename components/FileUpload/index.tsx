import React, { ChangeEvent, memo, ReactChild, useRef } from 'react';
import styles from './styles.module.scss';

interface FileUploadProps {
  setFile: Function;
  accept: string;
  children?: ReactChild | ReactChild[];
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children }) => {
  const defaultInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
  };

  const handleClick = () => {
    defaultInputRef.current?.click();
  }

  return (
    <div onClick={handleClick}>
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
