import mongoose, { Document, Schema } from 'mongoose';

export interface Subject extends Document{
    sub_name: string;
    
  }

  const SubjectSchema:Schema<Subject> = new Schema({
    sub_name: { type: String, required: true, unique: true }
  })

  export const SubjectModel = mongoose.model<Subject>('Subject',SubjectSchema);
