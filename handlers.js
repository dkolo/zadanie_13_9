var fs = require('fs');
var formidable = require('formidable');
var image;

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, files.upload.name);
        image = files.upload.name;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

exports.show = function(request, response) {
    fs.readFile(image, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write(html);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

/*var formidable = require('formidable');
var image;


exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
    	// Tu zmienić kod
        fs.renameSync(files.upload.path, files.upload.name);
        image = files.upload.name;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}


exports.show = function(request, response) {
    fs.readFile(image, "binary", function(error, file) {
    	console.log(image);
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write(html);
        response.end();
    });
}

//Wysyłanie pliku style.css do klienta, same style dodam już po właściwym 
exports.styles = function(request, response) {
    fs.readFile('templates/style.css', function(err, css) {
        response.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
        response.write(css);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}
*/