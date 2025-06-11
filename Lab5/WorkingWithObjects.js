// kambaz-node-server-app/Lab5/WorkingWithObjects.js

// existing in-memory objects
const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

const moduleObj = {
    id: "M1",
    name: "Intro to Express",
    description: "Learn the basics of Express.js",
    course: "RS101",
};

export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);       // use .json() to send proper JSON
    });

    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });

    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;  // mutate in‐memory object
        res.json(assignment);          // return updated object
    });

    app.get("/lab5/module", (req, res) => {
        res.json(moduleObj);
    });

    app.get("/lab5/module/name", (req, res) => {
        res.json(moduleObj.name);
    });

    app.get("/lab5/module/name/:newName", (req, res) => {
        moduleObj.name = req.params.newName;
        res.json(moduleObj);
    });

    app.get("/lab5/module/description/:newDesc", (req, res) => {
        moduleObj.description = req.params.newDesc;
        res.json(moduleObj);
    });

    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        assignment.score = parseInt(req.params.newScore, 10);
        res.json(assignment);
    });

    app.get("/lab5/assignment/completed/:flag", (req, res) => {
        assignment.completed = req.params.flag === "true";
        res.json(assignment);
    });
}
