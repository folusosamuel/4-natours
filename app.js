import * as fs from "fs";
import express from "express";
import morgan from "morgan";
const app = express();
const __dirname = "./";

const tourRouter = express.Router();
const userRouter = express.Router();

//1. MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware!");
  next();
});

app.use((req, res, next) => {
  req.requesttime = new Date().toISOString();
  next();
});

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

//2. ROUTE HANDLERS

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); //create new object with the new id and body
  tours.push(newTour); //push the new object into the existing array of objects

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getTour = (req, res) => {
  const id = req.params.id * 1; //convert the params numbers which are strings into number by multiplying by 1
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tours: tour, //or simply use "tour" only on this line
    },
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
  res.status(204).json({
    status: "success",
    data: {
      tour: null,
    },
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

//3. ROUTE
//We create a router for each resource. Ex: When the request hits tours,
// it will be managed by tourRouter.
//Tours
app.use("/api/v1/tours", tourRouter);

tourRouter.route("/").get(getAllTours).post(createTour);

tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

//Users
app.use("/api/v1/users", userRouter);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

//4. START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port  $(port)....`);
});
