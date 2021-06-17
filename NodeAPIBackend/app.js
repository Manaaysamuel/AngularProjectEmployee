const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = new express();
const port = process.env.PORT || 3000;

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// CORS settings
const origin = "http://localhost:4200";
// CORS
const corsOpt = {
  origin: "http://localhost:4200",
  optionSuccessStatus: 200,
};
app.use(cors(corsOpt));
// Routes
app.use("/employee", require("./routes/employeeRoute"));
app.use("/skill", require("./routes/skillRoute"));

app.listen(port, () => {
  console.log(`Server is connected at http://localhost:${port}`);
});
