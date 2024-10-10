import { validateAddQuestionPaper } from "../middleware/validateReq";
import express from "express";
import { ObjectId } from "mongodb";
import { validateToken } from "../middleware/validateToken";
import moment from "moment";
import { addQuestionPaper, deleteQuestionPaperById, getAllQuestionPapers, getmonthlyQuestionpaper, getQuestionPaperById, getQuestionPapersBySubject, getweeklyQuestionpaper, updateQuestionPaperById } from "../controller/questionPaperApi";

export const questionPaperRoutes = express();
 



  //Add question paper
  questionPaperRoutes.post("/addquestionpaper",validateToken,validateAddQuestionPaper, async function (request, response) {
    try {
      console.log("addquestionpaper", request.body);
      const { sub_name, _id,user_id, ...questionpaperData } = request.body;
      console.log(sub_name);
      console.log(questionpaperData);
      console.log(user_id);
      
  
      const data = await addQuestionPaper(questionpaperData, sub_name,user_id);
      console.log("data", data);
  
      response.status(201).json({statuscode: 201,data:data });
    } catch (error) {
      console.log(error);
      
      response.status(500).json({statuscode: 500, error: "Error fetching questions" });
    }
  });

  //Get all Question paper
  questionPaperRoutes.get("/getallquestionpaper",validateToken, async function (req, res) {
    try {
      const data = await getAllQuestionPapers();
      // console.log(data);
      
      res.status(200).json({statuscode: 200,data:data });
    } catch (error) {
      console.error(error);
      res.status(500).json({statuscode: 500, error: "Error fetching questions" });
    }
  });


  //get Questionpaper by id
  questionPaperRoutes.get("/get/:id", validateToken,async function (request, response) {
    try{
    const questionPaperId = new ObjectId(request.params.id);
    const data = await getQuestionPaperById(questionPaperId);
    response.status(200).json(data);
     //Ok request suceed status200
  }
    catch(error){
      response.status(500).json({ statuscode: 500,error: "Error fetching question paper" });
  
    }
  });

  //get Questionpaper by subject
  questionPaperRoutes.get("/getpaper/:sub_name/:user_id", validateToken,async function (request, response) {
    try{
    const sub_name = request.params.sub_name;
    const user_id = request.params.user_id;
    console.log(sub_name);
    
    const data = await getQuestionPapersBySubject(sub_name,user_id);
    console.log(data);
    
    response.status(200).json({statuscode: 200,data:data });
     //Ok request suceed status200
  }
    catch(error){
      response.status(500).json({ statuscode: 500,error: "Error fetching question paper" });
  
    }
  });

  //get weekly data
  questionPaperRoutes.get("/getweeklyquestionpaper/:year/:user_id",validateToken, async function (req, res) {
    try {
        // const year = req.params.year;
        const year = Number(req.params.year);
        const user_id = req.params.user_id;
      const result = await getweeklyQuestionpaper(year,user_id);
      console.log(result);
   
      const data = result.map(item => {
        const startOfWeek = moment().year(item._id.year).isoWeek(item._id.week+1).startOf('isoWeek').format("MMM Do YY");
    
  
      //  const endOfWeek = startOfWeek.clone().endOf('isoWeek');
       return ({ week: startOfWeek,
        count: item.count
    })});
      console.log(data);
      
      res.status(200).json({statuscode: 200,data:data });
    } catch (error) {
      console.error(error);
      res.status(500).json({statuscode: 500, error: "Error fetching questions" });
    }
  });

  //get monthly data
  questionPaperRoutes.get("/getmonthlyquestionpaper/:year/:user_id",validateToken, async function (req, res) {
    try {
        // const year = req.params.year;
        const year = Number(req.params.year);
        const user_id = req.params.user_id;
      const result = await getmonthlyQuestionpaper(year,user_id);
      console.log(result);
   
      const data = result.map(item => {
        const startOfmonth = moment().month(item._id.month).format('YYYY-MM');
    
  
      //  const endOfWeek = startOfWeek.clone().endOf('isoWeek');
       return ({ month: startOfmonth,
        count: item.count
    })});
      console.log(data);
      
      res.status(200).json({statuscode: 200,data:data });
    } catch (error) {
      console.error(error);
      res.status(500).json({statuscode: 500, error: "Error fetching questions" });
    }
  });

  //delete question paper by id
  questionPaperRoutes.delete("/delete/:id",validateToken, async function (request, response) {
    try{
    const questionPaperId = new ObjectId(request.params.id);
  
    const data = await deleteQuestionPaperById(questionPaperId);
    response.json({statuscode: 200,data:data });}
    catch(error){
      response.status(500).json({statuscode: 500, error: "Error deleting question paper" });
      //internal server error status500
  
    }
  });

  
//edit question paper 
questionPaperRoutes.put("/update",validateToken, async function (request, response) {
    try{
    console.log(request.body);
    const { _id, ...questionPaper } = request.body;
    // const questionPaperId = new ObjectId(_id);
    console.log("_id", _id);
    console.log("questionPaper", questionPaper);
  
    
    const data = await updateQuestionPaperById(_id, questionPaper);
    console.log("data",data);
    
    response.json({statuscode: 200,data:data });}
    catch(error){
      response.status(500).json({ statuscode: 500, error: "Error updating question paper" });
  
    }
  });
  
  module.exports ={questionPaperRoutes}
