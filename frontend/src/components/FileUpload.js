import React, { useRef } from 'react';
import { Button } from '@mui/material';

const FileUpload = ({ onUpload }) => {
  const fileInput = useRef();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      onUpload(e.target.files[0]);
      fileInput.current.value = '';
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={handleChange}
        accept=".txt,.jpg,.jpeg,.png,.json,.pdf"
      />
      <Button variant="contained" onClick={() => fileInput.current.click()}>
        Upload File
      </Button>
    </div>
  );
};

export default FileUpload; 