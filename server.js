import jsonServer from "json-server";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, "db.json");

const readDb = () => {
  return JSON.parse(fs.readFileSync(DB_PATH));
};

const writeDb = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
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
const router = jsonServer.router(DB_PATH);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// health check endpoint
server.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

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

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
