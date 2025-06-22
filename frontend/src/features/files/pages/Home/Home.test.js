import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import * as filesAPI from '../../api/files';

// Mock the API functions
jest.mock('../../api/files');

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders home page with title', () => {
    filesAPI.getFiles.mockResolvedValue([]);
    
    render(<Home />);
    
    expect(screen.getByText('Your Files')).toBeInTheDocument();
  });

  test('loads and displays files on mount', async () => {
    const mockFiles = [
      { _id: '1', originalName: 'test.txt', mimeType: 'text/plain', size: 1024 }
    ];
    filesAPI.getFiles.mockResolvedValue(mockFiles);
    
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('test.txt')).toBeInTheDocument();
    });
  });

  test('shows loading state while fetching files', () => {
    filesAPI.getFiles.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<Home />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('handles file upload', async () => {
    filesAPI.getFiles.mockResolvedValue([]);
    filesAPI.uploadFile.mockResolvedValue({ _id: '1', originalName: 'uploaded.txt' });
    
    render(<Home />);
    
    const file = new File(['test content'], 'uploaded.txt', { type: 'text/plain' });
    const input = screen.getByRole('button').previousElementSibling;
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(filesAPI.uploadFile).toHaveBeenCalledWith(file);
    });
  });

  test('handles file click for text files', async () => {
    const mockFiles = [
      { _id: '1', originalName: 'test.txt', mimeType: 'text/plain', size: 1024 }
    ];
    filesAPI.getFiles.mockResolvedValue(mockFiles);
    filesAPI.downloadFile.mockResolvedValue({ data: 'Hello, world!' });
    
    render(<Home />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('test.txt'));
    });
    
    await waitFor(() => {
      expect(filesAPI.downloadFile).toHaveBeenCalledWith('1');
    });
  });

  test('handles download button click', async () => {
    const mockFiles = [
      { _id: '1', originalName: 'test.txt', mimeType: 'text/plain', size: 1024 }
    ];
    filesAPI.getFiles.mockResolvedValue(mockFiles);
    filesAPI.downloadFile.mockResolvedValue({ data: new Blob(['test']) });
    
    render(<Home />);
    
    await waitFor(() => {
      const downloadButtons = screen.getAllByRole('button');
      fireEvent.click(downloadButtons[0]); // Download button
    });
    
    await waitFor(() => {
      expect(filesAPI.downloadFile).toHaveBeenCalledWith('1');
    });
  });
}); 