import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const FileList = ({ files, onFileClick, onDownload }) => (
  <List>
    {files.map((file) => (
      <ListItem key={file._id} secondaryAction={
        <IconButton edge="end" onClick={() => onDownload(file)}>
          <DownloadIcon />
        </IconButton>
      }>
        <ListItemText
          primary={file.originalName}
          secondary={`Type: ${file.mimeType} | Size: ${(file.size / 1024).toFixed(2)} KB`}
          onClick={() => onFileClick(file)}
          style={{ cursor: 'pointer' }}
        />
      </ListItem>
    ))}
  </List>
);

export default FileList; 