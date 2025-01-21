// Design a URL shortner that take avalid url and returns a shortened url.
// POST/URL - gneerate a new short url
// GET/:id- redirect to the original url
// GET/URL/analytics - get analytics or visit history of the short url

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import urlRoute from "./Routes/url.js";
import connectToMongoDB from "./connect.js";
import URL from "./models/url.js";

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Connect to MongoDB
try {
    await connectToMongoDB("mongodb://127.0.0.1:27017/short-url");
    console.log("Connected to MongoDB successfully");
} catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
}

// Use the routes for URL operations
app.use("/url", urlRoute);

// Redirect short URL to the original URL
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    console.log("Attempting to redirect:", shortId);

    try {
        const entry = await URL.findOne({ shortId }); // First find without updating
        console.log("Found entry:", entry); // Debug log

        if (!entry) {
            console.log("No URL found for shortId:", shortId);
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Update visit history after finding
        await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );

        console.log("Redirecting to:", entry.redirectUrl);
        return res.redirect(entry.redirectUrl); // Make sure field name matches your model
    } catch (error) {
        console.error("Error during redirection:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
