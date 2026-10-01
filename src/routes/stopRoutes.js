const express = require("express");
const Stop = require("../models/stops");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const stops = await Stop.find();

        res.status(200).json({
            success: true,
            count: stops.length,
            data: stops
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch stops",
            error: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const stop = await Stop.create(req.body);

        res.status(201).json({
            success: true,
            message: "Stop created successfully",
            data: stop
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create stop",
            error: error.message
        });
    }
});

module.exports = router;