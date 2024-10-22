import moment from "moment";
import { QuestionPaper, QuestionPaperModel } from "../mongoDBModel/questionPaperModel";
import { SubjectModel } from "../mongoDBModel/subjectModel";
import { ObjectId } from 'mongodb';


export async function getQuestionPaperByIdService(id:ObjectId){
  return await QuestionPaperModel.findById(id).exec();
  
}

export async function deleteQuestionPaperByIdService(_id:ObjectId){
  return await QuestionPaperModel.deleteOne({_id:_id});
 
  
}
export async function updateQuestionPaperByIdService(_id:string,questionPaper:QuestionPaper){
  //  const { _id, ...updateData } = employee;
   return await QuestionPaperModel.updateOne({_id:_id},questionPaper); 
}
export async function addQuestionPaperService(questionPaper:QuestionPaper,sub_name:string,user_id:string) {
    // const QuestionPaperDoc = new QuestionPaperModel(questionPaper);
    // return await QuestionPaperDoc.save();
    const subject = await SubjectModel.findOne({ sub_name });
    console.log("apisubname",sub_name);
    
      if (!subject) {
        console.log(subject);
        
        
  
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
// getAllQuestionPapers
export async function getAllQuestionPapersService() {
    const result = await QuestionPaperModel.find({}).exec();
    // console.log(result);

    return result;
}

// getAllQuestionPapers
export async function getQuestionPapersBySubjectService(sub_name:string,user_id:string) {
  const result = await QuestionPaperModel.find({sub_name:sub_name,user_id:user_id}).exec();
  // console.log(result);

  return result;
}

export async function getweeklyQuestionpaperService(year:number,user_id:string) {
  try {
    const startOfYear = moment().year(year).startOf('year').toDate();
    const endOfYear = moment().year(year).endOf('year').toDate();

    const weeklyData = await QuestionPaperModel.aggregate([
        {
            $match: {
              user_id,
                createdAt: {
                    $gte: startOfYear, //Greater Than or Equal To
                    $lte: endOfYear  //less Than or Equal To
                }
            }
        },
        {
            $group: {
                _id: {
                    week: { $week: "$createdAt" },  // Group by week number
                    year: { $year: "$createdAt" }   // Group by year
                },
                count: { $sum: 1 },               // Count the number of documents per week
            }
        },
        {
            $sort: { "_id.year": 1, "_id.week": -1 } // Sort by year and week
        }
    ]);

    return weeklyData;
} catch (error) {
    console.error('Error retrieving weekly data:', error);
    throw error; // Handle error as needed
}
}

export async function getmonthlyQuestionpaperService(year:number,user_id:string) {
  try {
    const startOfYear = moment().year(year).startOf('year').toDate();
    const endOfYear = moment().year(year).endOf('year').toDate();

    const monthlyData = await QuestionPaperModel.aggregate([
        {
            $match: {
              user_id,
                createdAt: {
                    $gte: startOfYear,
                    $lte: endOfYear
                }
            }
        },
        {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },  // Group by week number
                    year: { $year: "$createdAt" }   // Group by year
                },
                count: { $sum: 1 },               // Count the number of documents per week
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": -1 } // Sort by year and week
        }
    ]);

    return monthlyData;
} catch (error) {
    console.error('Error retrieving monthly data:', error);
    throw error; // Handle error as needed
}
}