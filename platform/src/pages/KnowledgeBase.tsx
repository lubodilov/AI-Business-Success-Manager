import React, { useState } from 'react';
import { Link2, FileText, AlertCircle, Loader2, CheckCircle, X, BookOpen, User } from 'lucide-react';
import { uploadDocumentToRAG, isValidDocumentUrl, getFileNameFromUrl } from '../lib/api';
import type { Document } from '../types';

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentUrl, setDocumentUrl] = useState('');
  const [documentType, setDocumentType] = useState<'general' | 'persona'>('general');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!documentUrl.trim()) {
      setError('Please enter a document URL');
      return;
    }

    if (!isValidDocumentUrl(documentUrl)) {
      setError('Invalid document URL. Please provide a direct link to a PDF, DOCX, DOC, or TXT file.');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await uploadDocumentToRAG(documentUrl, documentType);

      if (response.success) {
        const newDoc: Document = {
          id: response.documentId || Date.now().toString(),
          name: getFileNameFromUrl(documentUrl),
          status: 'ready',
          uploadDate: new Date().toISOString(),
          url: documentUrl,
          type: documentType
        };
        
        setDocuments(prev => [...prev, newDoc]);
        setDocumentUrl('');
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process document';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Knowledge Base</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add documents to your knowledge base by providing their URLs
          </p>
        </div>
      </div>

      {/* URL Input Form */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-2">
                Document Type
              </label>
              <div className="flex gap-4">
                <label className={`
                  flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                  ${documentType === 'general' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}
                `}>
                  <input
                    type="radio"
                    name="documentType"
                    value="general"
                    checked={documentType === 'general'}
                    onChange={(e) => setDocumentType(e.target.value as 'general')}
                    className="sr-only"
                  />
                  <BookOpen className={`h-5 w-5 mr-2 ${documentType === 'general' ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <div>
                    <p className={`font-medium ${documentType === 'general' ? 'text-indigo-700' : 'text-gray-900'}`}>
                      General Knowledge
                    </p>
                    <p className="text-sm text-gray-500">Business documents, reports, guides</p>
                  </div>
                </label>

                <label className={`
                  flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                  ${documentType === 'persona' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}
                `}>
                  <input
                    type="radio"
                    name="documentType"
                    value="persona"
                    checked={documentType === 'persona'}
                    onChange={(e) => setDocumentType(e.target.value as 'persona')}
                    className="sr-only"
                  />
                  <User className={`h-5 w-5 mr-2 ${documentType === 'persona' ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <div>
                    <p className={`font-medium ${documentType === 'persona' ? 'text-indigo-700' : 'text-gray-900'}`}>
                      Persona AI
                    </p>
                    <p className="text-sm text-gray-500">Personality traits, communication style</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="documentUrl" className="block text-sm font-medium text-gray-700">
                Document URL
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Link2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="documentUrl"
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
                    placeholder="https://example.com/document.pdf"
                    value={documentUrl}
                    onChange={(e) => setDocumentUrl(e.target.value)}
                    disabled={isProcessing}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isProcessing || !documentUrl.trim()}
                  className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Add to Knowledge Base'
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Supported formats: PDF, DOCX, DOC, TXT
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Added Documents</h2>
        </div>
        {documents.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Link2 className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">No documents added yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <li key={doc.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div className="ml-3 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                      {doc.url && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 hover:text-indigo-600 truncate block"
                        >
                          {doc.url}
                        </a>
                      )}
                      <p className="text-sm text-gray-500">
                        Added on {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <span className={`
                      inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium
                      ${doc.type === 'general' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'}
                    `}>
                      {doc.type === 'general' ? (
                        <BookOpen className="h-4 w-4 mr-1" />
                      ) : (
                        <User className="h-4 w-4 mr-1" />
                      )}
                      {doc.type === 'general' ? 'General' : 'Persona'}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Ready
                    </span>
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}