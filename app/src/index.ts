import express from 'express';

const app = express();
const port = process.env.PORT || 3030; // default port to listen

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

// app.post('/faceApi', (req, res) => {
//   res.json({"mess": "got it"})
// });

// app.get('/faceApi', (req, res) => {
//   let img = '<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">'
//   console.log("entered")
//   res.send('<h1>SUP</h1>')
// });

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

module.exports = app;