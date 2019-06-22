const express = require('express');
const app = express();
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr'
var hex64 = require('hex64');
app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/ping", ping)
function ping(request, response) {
  response.send("pong")
}
//encrypter api//
app.get("/encrypter/:password/:text",encrypter)
function encrypter(req,res) {
  var data = req.params
  res.send(encrypt(data.text,data.password))

}
app.get("/decrypter/:password/:text",decrypter)
function decrypter(req,res) {
  var data = req.params
  res.send(decrypt(data.text,data.password))

}
//encrypter functions//
function encrypt(text,password){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  var crypted = hex64.encode(crypted)
  return crypted;
}

function decrypt(text,password){
  var text = hex64.decode(text)
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
