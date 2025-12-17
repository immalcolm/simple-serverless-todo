// api/todos/[id].js

// 1. Define the data (Note: In real serverless, this resets frequently!)
let todos = [
  { id: 1, task: "Learn Vercel", status: "In Progress" },
  { id: 2, task: "Fix CORS", status: "Done" },
  { id: 3, task: "Master Serverless", status: "Pending" },
];

export default function handler(req, res) {
  // 2. Destructure the request to get standard Node.js properties
  const {
    method,
    query: { id }, // Vercel extracts "1" from the URL /api/todos/1 into this variable
    body,
  } = req;

  // 3. Find the specific todo item
  const todoId = parseInt(id, 10);
  const index = todos.findIndex((t) => t.id === todoId);

  // 4. Validate ID format
  if (isNaN(todoId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // 5. Handle the HTTP Verbs (The "Switch" Pattern)
  switch (method) {
    case "GET":
      // Fetch one todo
      if (index === -1) return res.status(404).json({ error: "Todo not found" });
      return res.status(200).json(todos[index]);

    case "PUT":
      // Update one todo
      if (index === -1) return res.status(404).json({ error: "Todo not found" });
      
      // Merge existing data with new data from 'body'
      todos[index] = { ...todos[index], ...body };
      return res.status(200).json(todos[index]);

    case "DELETE":
      // Remove one todo
      if (index === -1) return res.status(404).json({ error: "Todo not found" });
      
      const deleted = todos.splice(index, 1)[0];
      return res.status(200).json({ message: "Deleted successfully", deleted });

    default:
      // Reject unsupported methods (like POST or PATCH if not implemented)
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}