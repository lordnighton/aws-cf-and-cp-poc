var AWS = require('aws-sdk'),
    fs = require('fs');

//AWS.config.loadFromPath('./aws-config.json');

var dropbox = new AWS.S3({params: {Bucket: 'my-bucket-lordnighton'}});

function uploadToS3(file, destFileName, callback) {
    dropbox.upload({
            ACL: 'public-read',
            Body: fs.createReadStream(file.path), 
            Key: destFileName.toString(),
            ContentType: 'application/octet-stream'
        })
        .send(callback);
}

var express = require('express'),
    app = express(),
    multer = require('multer');

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.post('/upload', multer({limits: {fileSize:10*1024*1024}}), function (req, res) {
    if (!req.files || !req.files.file1) {
        return res.status(403).send('expect 1 file upload named file1').end();
    }
    var file1 = req.files.file1;

    if (!/^image\/(jpe?g|png|gif)$/i.test(file1.mimetype)) {
        return res.status(403).send('expect image file').end();
    }

    var pid = '10000' + parseInt(Math.random() * 10000000);

    uploadToS3(file1, pid, function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('failed to upload to s3').end();
        }
        res.status(200)
            .send('File uploaded to S3: ' 
                    + data.Location.replace(/</g, '&lt;') 
                    + '<br/><img src="' + data.Location.replace(/"/g, '&quot;') + '"/>')
            .end();
    })
})

app.listen(9001, function () {
    console.log('Example Server listening at port ' + 9001);
});