const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const routeRoutes = require("./routes/routeRoutes");
const stopRoutes = require("./routes/stopRoutes")

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/routes", routeRoutes);
app.use("/api/stops", stopRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Public Transport Demand Dashboard API",
        status: "running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});