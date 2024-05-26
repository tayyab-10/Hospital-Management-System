const express = require("express");
const db = require("./db/db");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({
  path: "./.env", //give .env file location
});

const app = express();
app.use(cors());

// db.getData().then((res) => {
//   console.log(res);
// });
// Define a route to handle requests for data

app.use("/api/auth", require("./routes/auth/auth"), (req, res) => {
  res.send("Hello");
});
app.use("/api/mainadmin", require("./routes/admin/admin"), (req, res) => {
  res.send("MainAdmin");
});
app.use("/api/doctor", require("./routes/doctor/doctor"), (req, res) => {
  res.send("Doctor");
});

app.get("/api/data", async (req, res) => {
  try {
    // Fetch data from the database
    const data = await db.getData();
    // Send the fetched data as a JSON response
    res.json(data);
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
