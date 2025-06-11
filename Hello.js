// Hello.js
export default function Hello(app) {
    app.get('/hello', (req, res) => {
        res.send('Hello from Nodemon!');
    });

    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!');
    });
}
