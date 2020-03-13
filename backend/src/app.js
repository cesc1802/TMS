const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const registerRoutes = require("./routes");

const app = express();
app.use(
    cors({
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        origin: "http://localhost:3000"
    })
);

app.use(bodyParser());
app.use(cookieParser());
registerRoutes(app);

const server = http.createServer(app);
server.listen(process.env.APP_PORT, () => {
    console.log(
        `Server has been running at http://localhost:${server.address().port}`
    );
});
