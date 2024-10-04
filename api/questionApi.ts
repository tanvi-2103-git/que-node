import { Question, QuestionModel, QuestionPaperModel } from "../mongoDBModel/questionPaperModel";
import mongoose from "mongoose";

export async function getAllQuestions() {
    const result = await QuestionModel.find({}).exec();
    console.log(result);

    return result;
}
// export async function getAllQuestions() {
//     try {
//         const result = await QuestionModel.find({}).exec();
//         return result; // Make sure to return the result
//     } catch (error) {
//         console.error("Error fetching questions:", error);
//         throw error; // Rethrow to handle in the API route
//     }
// }

export async function addQuestion(question:Question){
    const QuestionDoc = new QuestionModel(question);
    return await QuestionDoc.save();
    
    
 }