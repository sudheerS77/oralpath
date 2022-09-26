require("dotenv").config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import session from "express-session";

//configs
import routeConfig from "./config/route.config";

//DataBase connection
import ConnectDB from "./database/connection";

//Microservices Routes
import Auth from "./API/Authentication/index";
import Projects from "./API/Project/index";
import photos from "./API/Gallery/index";
import Events from "./API/Events/index";
import Brochure from "./API/Brochure/brochure";
import Slider from "./API/slider";
import Achievememts from "./API/Achievements/index";
import Faculty from "./API/Faculty/index";
import PgStudents from "./API/PGStudents/index";
import User from "./API/User/index";
import Feedback from "./API/Feedback/index";
import Payment from "./API/Payments/index";

const app = express();

//Application Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// app.use(session({
//   cookie:{
//       secure: true,
//       maxAge:60000
//          },
//   //store: new RedisStore(),
//   secret: 'secret',
//   saveUninitialized: true,
//   resave: false
//   }));

//passport configuration
routeConfig(passport);

//Application Routes
app.use("/opapi/auth", Auth);
app.use("/opapi/projects", Projects);
app.use("/opapi/photos", photos);
app.use("/opapi/events", Events);
app.use("/opapi/brochure", Brochure);
app.use("/opapi/faculty", Faculty);
app.use("/opapi/pg", PgStudents);
app.use("/opapi/slider", Slider);
app.use("/opapi/achievements", Achievememts);
app.use("/opapi/user", User);
app.use("/opapi/feedback", Feedback);
app.use("/opapi/payment", Payment);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

app.listen(4000, () =>
  ConnectDB()
    .then(() => console.log("Server is running \n DB connected"))
    .catch(() => console.log("Server is running DB didnt connected"))
);
