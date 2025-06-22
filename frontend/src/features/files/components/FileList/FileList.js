import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import styles from './FileList.module.css';

const FileList = ({ files, onDownload }) => (
  <List className={styles.fileList}>
    {files.map((file) => (
      <ListItem 
        key={file._id} 
        className={styles.fileItem}
        secondaryAction={
          <IconButton 
            edge="end" 
            onClick={() => onDownload(file)}
            className={styles.downloadButton}
          >
            <DownloadIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={
            <Link to={`/files/${file._id}`} className={styles.fileText}>
              {file.originalName}
            </Link>
          }
          secondary={`Type: ${file.mimeType} | Size: ${(file.size / 1024).toFixed(2)} KB`}
        />
      </ListItem>
    ))}
  </List>
);

export default FileList; 