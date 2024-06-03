import mongoose from "mongoose";

const trendsSchema = mongoose.Schema({
  trend1: String,
  trend2: String,
  trend3: String,
  trend4: String,
  trend5: String,
  end_date: String,
  ipAddress: String,
});

const Trends = mongoose.model("Trends", trendsSchema);

export default Trends;
