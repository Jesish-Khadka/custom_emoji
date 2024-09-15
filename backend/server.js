const express = require("express"); //to build the server.
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const emojiRouter = require("./routes/emojiRoutes");
const app = express();

// Enable CORS for all origins (for development purposes)
app.use(cors()); //Allows the server to handle requests from different origins (e.g., different domains or ports).

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/emojiapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection error:", err)
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files haru in upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/emojis", emojiRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
