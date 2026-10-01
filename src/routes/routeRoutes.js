const express = require("express");
const Route = require("../models/Route");

const router = express.Router();

// GET all routes
router.get("/", async (req, res) => {
    try {
        const routes = await Route.find();

        res.status(200).json({
            success: true,
            count: routes.length,
            data: routes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch routes",
            error: error.message
        });
    }
});

// POST a new route
router.post("/", async (req, res) => {
    try {
        const route = await Route.create(req.body);

        res.status(201).json({
            success: true,
            message: "Route created successfully",
            data: route
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create route",
            error: error.message
        });
    }
});

module.exports = router;