import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import knex from "knex";
import multer from "multer";
import fs from "fs";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "gstorevn",
    password: "gstorevn",
    database: "gstorevn",
  },
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || !email.includes("@")) {
    return res.status(400).json("not valid");
  }
  db.select("*")
    .from("login")
    .where("username", "=", email)
    .returning("*")
    .then((data) => {
      const passwordSync = bcrypt.compareSync(password, data[0].password);
      if (!passwordSync) {
        res.status(400).json("not valid!");
      } else {
        res.json(data[0]);
      }
    })
    .catch((err) => res.json(err));
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !email.includes("@")) {
    return res.status(400).json("not valid");
  }
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  db.transaction((trx) => {
    trx
      .insert({
        username: email,
        password: hash,
        islocked: false,
      })
      .into("login")
      .returning("username")
      .then((EmailLogIn) => {
        return trx("users")
          .insert({
            name: name,
            username: EmailLogIn[0],
            islocked: false,
          })
          .returning("*")
          .then((user) => res.json(user[0]))
          .catch((err) => res.status(400).json("cannot create user"));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("cannot transaction"));
});

app.get("/get-all-posts", (req, res) => {
  db.select("*")
    .from("blogs")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
});
app.get("/get-post/:id", (req, res) => {
  const params = req.params;
  db.select("*")
    .from("blogs")
    .where("id", "=", params.id)
    .then((data) => {
      if (!data) {
        return res.status(400).json("not found!");
      }
      return res.json(data[0]);
    })
    .catch((err) => res.status(400).json("err"));
});

app.get("/admin/:id", (req, res) => {
  const params = req.params;
  db.select("*")
    .from("users")
    .where("id", "=", params.id)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => res.status(400).json("err"));
});

app.get("/post/:condition", (req, res) => {
  const params = req.params;
  db("blogs")
    .orderBy("dateblog", params.condition)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("error sorting post"));
});

app.get("/post/nearest", (req, res) => {
  db("blogs")
    .orderBy("id", "desc")
    .limit(3)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("error fetching posts!"));
});

app.get("/post/news/:number", (req, res) => {
  const { number } = req.params;
  db("blogs")
    .orderBy("id", "desc")
    .limit(number)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("err"));
});

const fileStorageEngine = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../img/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/api/images", upload.array("blog-images", 3), (req, res) => {
  res.json(req.files);
});

app.put("/api/upload", (req, res) => {
  const { title, content1, image1, content2, image2, content3, image3, id } =
    req.body;
  if (!title || !id) {
    return res.status(400).json("not validation");
  }
  db("blogs")
    .where("id", "=", id)
    .update({
      title: title,
      image1: image1,
      image2: image2,
      image3: image3,
      content1: content1,
      content2: content2,
      content3: content3,
    })
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(400).json("error");
    });
});

app.get("/api/users", (req, res) => {
  db.select("*")
    .from("users")
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("error get users"));
});

app.get("/api/get-user/:email", (req, res) => {
  const { email } = req.params;
  db.select("*")
    .from("users")
    .where("username", "=", email)
    .then((data) => {
      if (!data[0]) {
        return res.status(404).json("not found user");
      }
      return res.json(data[0]);
    });
});

app.put("/api/update-user", (req, res) => {
  const { username, newPassword, name, islocked } = req.body;
  if (!username || !newPassword || !name || islocked === null) {
    return res.status(400).json("not valid!");
  }
  const saltRounds = 10;
  const hash = bcrypt.hashSync(newPassword, saltRounds);
  db.transaction((trx) => {
    trx("login")
      .where("username", "=", username)
      .update({
        password: hash,
        islocked: islocked,
      })
      .returning("*")
      .then((dataBackUp) => {
        return trx("users")
          .where("username", "=", dataBackUp[0].username)
          .update({
            username: dataBackUp[0].username,
            name: name,
            islocked: islocked,
          })
          .returning("*")
          .then((response) => res.json(response[0]))
          .catch((err) => res.status(400).json("error in transaction"));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("cannot transaction"));
});

app.delete("/api/remove-user", async (req, res) => {
  const { username } = req.body;
  try {
    const rq1 = await db("login").where("username", "=", username).del();
    const rq2 = await db("users").where("username", "=", username).del();
    if (rq1 === 1 && rq2 === 1) {
      return res.json("success");
    } else {
      throw new Error("error");
    }
  } catch (err) {
    res.status(400).json("error");
  }
});

// temporary for searching existing title
app.get("/api/:name", (req, res) => {
  const { name } = req.params;
  db.select('*').from('blogs').whereRaw("LOWER(title) LIKE '%' || LOWER(?) || '%' ", name) 
  .then(response =>{
    res.json(response);
  }).catch(err => res.status(400).json('error'));
});

app.listen(3001);
