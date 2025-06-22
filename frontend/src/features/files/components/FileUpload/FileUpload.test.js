import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUpload from './FileUpload';

const mockOnUpload = jest.fn();

describe('FileUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders upload button', () => {
    render(<FileUpload onUpload={mockOnUpload} />);
    
    expect(screen.getByText('Upload File')).toBeInTheDocument();
    expect(screen.getByText(/Supported formats/)).toBeInTheDocument();
  });

  test('calls onUpload when file is selected', () => {
    render(<FileUpload onUpload={mockOnUpload} />);
    
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByRole('button').previousElementSibling;
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(mockOnUpload).toHaveBeenCalledWith(file);
  });

  test('disables upload when disabled prop is true', () => {
    render(<FileUpload onUpload={mockOnUpload} disabled={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('shows help text with supported formats', () => {
    render(<FileUpload onUpload={mockOnUpload} />);
    
    expect(screen.getByText(/TXT, JPG, PNG, JSON, PDF/)).toBeInTheDocument();
  });
}); 