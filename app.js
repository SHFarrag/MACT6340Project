import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import * as utils from './utils/utils.js';
import * as db from './utils/database.js';

dotenv.config();

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Connect to the database on application startup
app.use(async (req, res, next) => {
    try {
        await db.connect();
        console.log("Connected to database");
        next();
    } catch (err) {
        console.error("Database connection error:", err);
        res.status(500).send('Database connection error');
    }
});

// Routes

// Home page route
app.get("/", async (req, res, next) => {
    try {
        // Query the database for project records
        const projects = await db.getAllProjects();
        res.render("index.ejs", { projectArray: projects });
    } catch (err) {
        next(err);
    }
});

// Route to get project details by ID
app.get('/project/:id', async (req, res) => {
    const projectId = req.params.id;
    try {
        const project = await db.getProjectById(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for sending email
app.post("/mail", async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const response = await utils.sendMail({ name, email, subject, message });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    let msg = err.message || "Internal server error";
    res.render("error.ejs", { msg });
});

// Start server
app.listen(port, () => {
    console.log(`App running @ http://localhost:${port}`);
});
