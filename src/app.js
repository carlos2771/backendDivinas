import express from "express";
import morgan from"morgan";
import router from "./routes/producto.routes.js";
import routeUser from "./routes/user.routes.js"
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// app.use(upload.single('img'));
app.use(cors());

app.use(morgan("dev"));
app.use(express.json({ limit: '10mb' }));
app.use("/api",router)
app.use("/api",routeUser)
app.use(bodyParser.urlencoded({extended: true}))

// app.use(express.json());


export default app;