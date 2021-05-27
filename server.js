// const http = require("http");
// const fs = require("fs");


// if the base URL is hit, it logs to the console
// http
//     .createServer(function (req, res) {
//         if(req.url === "/"){
//             console.log('works so far')
//         }
//     })
//     .listen(3000, function () {
//         console.log("Server Started!!!");
//       });

const http = require("http");
const fs = require("fs");

const path = require("path");

// function deleteAfter7Seconds(res) {
//     setTimeout(function(){
//         fs.unlink("./content/verbage.txt", () => {
//         fs.rmdir("content", () => (console.log("content removed")));
//         }) }, 7000);
// }


function deleteAfter7Seconds(res) {
    setTimeout(() => {
      fs.rmdir("content", { recursive: true }, function (err) {
        if (err) {
          console.log("Something is wrong: ", err);
          //res.end("Something is wrong: ", err);
        } else {
          console.log("Content folder deleted");
          //res.end("Content folder deleted");
        }
      });
    }, 7000);
  }
  http
    .createServer(function (request, response) {
      if (request.url === "/create-directory" && request.method === "POST") {
        fs.mkdir("content", function (err) {
          if (err) {
            response.end("Sorry there is an error: ", err);
          } else {
            console.log("Content Folder created");
            response.end("Content Folder created");
          }
        });
      }
      if (request.url === "/create-text" && request.method === "POST") {
        let body = "";
        request.on("data", function (data) {
          body += data.toString();
        });
        request.on("end", function () {
        //   let parsedBody = JSON.parse(body);
          fs.writeFile("randomText.txt", "sfrgecvhbhvgb", function (err) {
            if (err) {
              response.end("Sorry there is an error: ", err);
            } else {
              console.log(` created`);
              response.end(` created`);
            }
          });
        });
      }
      if (request.url === "/new-folder-and-file" && request.method === "POST") {
        let body = "";
        request.on("data", function (data) {
          body += data.toString();
        });
        request.on("end", function () {
        //   let parsedBody = JSON.parse(body);
          fs.writeFile("content/verbage.txt", "Hardcoded Text!", function (err) {
            if (err) {
              response.end("Sorry there is an error: ", err);
            } else {
              deleteAfter7Seconds(response);
              console.log("verbage.txt created");
              response.end("verbage.txt created");
              // console.log(`${parsedBody.fileName} created`);
              // response.end(`${parsedBody.fileName} created`);
            }
          });
        });
      }
    })
    .listen(3000, function () {
      console.log(`Server started at port 3000`);
    });