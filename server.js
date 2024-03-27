const express = require('express');
const path = require('path');

let app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')))

app.get('/pageOne', (req, res) => {
    res.sendFile(__dirname + '/public/pageOne.html')
});

app.get('/webgl', (req, res) => {
    res.sendFile(__dirname + '/public/webgl.html')
});

app.get('/pokemon', (req, res) => {
    res.sendFile(__dirname + '/public/pokemon.html')
});

app.get('/links', (req, res) => {
    res.sendFile(__dirname + '/public/links.html')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})