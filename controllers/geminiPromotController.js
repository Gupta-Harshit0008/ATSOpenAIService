const { GoogleGenAI } = require("@google/genai");
const fs = require('fs'); // Import the 'fs' module for synchronous functions
const { token } = require("morgan");
const { promises: fsp } = fs; // Alias fs.promises for clarity (optional)
require('dotenv').config();
const jwt=require('jsonwebtoken')
const ai = new GoogleGenAI({ apiKey: process.env.GEN_AI_GEMINI });
const {promisify} =require('util')

exports.promptController =async (req, res) => {
    try {
        const resumeText = req.body.resumeText; // Get extracted text from req.body
        const jobDescription = req.body.jobDescription;
        const prompt = `Analyze the following resume against this job description and provide an estimated ATS score out of 100.  Also, provide a list of no more than 5 key areas where the resume could be improved to better match the job description.
        Resume:
        ${resumeText}
        Job Description:
        ${jobDescription}`;

        // console.log("Prompt:", prompt);
        // console.log("Resume Text (snippet):", resumeText.substring(0, 200));  // Log a snippet

        const geminiPrompt = prompt; // Combine prompt and resume

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash", // Or the appropriate model
            contents: geminiPrompt
        });
        const geminiResponseText = response.text; 
 let atsScore = 0;
        let feedback = [];

        // Example parsing (this will need to be adapted to Gemini's actual response format)
        const scoreMatch = geminiResponseText.match(/ATS Score: (\d+)/);  // Example regex
        if (scoreMatch && scoreMatch[1]) {
            atsScore = parseInt(scoreMatch[1], 10);
        }
        const feedbackMatch = geminiResponseText.match(/Weaknesses:\n(.*)/s); // Example regex
        if (feedbackMatch && feedbackMatch[1]) {
            feedback = feedbackMatch[1].trim().split("\n").map(item => item.trim()).filter(item => item); //split by new line
        }

        res.status(200).json({
            status: 'success',
            message: geminiResponseText, // Include the full message for debugging
            atsScore: atsScore,
            // filename: req.file.filename,
            // path: req.file.path
        });
    } catch (e) {
        console.error("Gemini API Error:", e);
        res.status(500).json({
            status: 'failure',
            message: e.message || 'Error calling Gemini API'
        });
    } finally {
        if (req.file && req.file.path) {
            await fsp.unlink(req.file.path); // Use fsp (fs.promises) for async
        }
    }
}

exports.isLoggedin = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'failure',
        message: 'Unauthorized, You are not logged in. Please login to continue',
      });
    }

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decode);
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'failure',
      message: 'Invalid token',
    });
  }
};
