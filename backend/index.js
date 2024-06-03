import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Trends from "./models/trends.js";
import { getData } from "./script/getData.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/getTrends", async (req, res) => {
  try {
    console.log("starting the script")
    const {trendingTopics, publicIP} = await getData();
    console.log(trendingTopics, publicIP);
    const date = new Date();
    const trends = new Trends({
      trend1: trendingTopics[0],
      trend2: trendingTopics[1],
      trend3: trendingTopics[2],
      trend4: trendingTopics[3],
      trend5: trendingTopics[4],
      end_date: date.toLocaleString(),
      ipAddress: publicIP,
    });
    await trends.save();
    res.send(trends);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getLastTrend", async (req, res) => {
  try {
    // Find the last trend stored in the database
    const lastTrend = await Trends.findOne().sort({ _id: -1 });

    if (!lastTrend) {
      return res.status(404).json({ message: "No trends found in the database" });
    }

    // Send the last trend to the frontend
    res.json(lastTrend);
  } catch (error) {
    console.error("Error fetching last trend:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/", async (req, res) => {
  res.send("Working");
});

app.listen(process.env.PORT || 8080, () => {
  async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  }

  connectToDatabase();
  console.log("Server has started");
});

export default app;