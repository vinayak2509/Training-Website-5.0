const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/user");
const aboutRoutes = require("./routes/about");
const signUpRoutes = require("./routes/signUp");
const notificationsRoutes = require("./routes/notifications");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://admin:12345@cluster0.lut4d.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/api", contactRoutes);
app.use("/api", userRoutes);
app.use("/api", aboutRoutes);
app.use("/api", signUpRoutes);
app.use("/api", notificationsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
