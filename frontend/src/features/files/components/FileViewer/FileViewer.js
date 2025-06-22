import React from 'react';
import { Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import styles from './FileViewer.module.css';

const FileViewer = ({ file, onClose }) => {
  if (!file) return null;

  const handleDownload = () => {
    if (file.url) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.originalName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <div className={styles.viewerContainer}>
      <div className={styles.header}>
        <Typography variant="h6" className={styles.fileName}>
          {file.originalName}
        </Typography>
        <Button
          onClick={onClose}
          className={styles.closeButton}
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
      </div>
      <div className={styles.content}>
        {file.mimeType.startsWith('image/') ? (
          <div className={styles.imageContainer}>
            <img 
              src={file.url} 
              alt={file.originalName} 
              className={styles.image}
            />
          </div>
        ) : file.mimeType.startsWith('application/pdf') ? (
          <div className={styles.pdfContainer}>
            <iframe 
              src={file.url} 
              title={file.originalName}
              className={styles.pdfFrame}
            />
          </div>
        ) : file.mimeType === 'text/plain' || file.mimeType === 'application/json' ? (
          <div className={styles.textContainer}>
            <pre className={styles.textContent}>{file.content}</pre>
          </div>
        ) : (
          <div className={styles.downloadContainer}>
            <Typography variant="body1" className={styles.downloadText}>
              This file type cannot be previewed. Click download to save the file.
            </Typography>
            <Button
              variant="contained"
              onClick={handleDownload}
              className={styles.downloadButton}
              startIcon={<DownloadIcon />}
            >
              Download {file.originalName}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;