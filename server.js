const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/messages/unread', (req, res) => {
    const messages = Array.from({ length: 5 }).map(() => ({
        id: uuidv4(),
        from: faker.internet.email(),
        subject: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        received: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 100000)
    }));

    res.json({
        status: 'ok',
        timestamp: Math.floor(Date.now() / 1000),
        messages
    });
});

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:$`{PORT}`");
});

