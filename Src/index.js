const express = require("express");
const route = require("./Routes/route");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();
app.use(express.json());
const url = process.env.MONGODB_URL;

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use("/", route);

app.listen(5050, () => {
    console.log("Express app running on port 5050 ");
});
