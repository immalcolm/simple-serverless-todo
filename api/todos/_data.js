// api/todos/_data.js

// This array acts as a temporary in-memory database.
// Note: This data resets when the serverless function "cold starts" (goes to sleep).
export const todos = [
  { id: 1, task: "Learn Vercel Functions", status: "In Progress" },
  { id: 2, task: "Build Frontend", status: "Done" },
  { id: 3, task: "Master Serverless", status: "Pending" }
];