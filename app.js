const express = require('express');
const path = require('path');

const port = process.env.PORT || 80;

const app = express();

app.use('/static', express.static('static'));

app.get('/', (req, res)=>{

    res.status(200).sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/about', (req, res)=>{

    res.status(200).sendFile(path.join(__dirname, 'views/about.html'));
});

app.listen(port, ()=>{

    console.log(`Website is running at port ${port}`);
});

