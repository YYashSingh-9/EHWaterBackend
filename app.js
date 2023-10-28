const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const IssueThreadRouter = require("./Routes/IssueThreadRoute");
const ReviewRouter = require("./Routes/ReviewRoute");
const userRouter = require("./Routes/UserRoute");
const ErrorController = require("./Controllers/ErrorController");
const rateLimit = require("express-rate-limit");
const path = require("path");
const xss = require("xss-clean");
const app = express();

// * Global middleware (CORS) (Cross Origin Resource Sharing)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["SET-COOKIE"],
    methods: ["PATCH", "GET", "PUT", "POST", "HEAD", "DELETE"],
  })
);

// serving static files
app.use(express.static(path.join(__dirname, "public")));

// 1.Body parser middleware & Cookie parser
// This is body parser..(v.v.imp) this parses the data comming from request.
app.use(express.json());
// This is cookie parser..
app.use(cookieParser());
// 2.Sanitizing from noSQL injections.
app.use(mongoSanitize());
// 3.Sanitizing from malicious HTMl code(XSS).
app.use(xss());
// 4.Sanitizing from Brute force/DOSS acttacks(rate limiter).
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000,
  message: "Too many requests from this IP. Please try again later",
});
app.use("/api", limiter);
// 5.Compressing the data shared -> this middleware compresses the data(JSON,BSON,Files,Images) shared.
app.use(compression());

app.use("/api/v3/user", userRouter);
app.use("/api/v3/issues", IssueThreadRouter);
app.use("/api/v3/reviews", ReviewRouter);
app.use(ErrorController);

module.exports = app;
