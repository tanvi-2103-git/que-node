// import { error } from "console";
import mongoose from "mongoose";
import {  QuestionPaper, QuestionPaperModel } from "../mongoDBModel/questionPaperModel";

import { ObjectId } from 'mongodb';
// import { User } from "../mongoDBModel/User";
// import { Subject, SubjectModel } from "../mongoDBModel/subjectModel";
import moment from 'moment';
import { Request, Response } from 'express';
import { addQuestionPaperService, getAllQuestionPapersService, getmonthlyQuestionpaperService, getQuestionPaperByIdService, getQuestionPapersBySubjectService, getweeklyQuestionpaperService } from "../service/questionPaper";
interface AuthReq extends Request {
  user: {
      id: ObjectId;
  }
}

export const getQuestionPaperById = async (request: Request, response: Response) => {
  try{
        console.log("request", request);
        
      const questionPaperId = new ObjectId(request.params.id);
      const data = await getQuestionPaperByIdService(questionPaperId);
      console.log("response");
      
      response.status(200).json(data);
       //Ok request suceed status200
    }
      catch(error){
        response.status(500).json({ statuscode: 500,error: "Error fetching question paper" });
    
      }
    }




//deleteQuestionPaperById
export const deleteQuestionPaperById = async function (request: Request, response: Response) {
  try{
  const questionPaperId = new ObjectId(request.params.id);

  const data = await await QuestionPaperModel.deleteOne({_id:questionPaperId});
  response.json({statuscode: 200,data:data });}
  catch(error){
    response.status(500).json({statuscode: 500, error: "Error deleting question paper" });
    //internal server error status500

  }
}

// //updateQuestionPaperById

export const updateQuestionPaperById = async function (request: Request, response: Response) {
  try{
  console.log(request.body);
  const { _id, ...questionPaper } = request.body;
  // const questionPaperId = new ObjectId(_id);
  console.log("_id", _id);
  console.log("questionPaper", questionPaper);

  
  const data = await QuestionPaperModel.updateOne({_id:_id},questionPaper)
  console.log("data",data);
  
  response.json({statuscode: 200,data:data });}
  catch(error){
    response.status(500).json({ statuscode: 500, error: "Error updating question paper" });

  }
}


//addQuestionPaper

export const addQuestionPaper = async function (request: Request, response: Response) {
    try {
      console.log("addquestionpaper", request.body);
      const { sub_name, _id,user_id, ...questionpaperData } = request.body;
      console.log(sub_name);
      console.log(questionpaperData);
      console.log(user_id);
      
  
      const data = await addQuestionPaperService(questionpaperData, sub_name,user_id);
      console.log("data", data);
  
      response.status(201).json({statuscode: 201,data:data });
    } catch (error) {
      console.log(error);
      
      response.status(500).json({statuscode: 500, error: "Error fetching questions" });
    }
  }




export const getAllQuestionPapers = async function (request: Request, response: Response) {
  try {
        const data = await getAllQuestionPapersService();
        // console.log(data);
        
        response.status(200).json({statuscode: 200,data:data });
      } catch (error) {
        console.error(error);
        response.status(500).json({statuscode: 500, error: "Error fetching questions" });
      }
    }


export const getQuestionPapersBySubject = async function (request: Request, response: Response) {
  try{
      const sub_name = request.params.sub_name;
      const user_id = request.params.user_id;
      console.log(sub_name);
      
      const data = await getQuestionPapersBySubjectService(sub_name,user_id);
      console.log(data);
      
      response.status(200).json({statuscode: 200,data:data });
       //Ok request suceed status200
    }
      catch(error){
        response.status(500).json({ statuscode: 500,error: "Error fetching question paper" });
    
      }
    }



export const getweeklyQuestionpaper = async function (request: Request, response: Response) {
  try {
          // const year = req.params.year;
          const year = Number(request.params.year);
          const user_id = request.params.user_id;
        const result = await getweeklyQuestionpaperService(year,user_id);
        console.log(result);
     
        const data = result.map(item => {
          const startOfWeek = moment().year(item._id.year).isoWeek(item._id.week+1).startOf('isoWeek').format("MMM Do YY");
      
    
        //  const endOfWeek = startOfWeek.clone().endOf('isoWeek');
         return ({ week: startOfWeek,
          count: item.count
      })});
        console.log(data);
        
        response.status(200).json({statuscode: 200,data:data });
      } catch (error) {
        console.error(error);
        response.status(500).json({statuscode: 500, error: "Error fetching questions" });
      }
    }


export const getmonthlyQuestionpaper = async function (request: Request, response: Response) {
  try {
          // const year = req.params.year;
          const year = Number(request.params.year);
          const user_id = request.params.user_id;
        const result = await getmonthlyQuestionpaperService(year,user_id);
        console.log(result);
     
        const data = result.map(item => {
          const startOfmonth = moment().month(item._id.month).format('YYYY-MM');
      
    
        //  const endOfWeek = startOfWeek.clone().endOf('isoWeek');
         return ({ month: startOfmonth,
          count: item.count
      })});
        console.log(data);
        
        response.status(200).json({statuscode: 200,data:data });
      } catch (error) {
        console.error(error);
        response.status(500).json({statuscode: 500, error: "Error fetching questions" });
      }
    }













//getAllSubjects
// export async function getAllSubjects() {
//     const result = await SubjectModel.find({}).exec();
//     console.log(result);

//     return result;
// }

// getQuestionPaperById
// export async function getQuestionPaperById(id:ObjectId){
//   return await QuestionPaperModel.findById(id).exec();
  
// }

// export async function deleteQuestionPaperById(_id:ObjectId){
//   return await QuestionPaperModel.deleteOne({_id:_id});
 
  
// }
// export async function updateQuestionPaperById(_id:string,questionPaper:QuestionPaper){
//   //  const { _id, ...updateData } = employee;
//    return await QuestionPaperModel.updateOne({_id:_id},questionPaper); 
// }
// export async function addQuestionPaper(questionPaper:QuestionPaper,sub_name:string,user_id:string) {
//     // const QuestionPaperDoc = new QuestionPaperModel(questionPaper);
//     // return await QuestionPaperDoc.save();
//     const subject = await SubjectModel.findOne({ sub_name });
//     console.log("apisubname",sub_name);
    
//       if (!subject) {
//         console.log(subject);
        
//         return error
  
//       }
//       console.log(subject);
//       const questionPaperData = {
//         ...questionPaper, 
//         sub_name, 
//         user_id
//       };
      
//     const QuestionPaperDoc = new QuestionPaperModel(questionPaperData);
//     console.log("QuestionPaperDoc", QuestionPaperDoc);
    
//     return await QuestionPaperDoc.save();
// }
//getAllQuestionPapers
// export async function getAllQuestionPapers() {
//     const result = await QuestionPaperModel.find({}).exec();
//     // console.log(result);

//     return result;
// }

//getAllQuestionPapers
// export async function getQuestionPapersBySubject(sub_name:string,user_id:string) {
//   const result = await QuestionPaperModel.find({sub_name:sub_name,user_id:user_id}).exec();
//   // console.log(result);

//   return result;
// }

// export async function getweeklyQuestionpaper(year:number,user_id:string) {
//   try {
//     const startOfYear = moment().year(year).startOf('year').toDate();
//     const endOfYear = moment().year(year).endOf('year').toDate();

//     const weeklyData = await QuestionPaperModel.aggregate([
//         {
//             $match: {
//               user_id,
//                 createdAt: {
//                     $gte: startOfYear,
//                     $lte: endOfYear
//                 }
//             }
//         },
//         {
//             $group: {
//                 _id: {
//                     week: { $week: "$createdAt" },  // Group by week number
//                     year: { $year: "$createdAt" }   // Group by year
//                 },
//                 count: { $sum: 1 },               // Count the number of documents per week
//                 // papers: { $push: "$$ROOT" }       // Optional: push the documents to an array
//             }
//         },
//         {
//             $sort: { "_id.year": 1, "_id.week": 1 } // Sort by year and week
//         }
//     ]);

//     return weeklyData;
// } catch (error) {
//     console.error('Error retrieving weekly data:', error);
//     throw error; // Handle error as needed
// }
// }

// export async function getmonthlyQuestionpaper(year:number,user_id:string) {
//   try {
//     const startOfYear = moment().year(year).startOf('year').toDate();
//     const endOfYear = moment().year(year).endOf('year').toDate();

//     const monthlyData = await QuestionPaperModel.aggregate([
//         {
//             $match: {
//               user_id,
//                 createdAt: {
//                     $gte: startOfYear,
//                     $lte: endOfYear
//                 }
//             }
//         },
//         {
//             $group: {
//                 _id: {
//                     month: { $month: "$createdAt" },  // Group by week number
//                     year: { $year: "$createdAt" }   // Group by year
//                 },
//                 count: { $sum: 1 },               // Count the number of documents per week
//                 // papers: { $push: "$$ROOT" }       // Optional: push the documents to an array
//             }
//         },
//         {
//             $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and week
//         }
//     ]);

//     return monthlyData;
// } catch (error) {
//     console.error('Error retrieving monthly data:', error);
//     throw error; // Handle error as needed
// }
// }

//addSubject
// export async function addSubject(subject:Subject) {
//     const SubjectDoc = new SubjectModel(subject);
//     return await SubjectDoc.save();
// }

//
// export async function addUser(user:User) {
//   const UserDoc = new User(user);
//   return await UserDoc.save();
// }
// export async function getUserByName(email:string){

//   // const regexPattern = new RegExp(emp_name, 'i');

//   // 1. schema key for employee name

//   return await User.find({'email':email}).exec();

// }

// async function getEmployeesByName(emp_name){

//   // 1. search query, 2.  i : insensitive

//   const regexPattern = new RegExp(emp_name, 'i');

//   // 1. schema key for employee name

//   return await EmployeeModel.find({'emp_name':{ $regex: regexPattern}}).exec();

// }


