import React from 'react';

const FileViewer = ({ file, onClose }) => {
  if (!file) return null;

  // Only preview text and images, otherwise offer download
  if (file.mimeType.startsWith('image/')) {
    return (
      <div>
        <img src={file.url} alt={file.originalName} style={{ maxWidth: '100%' }} />
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  if (file.mimeType === 'text/plain' || file.mimeType === 'application/json') {
    return (
      <div>
        <pre style={{ maxHeight: 400, overflow: 'auto' }}>{file.content}</pre>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  return (
    <div>
      <a href={file.url} download={file.originalName}>Download {file.originalName}</a>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FileViewer; 