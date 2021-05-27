"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faceapi = require("face-api.js");
const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
const app = express_1.default();
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
    res.json({ "mess": "got it" });
});
app.get('/api/faceApi', (req, res) => {
    let img = '<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">';
    console.log("entered");
    res.send('<h1>SUP</h1>');
});
// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map