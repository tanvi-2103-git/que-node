import express from "express";
import "./config/mongoDB";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import { userRoutes } from "./routes/userRoutes";
import { questionPaperRoutes } from "./routes/questionPaperRoutes";
import { subjectRoutes } from "./routes/subjectRoutes";

app.use(express.json());
app.use(cors());

//port
app.listen(process.env.PORT, () => console.log("Application sever started"));

// Middleware
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/questionPaper", questionPaperRoutes);
app.use("/api/subject", subjectRoutes);

// //login user
// app.post("/login",validateLoginUser, async (req, res) => {
//   const user: User | null = await User.findOne({ email: req.body.email });

//   const { email, password } = req.body;
//    if (user) {
//      const matchPassword = await bcrypt.compare(password, user.password);
//      console.log("password", password);
//      console.log("user.password", user.password);

//      console.log("matchPassword",matchPassword);

//     if (email === user.email && matchPassword) {
//       // Generate JWT token
//       // const token = generateToken({ id: user._id, username: user.username });
//       const token = jwt.sign({ id: user._id, username: user.username }, 'your-secret-key-here', {
//         expiresIn: 200000,
//       });
//       res.json({

//         success: true,
//         message: "Authentication successful!",
//         token: token,
//         _id: user._id
//       });
//     } else {
//       res.status(401).json({
//         success: false,
//         message: "Invalid username or password",
//       });
//     }
//   }
// });
//register user
// app.post("/register",validateRegisterUser, async (req, res) => {
//   try {
//     const { username, email, password, contactNumber, confirmPassword } = req.body;

//     const user = new User({ username, email, password, contactNumber,confirmPassword });

//     await user.save();
//     console.log(user);

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.log(error);

//     res.status(400).json({ error });
//   }
// });

// app.get("/questions/getall",validateToken, async function (req, res) {
//   try {
//     const data = await getAllQuestions();
//     console.log(data);

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error fetching questions" });
//   }
// });

// //Add question paper
// app.post("/questions/addquestionpaper",validateToken,validateAddQuestionPaper, async function (request, response) {
//   try {
//     console.log("addquestionpaper", request.body);
//     const { sub_name, _id,user_id, ...questionpaperData } = request.body;
//     console.log(sub_name);
//     console.log(questionpaperData);
//     console.log(user_id);

//     const data = await addQuestionPaper(questionpaperData, sub_name,user_id);
//     console.log("data", data);

//     response.status(201).json(data);
//   } catch (error) {
//     console.log(error);

//     response.status(500).send("Error adding question Paper");
//   }
// });

// //Get all Question paper
// app.get("/questions/getallquestionpaper",validateToken, async function (req, res) {
//   try {
//     const data = await getAllQuestionPapers();
//     // console.log(data);

//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error fetching questions" });
//   }
// });

// //get Questionpaper by id
// app.get("/questions/get/:id", validateToken,async function (request, response) {
//   try{
//   const questionPaperId = new ObjectId(request.params.id);
//   const data = await getQuestionPaperById(questionPaperId);
//   response.status(200).json(data);
//    //Ok request suceed status200
// }
//   catch(error){
//     response.status(500).json({ error: "Error fetching question paper" });

//   }
// });

// //delete question paper by id
// app.delete("/questions/delete/:id",validateToken, async function (request, response) {
//   try{
//   const questionPaperId = new ObjectId(request.params.id);

//   const data = await deleteQuestionPaperById(questionPaperId);
//   response.json(data);}
//   catch(error){
//     response.status(500).json({ error: "Error deleting question paper" });
//     //internal server error status500

//   }
// });

// //edit question paper
// app.put("/questions/update",validateToken, async function (request, response) {
//   try{
//   console.log(request.body);
//   const { _id, ...questionPaper } = request.body;
//   // const questionPaperId = new ObjectId(_id);
//   console.log("_id", _id);
//   console.log("questionPaper", questionPaper);

//   const data = await updateQuestionPaperById(_id, questionPaper);
//   console.log("data",data);

//   response.json(data);}
//   catch(error){
//     response.status(500).json({ error: "Error updating question paper" });

//   }
// });

//subject
//get all subject
// app.get("/api/questionPaper/getallsubjects",validateToken, async function (req, res) {
//   try {
//     const data = await getAllSubjects();
//     // console.log(data);

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error fetching questions" });
//   }
// });

// //add subject
// app.post("/api/questionPaper/addsubject",validateToken, async function (request, response) {
//   try {
//     console.log("addsubject", request.body);
//     const  subject  = request.body;
//     console.log(subject);

//     const data = await addSubject(subject);
//     console.log(data);

//     response.status(201).json(data);
//   } catch (error) {
//     response.status(500).send("Error adding subject");
//   }
// });

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
