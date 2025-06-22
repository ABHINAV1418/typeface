import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { downloadFile, getFiles } from '../../api/files';
import FileViewer from '../../components/FileViewer/FileViewer';
import { CircularProgress, Button, Box } from '@mui/material';

const FileViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFiles().then(files => {
      const found = files.find(f => f._id === id);
      if (found) {
        if (found.mimeType.startsWith('image/') || found.mimeType.startsWith('application/pdf')) {
          setFile({ ...found, url: `http://localhost:5000/${found.path}` });
        } else if (found.mimeType === 'text/plain') {
          downloadFile(found._id).then(res => {
            res.data.text().then(text => {
              setFile({ ...found, content: text });
            });
          });
        } else {
          setFile({ ...found, url: `http://localhost:5000/api/files/${found._id}` });
        }
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!file) return <div>File not found</div>;

  return (
    <Box>
      <Button onClick={() => navigate(-1)} variant="outlined" style={{ marginBottom: 16 }}>
        Back
      </Button>
      <FileViewer file={file} onClose={() => navigate(-1)} />
    </Box>
  );
};

export default FileViewPage; 