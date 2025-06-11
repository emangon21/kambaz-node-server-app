// src/Labs/Lab5/WorkingWithArrays.js
let todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
];

export default function WorkingWithArrays(app) {
    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
            id: Date.now(),
            title: "New Task",
            completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
    });

    app.get("/lab5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id, 10));
        if (todo) todo.title = title;
        res.json(todos);
    });

    app.get("/lab5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const idx = todos.findIndex((t) => t.id === parseInt(id, 10));
        if (idx > -1) todos.splice(idx, 1);
        res.json(todos);
    });

    app.get("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id, 10));
        res.json(todo || {});
    });

    app.get("/lab5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const flag = completed === "true";
            return res.json(todos.filter((t) => t.completed === flag));
        }
        res.json(todos);
    });

    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id, 10));
        if (todo) todo.completed = completed === "true";
        res.json(todos);
    });

    app.get("/lab5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id, 10));
        if (todo) todo.description = decodeURIComponent(description);
        res.json(todos);
    });

    app.post("/lab5/todos", (req, res) => {
        const newTodo = {
            id: Date.now(),
            ...req.body,
        };
        todos.push(newTodo);
        res.json(newTodo);
    });

    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const idx = todos.findIndex((t) => t.id === parseInt(id, 10));
        if (idx === -1) {
            return res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
        }
        todos.splice(idx, 1);
        res.sendStatus(200);
    });

    app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const idx = todos.findIndex((t) => t.id === parseInt(id, 10));
        if (idx === -1) {
            return res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
        }
        todos[idx] = { ...todos[idx], ...req.body };
        res.sendStatus(200);
    });






}
