import React, { useEffect, useState } from 'react';
import { Container, Typography, Snackbar, CircularProgress, Box, Modal } from '@mui/material';
import FileList from '../components/FileList';
import FileUpload from '../components/FileUpload';
import FileViewer from '../components/FileViewer';
import { getFiles, uploadFile, downloadFile } from '../api/files';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const data = await getFiles();
      setFiles(data);
    } catch (err) {
      setError('Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      await uploadFile(file);
      setSuccess('File uploaded successfully');
      fetchFiles();
    } catch (err) {
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (file) => {
    // For images and text, fetch and preview; for others, just show download
    if (file.mimeType.startsWith('image/')) {
      setSelectedFile({ ...file, url: `http://localhost:5000/${file.path}` });
      setViewerOpen(true);
    } else if (file.mimeType === 'text/plain' || file.mimeType === 'application/json') {
      try {
        const res = await downloadFile(file._id);
        const text = await res.data.text();
        setSelectedFile({ ...file, content: text });
        setViewerOpen(true);
      } catch {
        setError('Failed to load file content');
      }
    } else {
      // For other types, just provide download link
      setSelectedFile({ ...file, url: `http://localhost:5000/api/files/${file._id}` });
      setViewerOpen(true);
    }
  };

  const handleDownload = async (file) => {
    try {
      const res = await downloadFile(file._id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setError('Download failed');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Files
      </Typography>
      <FileUpload onUpload={handleUpload} />
      <Box mt={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          <FileList files={files} onFileClick={handleFileClick} onDownload={handleDownload} />
        )}
      </Box>
      <Modal open={viewerOpen} onClose={() => setViewerOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 300 }}>
          <FileViewer file={selectedFile} onClose={() => setViewerOpen(false)} />
        </Box>
      </Modal>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')} message={error} />
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess('')} message={success} />
    </Container>
  );
};

export default Home; 