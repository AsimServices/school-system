const express = require("express");
const path = require("path");
const app = express();

// ====== Basic Setup ======
app.set("view engine", "ejs");
app.set("views", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ====== ROUTES ======

// Home / Main Page
app.get("/", (req, res) => {
    res.render("main-page");
});

// Dashboard
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

// Classes
app.get("/classes", (req, res) => {
    res.render("classes");
});

// Attendance Dashboard
app.get("/attendance", (req, res) => {
    const totalStudents = 50;
    const presentToday = Math.floor(Math.random() * totalStudents);
    const absentToday = totalStudents - presentToday;

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const present = days.map(() => Math.floor(Math.random() * totalStudents));
    const absent = present.map(p => totalStudents - p);

    const data = {
        totalStudents,
        presentToday,
        absentToday,
        days,
        present,
        absent
    };

    res.render("attendance", { data });
});

// Exams
app.get("/exams", (req, res) => {
    res.render("exams");
});

// Events
app.get("/events", (req, res) => {
    res.render("events");
});

// Notifications
app.get("/notifications", (req, res) => {
    res.render("notifications");
});

// Logout
app.get("/logout", (req, res) => {
    res.render("logout");
});

// ====== Auth Routes ======

// Login Page
app.get("/login", (req, res) => {
    res.render("login", { errors: {} });
});

// Register Page
app.get("/register", (req, res) => {
    res.render("register", { errors: {} });
});

// Handle Login Form Submission
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    let errors = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
        return res.render("login", { errors });
    }

    res.redirect("/dashboard");
});

// Handle Register Form Submission
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    let errors = {};

    if (!username) errors.username = "Username is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
        return res.render("register", { errors });
    }

    res.redirect("/login");
});

// ====== ERROR HANDLER (404 Not Found) ======
// This MUST be the last middleware/route handler defined.
app.use((req, res) => {
    // Set the status code to 404 and render the EJS template
    res.status(404).render("404");
});

// ====== START SERVER (Railway Compatible) ======
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});