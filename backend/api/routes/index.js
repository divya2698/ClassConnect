import studentRouter from "./student-route.js";
import teacherRouter from "./teacher-route.js";
import noteRouter from "./noterouter.js";
import flashcardRouter from "./flashcard-route.js";
import courseRouter from "./courserouter.js";
import messageRouter from "./messagerouter.js";
import quizRouter from "./quizrouter.js";

//push the router onto the the app
export default (app) => {
    app.use("/teacher", teacherRouter);
    app.use("/note", noteRouter);
    app.use("/student", studentRouter);
    app.use("/api/course", courseRouter);
    app.use("/api", courseRouter);
    app.use("/api", messageRouter);
    app.use("/api", quizRouter);
    app.use("/flashcard", flashcardRouter);
};
