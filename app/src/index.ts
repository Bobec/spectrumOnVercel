import express from 'express';
const faceapi = require("face-api.js")   
const fs = require("fs")  
const path = require("path")
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3030; // default port to listen

faceapi.env.monkeyPatch({ fetch: fetch });


app.get('/api', (req, res) => {
  const randomId = `${Math.random()}`.slice(2);
  const path = `/api/item/${randomId}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:itemId', (req, res) => {
  const { itemId } = req.params;
  res.json({ itemId });
});

app.post('/api/faceApi', (req, res) => {
  res.json({"mess": "got it"})
});

app.get('/api/faceApi', async(req, res) => {
  
  const MODELS_URL = path.join(__dirname, './models');
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_URL)
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_URL)
  await faceapi.nets.faceExpressionNet.loadFromDisk(MODELS_URL)
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_URL)
  let img = '<img id="myImg" src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">'
  console.log("entered")
  res.send('<h1>SUP</h1>')
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

module.exports = app;
