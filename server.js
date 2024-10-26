const http = require("http");
require("dotenv").config();
const express = require("express");
const mongo = require('./src/config/MongoDB')
const BodyParser = require("body-parser");

const routes = require("./src/routes");
const { NotFound, BadRequest } = require("./src/helper/ResponseUtil");

const app = express();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })

app.use(BodyParser.json({ limit: "50mb" })); //limit upload file
app.use(BodyParser.urlencoded({ extended: false })); //limit upload file


// register base path '/'
app.get("/", (req, res) =>
    res.send(`${process.env.APP_NAME} - ${process.env.APP_VERSION}`)
);

// uncomment line below to register static file
// app.use(express.static(process.env.ROOT_FOLDER));

// register all route under '/api/v1'
app.use("/api/v1", routes);

// // Error handling multer
// app.use((error, req, res, next) => {
//     if (error instanceof multer.MulterError) {
//         if (error.code === "LIMIT_PHOTO_SIZE") {
//             BadRequest(res, "Maksimal Ukuran File Foto Profil adalah 3 MB");
//         }
//     }
// });

// set page not found as a default not found url
app.get("*", function (req, res) {
    return NotFound(res, "Page Not Found");
});

const port = process.env.SERVER_PORT;

const httpServer = http.createServer(app);

httpServer.listen(port, () =>
    console.log(`Server started, listening on port ${port}!`)
);
