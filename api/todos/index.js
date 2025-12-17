// api/todos/index.js
import { todos } from './_data.js';

export default function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      // READ ALL: Return the full list
      res.status(200).json(todos);
      break;

    case 'POST':
      // CREATE: Add a new item
      const { task } = body;
      
      if (!task) {
        return res.status(400).json({ error: "Task is required" });
      }

      const newTodo = {
        id: Date.now(), // Generate a unique ID based on timestamp
        task: task,
        status: "Pending"
      };

      todos.push(newTodo);
      res.status(201).json(newTodo);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}