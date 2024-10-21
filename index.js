const express = require("express");
const path = require('path')
const app = express();
const PORT = 4000;
const { connectToMongoDb } = require("./config/connectDB");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const staticRouter = require('./routes/staticRouter')


connectToMongoDb("mongodb://127.0.0.1:27017/shortUrlProject").then(() =>
  console.log("Database Connect Successfully")
);

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// set the view engine to ejs
app.set('view engine', 'ejs');

app.set('views', path.resolve("./views"))



app.use("/url", urlRoute);
app.use("/", staticRouter)

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp: Date.now(),
        }
      },
    }
  );
  res.redirect(entry.redirectURl)
});

app.listen(PORT, () =>
  console.log(`Server is runnig at http://localhost:${PORT}`)
);
