import React, { useRef } from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from './FileUpload.module.css';

const FileUpload = ({ onUpload, disabled = false }) => {
  const fileInput = useRef();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      onUpload(e.target.files[0]);
      fileInput.current.value = '';
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <input
        type="file"
        ref={fileInput}
        className={styles.fileInput}
        onChange={handleChange}
        accept=".txt,.jpg,.jpeg,.png,.json,.pdf"
        disabled={disabled}
      />
      <Button 
        variant="contained" 
        onClick={() => fileInput.current.click()}
        disabled={disabled}
        className={styles.uploadButton}
        startIcon={<CloudUploadIcon />}
      >
        Upload File
      </Button>
      <p className={styles.helpText}>
        Supported formats: TXT, JPG, PNG, JSON, PDF (max 5MB)
      </p>
    </div>
  );
};

export default FileUpload; 