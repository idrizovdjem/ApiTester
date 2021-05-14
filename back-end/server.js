require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sendRequest } = require('./requestsService.js');

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.post('/', async (request, response) => {
	const { requestObject } = request.body;
	const awayResponse = await sendRequest(requestObject);
	response.json({ awayResponse });
});

app.get('/status', (request, response) => {
	// action used for waking up the server
	// (this is because the server will be hosted as free tier project on Glitch)
	response.json({ status: 'ok' });
});

app.listen(port, () => {
	console.log(`listening on port: ${port}`);
});