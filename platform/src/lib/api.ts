import axios from 'axios';

const RAG_API_BASE_URL = 'https://ragapibg.com';

export interface UploadResponse {
  success: boolean;
  message: string;
  documentId?: string;
  ingestedFiles?: number;
  datasetId?: string;
}

const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.docx', '.doc', '.txt'];

export const isValidDocumentUrl = (url: string): boolean => {
  try {
    // Handle S3 URLs - accept them as is
    if (url.startsWith('s3://')) {
      return true;
    }

    // Handle HTTP/HTTPS URLs
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    
    // Check if it's a direct file link
    const isDirectFileLink = ALLOWED_FILE_EXTENSIONS.some(ext => pathname.endsWith(ext));
    
    // Ensure it's not a Google Drive preview link
    const isGoogleDrivePreview = urlObj.hostname.includes('drive.google.com') && 
                                pathname.includes('view');
    
    return isDirectFileLink && !isGoogleDrivePreview;
  } catch {
    return false;
  }
};

export const getFileNameFromUrl = (url: string): string => {
  try {
    // Handle S3 URLs
    if (url.startsWith('s3://')) {
      const s3Path = url.substring(5);
      const pathSegments = s3Path.split('/');
      return pathSegments[pathSegments.length - 1];
    }

    // Handle HTTP/HTTPS URLs
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    return pathSegments[pathSegments.length - 1];
  } catch {
    return url;
  }
};

export const uploadDocumentToRAG = async (documentUrl: string, type: 'general' | 'persona'): Promise<UploadResponse> => {
  try {
    const payload = {
      files: [documentUrl],
      datasetId: type === 'general' ? 'default_dataset' : 'persona_ai'
    };

    const axiosInstance = axios.create({
      baseURL: RAG_API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    try {
      const response = await axiosInstance.post('/ingest', payload);
      return {
        success: true,
        message: response.data.message || 'Document successfully ingested',
        documentId: response.data.documentId,
        ingestedFiles: response.data.ingestedFiles,
        datasetId: payload.datasetId
      };
    } catch (error: any) {
      console.error('RAG API Error:', {
        message: error?.message || 'Unknown error',
        status: error?.response?.status,
        data: error?.response?.data,
        code: error?.code
      });

      if (error.code === 'ERR_NETWORK') {
        return {
          success: false,
          message: 'Cannot connect to the server. Please check your internet connection and try again.'
        };
      }
      
      if (error.response?.status === 403) {
        return {
          success: false,
          message: 'Access denied. Please check your credentials.'
        };
      }

      if (error.response?.status === 413) {
        return {
          success: false,
          message: 'Document size exceeds the maximum limit.'
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || 'Failed to process document. Please try again.'
      };
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    };
  }
};