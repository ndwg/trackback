import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

const DEEZER_URL = 'https://api.deezer.com/search/playlist';

app.get('/api/search', async (req, res) => {
    try {
        const { q } = req.query;
        const response = await fetch(`${DEEZER_URL}?q=${q}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));