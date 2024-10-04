import mongoose, { Document, Schema } from 'mongoose';

export interface Question extends Document {
  // _id: number;
  question:string;
  answer_type: string;
  answer_choice: string;
  marks_alloted: number;
  
}

export interface Subject extends Document{
  sub_name: string;
}

export interface QuestionPaper extends Document {
  // _id: number;
  questions: Question[];
  sub_name: string;
  // createdAt?: Date; 
  // updatedAt?: Date; 
}


const QuestionSchema: Schema<Question> = new Schema({
  // _id: { type: Number, required: true },
  question:{ type: String, required: true },
  answer_type: { type: String, required: true },
  answer_choice: { type: String, required: true },
  marks_alloted: { type: Number, required: true },
});

const SubjectSchema:Schema<Subject> = new Schema({
  sub_name: { type: String, required: true, unique: true }
})
const QuestionPaperSchema: Schema<QuestionPaper> = new Schema({
  // _id: { type: Number, required: true },
  questions: [QuestionSchema],
  sub_name: { type: String, required: true,ref: 'Subject' },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

export const QuestionModel = mongoose.model<Question>('Question', QuestionSchema);
export const SubjectModel = mongoose.model<Subject>('Subject',SubjectSchema);
export const QuestionPaperModel = mongoose.model<QuestionPaper>('QuestionPaper', QuestionPaperSchema);


// export default QuestionPaper;





// import { Question } from "../Class/question";

// const mongoose = require('mongoose');

// const QuestionSchema = new mongoose.Schema({
//   question_id: { type: Number, required: true }, 
//   answer_type: { type: String, required: true },
//   answer_choice: { type: String, required: true },
//   marks_alloted: { type: Number, required: true } 
// });

// const QuestionPaperSchema = new mongoose.Schema({
//   _id: { type: Number, required: true }, 
//   questions: [QuestionSchema], 
//   subject: { type: String, required: true }, 
// //   createdAt: { type: Date, default: Date.now }, 
// //   updatedAt: { type: Date, default: Date.now } 
// });


// const QuestionPaper = mongoose.model('QuestionPaper', QuestionPaperSchema);

// module.exports = QuestionPaper;
