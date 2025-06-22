import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileList from './FileList';

const mockFiles = [
  {
    _id: '1',
    originalName: 'test.txt',
    mimeType: 'text/plain',
    size: 1024
  },
  {
    _id: '2',
    originalName: 'image.jpg',
    mimeType: 'image/jpeg',
    size: 2048
  }
];

const mockOnFileClick = jest.fn();
const mockOnDownload = jest.fn();

describe('FileList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders list of files', () => {
    render(
      <FileList 
        files={mockFiles} 
        onFileClick={mockOnFileClick} 
        onDownload={mockOnDownload} 
      />
    );

    expect(screen.getByText('test.txt')).toBeInTheDocument();
    expect(screen.getByText('image.jpg')).toBeInTheDocument();
  });

  test('calls onFileClick when file is clicked', () => {
    render(
      <FileList 
        files={mockFiles} 
        onFileClick={mockOnFileClick} 
        onDownload={mockOnDownload} 
      />
    );

    fireEvent.click(screen.getByText('test.txt'));
    expect(mockOnFileClick).toHaveBeenCalledWith(mockFiles[0]);
  });

  test('calls onDownload when download button is clicked', () => {
    render(
      <FileList 
        files={mockFiles} 
        onFileClick={mockOnFileClick} 
        onDownload={mockOnDownload} 
      />
    );

    const downloadButtons = screen.getAllByRole('button');
    fireEvent.click(downloadButtons[0]);
    expect(mockOnDownload).toHaveBeenCalledWith(mockFiles[0]);
  });

  test('displays file size in KB', () => {
    render(
      <FileList 
        files={mockFiles} 
        onFileClick={mockOnFileClick} 
        onDownload={mockOnDownload} 
      />
    );

    expect(screen.getByText(/1.00 KB/)).toBeInTheDocument();
    expect(screen.getByText(/2.00 KB/)).toBeInTheDocument();
  });
}); 