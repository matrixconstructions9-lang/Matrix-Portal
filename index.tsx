
import { GoogleGenAI } from "@google/genai";
import { DailyReport, Project, Task } from "./types";

// Service to analyze project delays using Gemini
export const analyzeProjectDelays = async (project: Project, tasks: Task[], reports: DailyReport[]) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === '') {
    console.error("Matrix AI Error: API_KEY is missing. Please check your Netlify environment variables.");
    return "AI Analysis Unavailable: Please ensure the API_KEY is set in your site settings.";
  }

  // Always create a new instance right before the API call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  const prompt = `
    As a construction project management expert, analyze the following project data for "Matrix Constructions".
    
    Project: ${project.name}
    Current Progress: ${project.progress}%
    Timeline: ${project.startDate} to ${project.targetEndDate}
    
    Tasks:
    ${tasks.map(t => `- ${t.name}: Status=${t.status}, Target End=${t.endDate}`).join('\n')}
    
    Recent Daily Reports:
    ${reports.slice(-5).map(r => `- Date: ${r.date}, Notes: ${r.notes}`).join('\n')}
    
    Identify potential risks, delay causes, and suggest corrective actions in a concise summary.
  `;

  try {
    const response = await ai.models.generateContent({
      // Use gemini-3-pro-preview for complex reasoning tasks like construction risk analysis
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        // Set a thinking budget to allow for detailed reasoning on complex construction tasks
        thinkingConfig: { thinkingBudget: 4096 }
      }
    });
    // Use the .text property to extract generated content as per SDK guidelines
    return response.text;
  } catch (error: any) {
    console.error("AI analysis failed", error);
    if (error?.message?.includes('API key not valid')) {
      return "Error: The API key you provided is not valid. Please double-check it in Google AI Studio.";
    }
    return "Unable to perform AI analysis at this time. Please check site connection.";
  }
};
