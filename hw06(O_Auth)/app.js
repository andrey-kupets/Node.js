const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '../.env') });
// dotenv.config(); тогда нужно прописать правильно путь в терминале

const { MONGO_URL, PORT } = require('./config/config');
const apiRouter = require('./router/api.router'); // крашится апка, если апи.роутер деструктуризировать с ./router,

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`port ${PORT} is listening`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
