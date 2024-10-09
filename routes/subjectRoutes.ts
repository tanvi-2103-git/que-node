import { addSubject, getAllSubjects } from "../api/subjectApi";

import express from "express";
import { validateToken } from "../middleware/validateToken";

export const subjectRoutes = express();

//subject 
//get all subject
subjectRoutes.get("/getallsubjects",validateToken, async function (req, res) {
  try {
    const data = await getAllSubjects();
    // console.log(data);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching questions" });
  }
});


//add subject
subjectRoutes.post("/addsubject",validateToken, async function (request, response) {
  try {
    console.log("addsubject", request.body);
    const  subject  = request.body;
    console.log(subject);
    
    const data = await addSubject(subject);
    console.log(data);

    response.status(201).json(data);
  } catch (error) {
    response.status(500).send("Error adding subject");
  }
});

module.exports = {subjectRoutes}