import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileViewer from './FileViewer';

const mockOnClose = jest.fn();

describe('FileViewer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders nothing when no file is provided', () => {
    const { container } = render(<FileViewer file={null} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders image viewer for image files', () => {
    const imageFile = {
      originalName: 'test.jpg',
      mimeType: 'image/jpeg',
      url: 'http://example.com/test.jpg'
    };

    render(<FileViewer file={imageFile} onClose={mockOnClose} />);
    
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
    expect(screen.getByAltText('test.jpg')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  test('renders text viewer for text files', () => {
    const textFile = {
      originalName: 'test.txt',
      mimeType: 'text/plain',
      content: 'Hello, world!'
    };

    render(<FileViewer file={textFile} onClose={mockOnClose} />);
    
    expect(screen.getByText('test.txt')).toBeInTheDocument();
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  test('renders download option for unsupported files', () => {
    const pdfFile = {
      originalName: 'test.pdf',
      mimeType: 'application/pdf',
      url: 'http://example.com/test.pdf'
    };

    render(<FileViewer file={pdfFile} onClose={mockOnClose} />);
    
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    expect(screen.getByText(/cannot be previewed/)).toBeInTheDocument();
    expect(screen.getByText('Download test.pdf')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const file = {
      originalName: 'test.txt',
      mimeType: 'text/plain',
      content: 'test'
    };

    render(<FileViewer file={file} onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });
}); 