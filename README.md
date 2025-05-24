# AI Service

## Project Overview
The AI Service is the intelligence core of the Resume ATS Score Analyzer application. This microservice is dedicated to processing submitted resumes against job descriptions to generate an ATS compatibility score and provide insightful, actionable feedback for resume optimization.

## Key Responsibilities & Features
Resume-Job Description Matching: Receives resume files (PDFs) and job descriptions for analysis.
ATS Score Generation: Utilizes integrated Artificial Intelligence (AI) capabilities (via OpenAI/Google Gemini API) to assess the resume's alignment with the provided job description and calculate an ATS compatibility score.
Contextual Feedback: Provides detailed and understandable suggestions for improvement, highlighting strengths and areas where the resume could be enhanced to better match the job requirements.
Scalable Processing: Designed to handle analysis requests efficiently, ensuring timely responses for users.

### Technologies Used
Backend Framework: Node.js (Express.js)
AI Integration: OpenAI API / Google Gemini API (for advanced natural language processing and comparison).

### Role in Architecture
The AI Service is a critical backend microservice within the application's architecture. It is consumed by the API Gateway, which forwards analysis requests from the UI. This clear separation allows the AI processing logic to be independently developed, deployed, and scaled based on computational demands, ensuring the overall application remains performant and maintainable.