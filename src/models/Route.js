const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
    {
        routeNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        routeName: {
            type: String,
            required: true,
            trim: true
        },

        source: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: String,
            required: true,
            trim: true
        },

        transportMode: {
            type: String,
            enum: ["bus", "metro"],
            default: "bus"
        },

        capacity: {
            type: Number,
            required: true,
            min: 0
        },

        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Route", routeSchema);