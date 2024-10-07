import { error } from "console";
import { Question, QuestionModel, QuestionPaper, QuestionPaperModel, Subject, SubjectModel } from "../mongoDBModel/questionPaperModel";
import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
import { User } from "../mongoDBModel/User";



export async function getAllSubjects() {
    const result = await SubjectModel.find({}).exec();
    console.log(result);

    return result;
}
export async function getQuestionPaperById(id:ObjectId){
  return await QuestionPaperModel.findById(id).exec();
  
}
export async function deleteQuestionPaperById(_id:ObjectId){
  return await QuestionPaperModel.deleteOne({_id:_id});
 
  
}
export async function updateQuestionPaperById(_id:string,questionPaper:QuestionPaper){
  //  const { _id, ...updateData } = employee;
   return await QuestionPaperModel.updateOne({_id:_id},questionPaper);
   
   
}

export async function addQuestionPaper(questionPaper:QuestionPaper,sub_name:string,user_id:string) {
    // const QuestionPaperDoc = new QuestionPaperModel(questionPaper);
    // return await QuestionPaperDoc.save();
    const subject = await SubjectModel.findOne({ sub_name });
    console.log("apisubname",sub_name);
    
      if (!subject) {
        console.log(subject);
        
        return error
  
      }
      console.log(subject);
      const questionPaperData = {
        ...questionPaper, 
        sub_name, 
        user_id
      };
      
    const QuestionPaperDoc = new QuestionPaperModel(questionPaperData);
    console.log("QuestionPaperDoc", QuestionPaperDoc);
    
    return await QuestionPaperDoc.save();
}


export async function getAllQuestionPapers() {
    const result = await QuestionPaperModel.find({}).exec();
    console.log(result);

    return result;
}
export async function addSubject(subject:Subject) {
    const SubjectDoc = new SubjectModel(subject);
    return await SubjectDoc.save();
}

export async function addUser(user:User) {
  const UserDoc = new User(user);
  return await UserDoc.save();
}
export async function getUserByName(email:string){

  // const regexPattern = new RegExp(emp_name, 'i');

  // 1. schema key for employee name

  return await User.find({'email':email}).exec();

}

// async function getEmployeesByName(emp_name){

//   // 1. search query, 2.  i : insensitive

//   const regexPattern = new RegExp(emp_name, 'i');

//   // 1. schema key for employee name

//   return await EmployeeModel.find({'emp_name':{ $regex: regexPattern}}).exec();

// }


