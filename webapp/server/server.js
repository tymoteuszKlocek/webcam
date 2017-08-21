const http = require('http');
const fs = require('fs');
const path = require("path");
const checkMimeType  = true;

const hostname = '127.0.0.1';
const port = 8080;

console.log("Starting web server at " + hostname + ":" + port);

// fs.readFile('./index.html', function (err, html) {
//     if (err) {
//         throw err;
//     }
//     const server = http.createServer((req, res) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html');
//         res.write(html);
//         res.end();
//     });

//     server.listen(port, hostname, () => {
//         console.log(`Server running at http://${hostname}:${port}/`);
//     });
// })

http.createServer((req, res) => {

    let filename = req.url || 'index.html';
    let ext = path.extname(filename);
    let localPath = __dirname;
    let validExtensions = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css'
    };
    let validMimeType = true;
    let mimeType = validExtensions[ext]
    if (checkMimeType) {
        console.log('ok')
        validMimeType = validExtensions[ext] != undefined;
    }

    if (validMimeType) {
        localPath += filename;
        fs.exists(localPath, function (exists) {
            if (exists) {
                console.log("Serving file: " + localPath);
                getFile(localPath, res, mimeType);
            } else {
                console.log("File not found: " + localPath);
                res.writeHead(404);
                res.end();
            }
        });
    } else {
        console.log("Invalid file extension detected: " + ext + " (" + filename + ")")
    }

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.write(html);
    // res.end();
}).listen(port, hostname);

function getFile(localPath, res, mimeType) {
    fs.readFile(localPath, function(err, contents) {
        if(!err) {
			res.setHeader("Content-Length", contents.length);
			if (mimeType != undefined) {
				res.setHeader("Content-Type", mimeType);
			}
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
    });
}
