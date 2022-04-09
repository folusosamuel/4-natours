import * as fs from "fs";
import express from "express";
const app = express();
const __dirname = "./";

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello from the server side", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint....");
// });

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/starter/dev-data/data/tours-simple.json`,
    //`./starter/dev-data/data/tours-simple.json`,
    function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    }
  )
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port  $(port)....`);
});
