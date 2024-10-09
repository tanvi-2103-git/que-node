import express from "express";
import bcrypt from "bcrypt"

const app = express();
import cors from "cors";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
// import authRoutes from './routes/auth';
import { addQuestion, getAllQuestions } from "../api/questionApi";
import {addQuestionPaper,addSubject,deleteQuestionPaperById,getAllQuestionPapers,getAllSubjects,getQuestionPaperById,updateQuestionPaperById} from "../api/questionPaperApi";
import { User } from "../mongoDBModel/User";
import bodyParser from "body-parser";
import { generateToken } from "../token/jwtUtils";
import {validateLoginUser,validateAddQuestionPaper,validateRegisterUser} from  "../middleware/validateReq"
import dotenv from 'dotenv';
dotenv.config();



//env
// console.log("MONGODB_URI", process.env.MONGODB_URI);
// console.log("Environment Variables:", process.env);

// mongoose
//   .connect(
//     process.env.MONGODB_URI as string
//   )
//   .then((success) => {
//     console.log("connected,connected.....");
//   })
//   .catch((err) => console.log(err));
mongoose
  .connect(
    "mongodb+srv://tanvidudam2103:newpass2103@cluster0.jsut3ly.mongodb.net/questionpapermaker?retryWrites=true&w=majority&appName=Cluster"
  )
  .then((success) => {
    console.log("connected,connected.....");
  })
  .catch((err) => console.log(err));


app.use(express.json());
app.use(cors());

//port
app.listen(5000, () => console.log("Application sever started"));

// Middleware
app.use(bodyParser.json());




//login user
app.post("/login",validateLoginUser, async (req, res) => {
  const user: User | null = await User.findOne({ email: req.body.email });

  const { email, password } = req.body;
   if (user) {
     const matchPassword = await bcrypt.compare(password, user.password);
     console.log("password", password);
     console.log("user.password", user.password);
     
     console.log("matchPassword",matchPassword);
     
    if (email === user.email && matchPassword) {
      // Generate JWT token
      const token = generateToken({ id: user._id, username: user.username });

      res.json({
        
        success: true,
        message: "Authentication successful!",
        token: token,
            _id: user._id
  });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  }
});
app.post("/register", validateRegisterUser, async (req, res) => {
  try {
    const { username, email, password, contactNumber } = req.body;
    console.log("password",password)
    const hash = await bcrypt.hash(password,10);
    console.log(hash,"hash")
    const trimmedHash = hash.trim();
    console.log(trimmedHash,"trimmedHash");
  //   const salt = await bcrypt.genSalt(10);
  // const password1 = await bcrypt.hash(password, salt);
    
    const user = new User({ username, email, password: password, contactNumber });
    

    await user.save();


    console.log(user.password)
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);

    // res.status(400).json({ error });
  }
});


//register user
app.get("/getall", async function (req, res) {
  try {
    const data = await getAllQuestions();
    console.log(data);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching questions" });
  }
});

//Add question paper
app.post("/addquestionpaper",validateAddQuestionPaper, async function (request, response) {
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
app.get("/questions/getallquestionpaper", async function (req, res) {
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
app.get("/questions/get/:id", async function (request, response) {
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
app.delete("/questions/delete/:id", async function (request, response) {
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
app.put("/questions/update", async function (request, response) {
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

//subject 
//get all subject
app.get("/questions/getallsubjects", async function (req, res) {
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
app.post("/questions/addsubject", async function (request, response) {
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






// POST API: Add a QuestionPaper

// app.post('/questions/addquestionpaper', async function(request, response) {

//     try {

//       const { questions, sub_name } = request.body;

//       // Check if subject exists

//       const subject = await SubjectModel.findOne({ sub_name });

//       if (!subject) {

//         return response.status(400).json({ error: 'Subject not found' });

//       }

//       // Create new question paper

//       response.status(201).json(newQuestionPaper);

//     } catch (error) {

//       console.error(error);

//       response.status(500).json({ error: 'Internal server error' });

//     }

//   });

//     const subject = await SubjectModel.findOne({ sub_name });

//   if (!subject) {

//     return response.status(400).json({ error: 'Subject not found' });

//   }
// app.post("/questions/add", async function(request,response){
//     console.log("addquestion",request.body);

//     const data=await addQuestion(request.body);
//     console.log(data);

//     response.send(data);

//  });
//  app.post("/questions/add", async function(request, response) {
//     try {
//         console.log("addquestion", request.body);

//         const data = await addQuestion(request.body);
//         console.log(data);

//         response.status(201).json(data);
//     } catch (error) {
//         response.status(500).send("Error adding question");
//     }
// });

// app.get("/questions/getall",async function(req,res){
//     // const data =await getAllQuestions();
//     // res.json(data);
//     try {
//         const data = await getAllQuestions();
//         res.send(data); // It's better to send JSON
//     } catch (error) {
//         res.status(500).send("Error fetching questions");
//     }
// })

// app.post("/user/adduser", async function (request, response) {
//   try {
//     console.log("adduser", request.body);
//     const { userData } = request.body;
//     const data = await addUser(userData);
//     console.log("data", data);
//     response.status(201).json(data);
//   } catch (error) {
//     response.status(500).send("Error adding user");
//   }
// });
// app.post("/user/login", async function (request, response) {
//   const { username, email, password, contactNumber } = request.body;
//   const data: User | null = await User.findOne({ email: request.body.email });

//   // response.send(data);
//   if (!data) {
//     response.status(401).json({
//       message: "Auth failed",
//     });
//   } else {
//     if ((request.body.password = data.password)) {
//       response.send(data);
//     }
//   }
// });