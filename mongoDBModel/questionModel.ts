import mongoose, { Document, Schema } from 'mongoose';

export interface Question extends Document {
  // _id: number;
  question:string;
  answer_type: string;
  answer_choice: string;
  marks_alloted: number;
  
}

export const QuestionSchema: Schema<Question> = new Schema({
    // _id: { type: Number, required: true },
    question:{ type: String, required: true },
    answer_type: { type: String, required: true },
    answer_choice: { type: String, default:""},
    marks_alloted: { type: Number, required: true },
  });

  export const QuestionModel = mongoose.model<Question>('Question', QuestionSchema);
