import jsonServer from "json-server";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, "db.json");

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

const getTodosSummary = (req, res) => {
  const { todos } = readDb();
  const summary = {
    total: todos.length,
    done: todos?.filter((todo) => todo.done).length,
  };
  return res.json(summary);
};

const createTodo = (req, res) => {
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
};

const delayMiddleware = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  next();
};

const server = jsonServer.create();

server.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

const router = jsonServer.router(DB_PATH);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.get("/health", (req, res) => {
  // health check for Heroku
  res.json({
    status: "UP",
    environment: process.env.NODE_ENV || "development",
  });
});

server.use((req, res, next) => {
  if (
    req.method === "GET" &&
    req.path === "/todos" &&
    req.query.summary === "true"
  ) {
    // get summary for todos that are used by Pagination and Status components
    return getTodosSummary(req, res);
  }

  if (req.method === "POST" && req.path === "/todos") {
    // create a new todo, but add it in the beginning of the array
    return createTodo(req, res);
  }

  next();
});

server.use(delayMiddleware);
server.use(router);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`Database path: ${DB_PATH}`);
});
