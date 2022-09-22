const express = require("express");
const post = require("./routes/post");
const app = express();
app.use(express.json());

app.use("/post", post);
app.get("/", (req, res) => {
  res.send("its me Abhiujjwal Pradhan");
});

app.listen(3300, () => {
  console.log("listening on 3300");
});
//docker run -it -p 3300:3300 auth
//docker run -d -p 3300:3300 auth
//docker build -t auth .
