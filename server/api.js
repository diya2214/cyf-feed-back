import { Router } from "express";
import { getClient } from "./db";

const api = new Router();

api.get("/", (_, res, next) => {
  const client = getClient();

  client.connect(err => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Hello, Heroku!" });
    client.close();
  });
});

api.get("/test", (_, res, next) => {
  const client = getClient();

  client.connect(err => {
    if (err) {
      return next(err);
    }
    res.send("this is a test ");
    client.close();
  });
});

api.post("/student", (req, res) => {
  const client = getClient();

  client.connect(function () {
    const db = client.db("cyf_feedback");
    const collection = db.collection("student_profile");
    collection.insertOne(req.body, function (error, result) {
      res.send(error || result);
      client.close();
    });
  });
});

api.get("/students", (req, res, next) => {
  const client = getClient();
  client.connect(function () {
    const db = client.db("cyf_feedback");
    const collection = db.collection("student_profile");
    collection.find({}).toArray(function (error, result) {
      res.send(error || result);
      client.close();
    });
  });
});
// ADD LEAD MENTORS COMMENTS 
api.put("/evaluation/:name?", async (req, res) => {
  const client = getClient();
  const comments = req.body.commentData

  client.connect(async function () {
    const db = client.db("cyf_feedback");
    const collection = db.collection("student_profile");
    const result = await collection.findOneAndUpdate(
      { name: req.params.name },
      {
        $addToSet: {
          leadMentorcomments: [
            {
              ...comments,
              date: new Date(),
              leadMentorName: 'Neil'
            }
          ]
        }
      }
    )
    client.close();
    return res.send(result);
  });
});

//updating comments
api.put("/updateComments", async (req, res) => {
  const client = getClient();
  client.connect(async err => {
    if (err) {
      return next(err);
    }
    let {
      name,
      floatingmentorcomment,
      floatingMentorName,
      selectedmodule
    } = req.body;

    const db = client.db("cyf_feedback");
    const collection = db.collection("student_profile");
    const options = {
      returnOriginal: false
    };


    const nameStudent = await collection.find({ name: name }).toArray()
    nameStudent[0].floatingMentorcomments.push({
      id: nameStudent[0].floatingMentorcomments.length + 1,
      comment: floatingmentorcomment,
      floatingMentorName: floatingMentorName,
      date: new Date(),
      module: selectedmodule
    });

    collection.findOneAndUpdate(
      { name: name },
      {
        $set: nameStudent[0]
      },
      options,
      function (error, result) {
        if (result.value) {
          res.send(error || result.value);
        } else {
          console.log("no result");
          res.sendStatus(404);
        }
      }
    );

    client.close();
  });
});

// GET SKILLS
api.get("/skills/tech", (req, res, next) => {
  const client = getClient();
  client.connect(function () {
    const db = client.db("cyf_feedback");
    const collection = db.collection("technical_skills");
    collection.find({}).toArray(function (error, result) {
      console.log(result);
      res.send(error || result);
      client.close();
    });
  });
});


// GET SOFT SKILLS
api.get("/skills/soft", (req, res) => {
  const client = getClient();
  client.connect(function () {
    const db = client.db("cyf_feedback");
    const collection = db.collection("soft_skills");
    collection.find({}).toArray(function (error, result) {
      res.send(error || result);
      client.close();
    });
  });
});




export default api;
