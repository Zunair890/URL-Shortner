// Design a URL shortner that take avalid url and returns a shortened url.
// POST/URL - gneerate a new short url
// GET/:id- redirect to the original url
// GET/URL/analytics - get analytics or visit history of the short url


import express from "express";
import mongoose from "mongoose";
import urlRoute from "./Routes/url.js";
import connectToMongoDB from "./connect.js";
import URL from "./models/url.js";

const app = express();

// Add middleware to parse JSON requests
app.use(express.json());

// Improve database connection with error handling
try {
    await connectToMongoDB("mongodb://127.0.0.1:27017/short-url");
    console.log("Connected to MongoDB successfully");
} catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
}

// Put specific routes BEFORE the dynamic route
app.use("/url", urlRoute);

app.get("/test", (req, res) => {
    return res.end("<h1>Hello From server</h1>");
});

app.get("/test2", (req, res) => {
    return res.end("<h1>Hello From server2</h1>");
});

// Put the dynamic route LAST
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            {
                shortId
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error while redirecting:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(8001, () => {
    console.log("Server is running on port 8001");
});
