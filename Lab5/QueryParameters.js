// kambaz-node-server-app/Lab5/QueryParameters.js
export default function QueryParameters(app) {
    app.get("/lab5/calculator", (req, res) => {
        const { operation, a, b } = req.query;
        const x = parseInt(a, 10);
        const y = parseInt(b, 10);
        let result;

        switch (operation) {
            case "add":
                result = x + y;
                break;
            case "subtract":
                result = x - y;
                break;
            case "multiply":
                result = x * y;
                break;
            case "divide":
                result = x / y;
                break;
            default:
                return res.send("Invalid operation");
        }

        res.send(result.toString());
    });
}
