import { GoogleGenAI } from "@google/genai";
import { DailyReport, Project, Task } from "./types";

export const analyzeProjectDelays = async (project: Project, tasks: Task[], reports: DailyReport[]) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === '') {
    console.error("Matrix AI Error: API_KEY is missing. Please check your GitHub Repository Secrets.");
    return "AI Analysis Unavailable: Please ensure the API_KEY is set in your GitHub Secrets.";
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  const prompt = `
    As a construction project management expert, analyze the following project data for "Matrix Constructions".
    
    Project: ${project.name}
    Location: ${project.location}
    Current Progress: ${project.progress}%
    Timeline: ${project.startDate} to ${project.targetEndDate}
    
    Tasks Status:
    ${tasks.map(t => `- ${t.name}: Status=${t.status}, Deadline=${t.endDate}`).join('\n')}
    
    Recent Site Updates:
    ${reports.slice(-5).map(r => `- Date: ${r.date}, Progress Note: ${r.notes}`).join('\n')}
    
    Provide a professional summary of:
    1. Critical risks or delays detected.
    2. Recommendations for the Site Engineer.
    3. Estimated impact on the final completion date.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4096 }
      }
    });
    return response.text;
  } catch (error: any) {
    console.error("Matrix AI analysis failed", error);
    if (error?.message?.includes('API key not valid')) {
      return "Error: The API key is not valid. Please check your GitHub Secrets.";
    }
    return "The AI engine is currently busy. Please try again in a few minutes.";
  }
};
