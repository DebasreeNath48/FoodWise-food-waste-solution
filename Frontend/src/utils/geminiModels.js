import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const recipeModelSystemInstruction=import.meta.env.VITE_RECIPE_SYSTEM_INSTRUCTION
const mealModelSystemInstructions=import.meta.env.VITE_MEAL_SYSTEM_INSTRUCTION

const recipeModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: recipeModelSystemInstruction,
});

const mealModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: mealModelSystemInstructions,
});

export {
    recipeModel,
    mealModel
}