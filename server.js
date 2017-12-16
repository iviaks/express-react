const express = require("express");
let app = express();

var production = process.env.NODE_ENV === "production";

app.use(express.static("public", { maxAge: 86400000 }));

app.use(function(req, res, next) {
  require("./dist/server")(req, res, next);
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log("listening on", PORT);
});
