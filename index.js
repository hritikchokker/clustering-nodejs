process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');
const express = require('express');
const crypto = require('crypto');
const app = express();

if (cluster.isMaster) {
    // index.js will execute again
    // in child mode
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
} else {
    // this will run every time a new cluster(child) is created
    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('hello world');
        })
        // blockLoop(5000);
    })

    app.listen(3000);
}

// function blockLoop(duration) {
//     const start = Date.now();
//     while (Date.now() - start < duration) { }
// }