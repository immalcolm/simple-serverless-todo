// api/todos/[id].js
import { todos } from './_data.js';

export default function handler(req, res) {
  const {
    method,
    query: { id }, // Vercel extracts the ID from the URL
    body,
  } = req;

  // Convert ID to number (URLs are strings)
  const todoId = parseInt(id, 10);
  const index = todos.findIndex((t) => t.id === todoId);

  // Validation: Check if ID is valid number
  if (isNaN(todoId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // Early Exit: If item doesn't exist (and we aren't creating)
  if (index === -1) {
    return res.status(404).json({ error: `Todo with ID ${id} not found` });
  }

  switch (method) {
    case "GET":
      // READ ONE
      return res.status(200).json(todos[index]);

    case "PUT":
      // UPDATE
      // Merge existing data with new body data (partial update)
      todos[index] = { ...todos[index], ...body };
      return res.status(200).json(todos[index]);

    case "DELETE":
      // DELETE
      const deletedItem = todos.splice(index, 1)[0];
      return res.status(200).json({ message: "Deleted successfully", deletedItem });

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}