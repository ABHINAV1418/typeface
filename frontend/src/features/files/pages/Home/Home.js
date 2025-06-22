import React, { useEffect, useState } from 'react';
import { Container, Typography, Snackbar, CircularProgress, Box } from '@mui/material';
import FileList from '../../components/FileList/FileList';
import FileUpload from '../../components/FileUpload/FileUpload';
import { getFiles, uploadFile, downloadFile } from '../../api/files';
import styles from './Home.module.css';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    <Container maxWidth="md" className={styles.container}>
      
      <FileUpload onUpload={handleUpload} disabled={loading} />

      <Typography variant="h4" className={styles.title}>
        Your Files
      </Typography>
      
      <Box className={styles.fileListContainer}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <FileList 
            files={files} 
            onDownload={handleDownload} 
          />
        )}
      </Box>
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={4000} 
        onClose={() => setError('')} 
        message={error}
        className={styles.errorSnackbar}
      />
      <Snackbar 
        open={!!success} 
        autoHideDuration={3000} 
        onClose={() => setSuccess('')} 
        message={success}
        className={styles.successSnackbar}
      />
    </Container>
  );
};

export default Home; 