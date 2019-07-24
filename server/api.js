import { Router } from "express";
import { getClient } from "./db";
import { ObjectID } from "mongodb";
const api = new Router();

api.get("/", (_, res, next) => {
  const client = getClient();

  client.connect((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Hello, Heroku!" });
    client.close();
  });
});

api.get("/test", (_, res, next) => {
  const client = getClient();

  client.connect((err) => {
    if (err) {
      return next(err);
    }
    res.send("this is a test ");
    client.close();
  });
});

api.post("/student", (req, res) => {
  console.log("here", req.body)
  const client = getClient()

  client.connect(function () {
    const db = client.db("CYFFeedbackDB")
    const collection = db.collection("student_profile")
    collection.insertOne(req.body, function (error, result) {
      res.send(error || result)
      client.close()
    })
  })
})


api.get('/student/:name', (req, res, next) => {
  const client = getClient();
  const studentName = req.params.name

  client.connect(function () {
    const db = client.db("CYFFeedbackDB")
    const collection = db.collection("student_profile")
    collection.find({name: studentName}).toArray(function (error, result) {
      console.log(result)
      res.send(error || result)
      client.close()
    })
  })
})



// api.get('/student/:id', (req, res, next) => {
//   console.log('I AM HEREEEEEEEEE')
//   const client = getClient();
//   const _id = new ObjectID(req.params.id)

//   client.connect(function () {
//     const db = client.db("CYFFeedbackDB")
//     const collection = db.collection("student_profile")
//     collection.find({ _id }).toArray(function (error, result) {
//       console.log(result)
//       res.send(error || result)
//       client.close()
//     })
//   })
// })



export default api;
