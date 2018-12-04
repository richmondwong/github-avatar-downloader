// Import Request and FS modules
var request = require('request');
var fs = require('fs');

//Import User Token
var token = require('./secrets');

// Take user input from the Terminal for Repo Owner and Repo Name values to pass to getRepoContributors()
var userInputFromTerminal = process.argv.slice(2);
var firstUserInput = userInputFromTerminal[0];
var secondUserInput = userInputFromTerminal[1];

// Throw error if user does not provide one or both of Repo Owner and Repo Name values
if (firstUserInput === undefined || secondUserInput === undefined){
  throw new Error("You must input Repository Owner and Repository Name!");
  }

//Takes values for Repo Owner and Repo Name, and provides filepath for Request module to return JSON containing user details. JSON parsed into JS Object and fed to cb callback.
function getRepoContributors(repoOwner, repoName, cb){

  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  }

  request(options, function (err, res, body) {
    var parsedObject = JSON.parse(body);
    cb(err, parsedObject);
  })
}

// Download images to provided file path from provided Repo Name and Repo Owner values
function downloadImageByURL (url, filePath) {
  request.get(url)
  .on('error', function (err) {throw err;})
  .on('response', function (response) {
    console.log('Response Status Code:', response.statusCode);
  })
  .pipe(fs.createWriteStream(filePath));
}

// Prints file paths of Github user avatars of Repo Owner and Repo Name provided by user.
getRepoContributors(firstUserInput, secondUserInput, function(err, result) {
  console.log("Errors:", err);
  for (var i in result){
    var githubUserFilePath = result[i]["avatar_url"];
    console.log("GitHub User Avatar File Paths: ", githubUserFilePath);
    downloadImageByURL(githubUserFilePath, './avatars/' + [i] + ".jpg");
  }
})


