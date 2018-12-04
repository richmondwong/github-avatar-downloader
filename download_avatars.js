var request = require('request');
var fs = require('fs');
var token = require('./secrets');
var userInputFromTerminal = process.argv.slice(2);
var firstUserInput = userInputFromTerminal[0];
var secondUserInput = userInputFromTerminal[1];

if (firstUserInput === undefined || secondUserInput === undefined){
  throw new Error("You must input Repository Owner and Repository Name!")
  }

function getRepoContributors(repoOwner, repoName, cb){

  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };

  request(options, function (err, res, body) {
    var parsedObject = JSON.parse(body)
    // console.log(parsedObject)
    cb(err, parsedObject);
  })
}

function downloadImageByURL (url, filePath) {
request.get(url)
.on('error', function (err) {throw err;})
.on('response', function (response) {
  // console.log('Response Status Code:', response.statusCode)
})
.pipe(fs.createWriteStream(filePath));
}

getRepoContributors(firstUserInput, secondUserInput, function(err, result) {
  console.log("Errors:", err);

  for (var i in result){
    // console.log(i)
    console.log("Result:", result[i]["avatar_url"]);
    var fileNames = result[i]["avatar_url"]
    console.log("FileNames: ", fileNames)
    // downloadImageByURL(result[i]["avatar_url"], filePath)
    downloadImageByURL(fileNames, './avatars/' + [i] + ".jpg")
  }
});


