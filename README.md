# AI-Business-Success-Manager

## Project Overview
The AI Business Success Manager is a sophisticated web application that leverages artificial intelligence to provide businesses with strategic insights and customer understanding. The platform combines advanced AI capabilities with Retrieval-Augmented Generation (RAG) technology to deliver personalized business advice and customer behavior simulation.
Core Functionality
The platform offers two distinct AI interaction modes:
Business Success Manager Mode: Provides strategic business advice and insights based on uploaded business documents
Advanced AI Persona Mode: Simulates target customer behavior and provides feedback from a customer's perspective

## Features
1. Dashboard
Real-time business metrics visualization
AI-generated insights display
Quick access to key platform features
Activity tracking and progress monitoring
2. Knowledge Base Management
Document upload functionality supporting PDF, DOCX, DOC, and TXT formats
Dual knowledge base categorization:
General Knowledge (Business Strategy)
Persona AI (Customer Behavior)
Document status tracking and management
Secure file handling through URL-based uploads
3. AI Chat Interface
Dual-mode AI interaction:
Success Manager mode for business strategy
Persona mode for customer simulation
Real-time chat functionality
Context-aware responses using RAG technology
Chat history preservation
Loading states and error handling
4. Task Management
AI-assisted task creation and tracking
Deadline management
Task status updates (pending, in-progress, completed)
AI recommendations for task prioritization
Daily task planning and review
5. AI Guide
Comprehensive usage guidelines
Best practices for:
Knowledge base management
AI interaction
Task planning
Strategic decision-making
Tips for maximizing platform value


## Tools and Technologies
Frontend Framework
React 18.3.1
TypeScript for type safety
Vite for build tooling and development server
UI Components and Styling
Tailwind CSS for styling
Lucide React for iconography
Custom React components for:
Layout management
File uploading
Chat interface
Task management
State Management
React Hooks for local state management
React Context for theme and authentication (when implemented)
Routing
React Router v6 for navigation
Protected routes capability
API Integration
Axios for HTTP requests
OpenAI API integration for AI functionality
Custom RAG API integration for document processing

## Installation and Setup

Clone the Repository

Environment Setup Create a .env file in the root directory:
VITE_OPENAI_API_KEY=your_openai_api_key


Install Dependencies
npm install


Start Development Server
npm run dev


## Dependencies
Core Dependencies
{
  "axios": "^1.6.7",
  "lucide-react": "^0.344.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-dropzone": "^14.2.3",
  "react-router-dom": "^6.22.3",
  "openai": "^4.28.0"
}


Development Dependencies
{
  "@vitejs/plugin-react": "^4.3.1",
  "autoprefixer": "^10.4.18",
  "eslint": "^9.9.1",
  "postcss": "^8.4.35",
  "tailwindcss": "^3.4.1",
  "typescript": "^5.5.3",
  "vite": "^5.4.2"
}


# RAG API OVERVIEW
The RAG (Retrieval-Augmented Generation) Python API is designed to facilitate the ingestion and retrieval of document data using a vector database. The API allows users to ingest documents from AWS S3, process them using embeddings, store them in a vector database, and retrieve the most relevant chunks based on a given prompt. It also includes a basic UI for displaying datasets and chunks.
Note: The API is already deployed and accessible HERE .





## Features
Ingest Documents: Upload documents from S3 (PDF, TXT, DOC, DOCX, CSV, JSON) and store them in the vector database with associated metadata.
Retrieve Chunks: Retrieve the top 3 most similar chunks based on a prompt and dataset ID.
Delete Datasets: Remove all data associated with a specific dataset ID.
Basic UI: View datasets and their chunks through a simple web interface.
Supports Multiple File Formats: Including PDF, TXT, DOC, DOCX, CSV, and JSON.
Open Source Tools: Built using open-source libraries and tools, avoiding any proprietary APIs.

## Tools and Technologies
Programming Language: Python 3.8+
Web Framework: FastAPI
Vector Database: Qdrant – an open-source vector database for storing embeddings.
Document Processing:
Apache Tika: For extracting text from various document formats.
pdfplumber: For extracting text from PDFs.
python-docx: For extracting text from DOC and DOCX files.
pandas: For reading CSV files.
json: For handling JSON files.
NLTK (Natural Language Toolkit): For text processing, including tokenization and text normalization.
Embedding Model: SentenceTransformers (all-MiniLM-L6-v2) – a pre-trained model for generating text embeddings.
AWS SDK: Boto3 – for downloading files from AWS S3.
Web Server: Gunicorn
Reverse Proxy: Nginx
Templating Engine: Jinja2
Styling: Bootstrap 4

## Installation and Setup
Prerequisites
Python 3.8+
pip (Python package installer)
Git
Java Runtime Environment: Required for Apache Tika.
AWS Account: For accessing S3 buckets.
AWS Credentials: Configured on your local machine.
Setting Up the Project Locally
Follow the steps below to set up the project on your local machine.
1. Clone the Repository
Open a terminal and clone the GitHub repository:
git clone https://github.com/yourusername/rag-python-api.git
cd rag-python-api
2. Create a Virtual Environment
It's recommended to use a virtual environment to manage dependencies.
python3 -m venv venv
source venv/bin/activate
3. Install Dependencies
Update pip and install the required packages:
pip install --upgrade pip
pip install -r requirements.txt
4. Install System Dependencies
For Apache Tika and other processing tools, you need Java and other system packages.
On Ubuntu/Debian:
sudo apt-get update
sudo apt-get install default-jre poppler-utils
On macOS:
brew update
brew install java poppler
5. Set Up Environment Variables
Create a .env file in the project root directory to store environment variables.
touch .env
Add the following variables to the .env file:
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION_NAME=your_aws_region


QDRANT_HOST=localhost
QDRANT_PORT=6333
EMBEDDING_MODEL_NAME=all-MiniLM-L6-v2
MAX_CHUNK_SIZE=500
TEMP_DIR=/tmp
LOG_LEVEL=INFO
Note: Replace the placeholders with your actual AWS credentials and desired settings.
6. Run Qdrant Vector Database Locally
You can run Qdrant locally using Docker.
Install Docker if not already installed.
Run Qdrant using Docker:
docker run -p 6333:6333 qdrant/qdrant
Alternatively, you can install Qdrant natively. Refer to Qdrant's documentation for installation instructions.
7. Start the FastAPI Application
Run the application using Uvicorn.
uvicorn app.main:app --reload
This will start the server at http://localhost:8000/.
8. Access the API and UI
API Endpoints: You can access the API endpoints at http://localhost:8000/ingest, /retrieve, and /delete.
Basic UI: Open your web browser and navigate to http://localhost:8000/ to access the basic UI.

API Endpoints
POST /ingest
Description: Ingests files from S3 URLs, processes them, and stores the chunks in the vector database with the provided dataset ID.
Request Body:
{
    "files": ["s3://your-bucket-name/file1.pdf", "s3://your-bucket-name/file2.txt"],
    "datasetId": "your_dataset_id"
}
Response:
{
    "message": "Files successfully ingested and stored in the vector database",
    "ingestedFiles": 2,
    "datasetId": "your_dataset_id"
}
POST /retrieve
Description: Retrieves the top 3 most similar chunks from the database, filtered by the dataset ID, based on the provided prompt.
Request Body:
{
    "prompt": "Your query here",
    "datasetId": "your_dataset_id"
}
Response:
{
    "prompt": "Your query here",
    "datasetId": "your_dataset_id",
    "results": [
        {"chunk": "First similar chunk..."},
        {"chunk": "Second similar chunk..."},
        {"chunk": "Third similar chunk..."}
    ]
}
POST /delete
Description: Deletes all data associated with the provided dataset ID from the vector database.
Request Body:
{
    "datasetId": "your_dataset_id"
}
Response:
{
    "message": "All data associated with datasetId 'your_dataset_id' has been deleted."
}

Basic UI
Access: Navigate to http://localhost:8000/ in your web browser.
Features:
Datasets List: View all available datasets.
Dataset Details: Click on a dataset to view all associated chunks.
Styled Interface: Basic styling using Bootstrap for improved user experience.

Testing the API
To fully test the API, follow the steps below using cURL commands or any HTTP client like Postman.

Examples
Full API Testing Example
Step 1: Ingest Files
Use the /ingest endpoint to ingest files from your S3 bucket.
Request:
curl -X POST http://localhost:8000/ingest \
-H "Content-Type: application/json" \
-d '{
    "files": [
        "s3://your-bucket-name/file1.pdf",
        "s3://your-bucket-name/file2.txt"
    ],
    "datasetId": "dataset123"
}'
Response:
{
    "message": "Files successfully ingested and stored in the vector database",
    "ingestedFiles": 2,
    "datasetId": "dataset123"
}
Step 2: Retrieve Chunks
Use the /retrieve endpoint to retrieve the top 3 most similar chunks based on a prompt.
Request:
curl -X POST http://localhost:8000/retrieve \
-H "Content-Type: application/json" \
-d '{
    "prompt": "Tell me about the features",
    "datasetId": "dataset123"
}'
Response:
{
    "prompt": "Tell me about the features",
    "datasetId": "dataset123",
    "results": [
        {"chunk": "First similar chunk..."},
        {"chunk": "Second similar chunk..."},
        {"chunk": "Third similar chunk..."}
    ]
}
Step 3: Delete Dataset
Use the /delete endpoint to delete all data associated with the dataset ID.
Request:
curl -X POST http://localhost:8000/delete \
-H "Content-Type: application/json" \
-d '{
    "datasetId": "dataset123"
}'
Response:
{
    "message": "All data associated with datasetId 'dataset123' has been deleted."
}
Step 4: Access the UI
Open your web browser and navigate to:
http://178.128.247.20/


View Datasets: You should see a list of datasets (if any).
View Chunks: Click on a dataset to view its chunks.

Project Structure
rag-python-api/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── routes.py
│   ├── config.py
│   ├── utils.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ingest_service.py
│   │   └── retrieve_service.py
├── templates/
│   ├── index.html
│   └── dataset.html
├── static/
│   └── styles.css
├── requirements.txt
├── Dockerfile
├── .env
└── README.md



Dependencies
Python Packages:
fastapi: Web framework for building APIs.
uvicorn[standard]: ASGI server for running FastAPI applications.
requests: For making HTTP requests.
pdfplumber: For extracting text from PDFs.
tika: Apache Tika for text extraction.
nltk: Natural Language Toolkit for text processing.
sentence-transformers: For generating embeddings using models like all-MiniLM-L6-v2.
qdrant-client: Client library for interacting with Qdrant vector database.
python-dotenv: For loading environment variables from a .env file.
numpy: For numerical computations.
boto3: AWS SDK for Python, used for accessing S3.
jinja2: Templating engine for rendering HTML pages.
aiofiles: For asynchronous file operations.
python-docx: For extracting text from DOC and DOCX files.
pandas: For reading CSV files.
System Packages:
Java Runtime Environment: Required for Apache Tika.
poppler-utils: Required for PDF processing (e.g., pdftotext).
Other Tools:
Qdrant: Open-source vector database for storing embeddings.
SentenceTransformers Model: all-MiniLM-L6-v2, an open-source embedding model.
Bootstrap: Front-end framework for styling the UI.




