const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const htmlRouter = require("./routes/html-routes");
const apiRouter = require("./routes/api-routes");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Invoke routes
htmlRouter(app);
apiRouter(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

app.listen(PORT, () => {
    console.log(`App running at: http://localhost:${PORT}`);
});