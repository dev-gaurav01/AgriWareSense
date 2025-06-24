const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { MongoClient } = require('mongodb');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const uri = 'mongodb://localhost:';
const dbName = 'warehouse_monitoring';
const collectionName = 'all_sensor_data';

const weatherApiKey = ''; // Replace with your WeatherAPI key
const city = ''; // WeatherAPI doesn't need a country code

app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', async (message) => {
        console.log(`Received: ${message}`);
        try {
            const data = JSON.parse(message);
            const timestamp = new Date();

            const client = new MongoClient(uri); // Removed deprecated options
            await client.connect();
            const database = client.db(dbName);
            const collection = database.collection(collectionName);

            await collection.insertOne({ ...data, timestamp });
            console.log('Data saved to MongoDB');

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ ...data, timestamp }));
                }
            });

            await client.close();
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

// New endpoint to fetch weather data using WeatherAPI
app.get('/weather', async (req, res) => {
    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`;
        const response = await axios.get(url);
        const weatherData = {
            temp: response.data.current.temp_c, // Temperature in Celsius
            humidity: response.data.current.humidity, // Humidity in percentage
            wind: response.data.current.wind_kph, // Wind speed in km/h
            description: response.data.current.condition.text, // Weather condition description
            icon: response.data.current.condition.icon, // Weather icon URL
        };
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

const port = 4000;
const localIP = '';
server.listen(port, localIP, () => {
    console.log(`Server running at http://${localIP}:${port}`);
});