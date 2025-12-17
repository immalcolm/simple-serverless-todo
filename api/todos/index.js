// api/todos/index.js

// Shared data simulation (Note: State resets in serverless!)
// In a real app, this array should be replaced by a database call.
export let todos = [
  { id: 1, task: "Learn Vercel Functions", status: "In Progress" },
  { id: 2, task: "Build Frontend", status: "Done" }
];

export default function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      // Return the full list
      return res.status(200).json(todos);

    case 'POST':
      // Create a new item
      const newTodo = {
        id: Date.now(), // Generate a simple unique ID
        task: body.task || "New Task",
        status: "Pending"
      };
      todos.push(newTodo);
      return res.status(201).json(newTodo);

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}