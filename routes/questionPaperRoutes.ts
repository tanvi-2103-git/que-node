import { addQuestionPaper, deleteQuestionPaperById, getAllQuestionPapers, getQuestionPaperById, updateQuestionPaperById } from "../api/questionPaperApi";
import { validateAddQuestionPaper } from "../middleware/validateReq";
import express from "express";
import { ObjectId } from "mongodb";
import { validateToken } from "../middleware/validateToken";

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
  
      response.status(201).json(data);
    } catch (error) {
      console.log(error);
      
      response.status(500).send("Error adding question Paper");
    }
  });

  //Get all Question paper
  questionPaperRoutes.get("/getallquestionpaper",validateToken, async function (req, res) {
    try {
      const data = await getAllQuestionPapers();
      // console.log(data);
      
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching questions" });
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
      response.status(500).json({ error: "Error fetching question paper" });
  
    }
  });

  //delete question paper by id
  questionPaperRoutes.delete("/delete/:id",validateToken, async function (request, response) {
    try{
    const questionPaperId = new ObjectId(request.params.id);
  
    const data = await deleteQuestionPaperById(questionPaperId);
    response.json(data);}
    catch(error){
      response.status(500).json({ error: "Error deleting question paper" });
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
    
    response.json(data);}
    catch(error){
      response.status(500).json({ error: "Error updating question paper" });
  
    }
  });
  
  module.exports ={questionPaperRoutes}
