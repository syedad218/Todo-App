import jsonServer from "json-server";
import serverless from "serverless-http";
import { join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = join(fileURLToPath(new URL(".", import.meta.url)), "../..");

// Path to db.json in the Netlify deployment
const DB_PATH = join("/tmp", "db.json");

// Initialize database if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  // Copy from sample or create a new one
  const samplePath = join(__dirname, "db.json.sample");
  if (fs.existsSync(samplePath)) {
    fs.copyFileSync(samplePath, DB_PATH);
  } else {
    fs.writeFileSync(DB_PATH, JSON.stringify({ todos: [] }, null, 2));
  }
}

const readDb = () => {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH));
  } catch (error) {
    console.error("Error reading database:", error);
    return { todos: [] };
  }
};

const writeDb = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to database:", error);
  }
};

const normalizeValue = (value) => {
  return value.trim().toLowerCase();
};

// Set up the server
const app = jsonServer.create();
const router = jsonServer.router(DB_PATH);
const middlewares = jsonServer.defaults({
  logger: false, // Disable logger for serverless
});

// Enable CORS for all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );

  // Handle OPTIONS requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(jsonServer.bodyParser);
app.use(middlewares);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "UP", environment: "netlify" });
});

// Custom routes
app.get("/api/todos", (req, res, next) => {
  if (req.query.summary === "true") {
    const { todos } = readDb();
    const summary = {
      total: todos.length,
      done: todos?.filter((todo) => todo.done).length,
    };
    return res.json(summary);
  }
  next();
});

app.post("/api/todos", (req, res) => {
  const db = readDb();
  const newTodo = req.body;

  if (!newTodo) {
    return res.status(400).json({ message: "Request body is required" });
  }

  // check if the todo is already in the database
  const existingTodo = db.todos.find(
    (todo) => normalizeValue(todo.value) === normalizeValue(newTodo.value)
  );
  if (existingTodo) {
    return res
      .status(409)
      .json({ message: "A todo with this value already exists" });
  }

  db.todos.unshift(newTodo);
  router.db.setState(db);
  writeDb(db);

  return res.json(newTodo);
});

// Rewrite paths to remove /api prefix before passing to json-server router
app.use("/api", (req, res, next) => {
  req.url = req.url.replace(/^\/api/, "");
  next();
});

app.use(router);

// Export the handler function for the serverless function
export const handler = serverless(app);
