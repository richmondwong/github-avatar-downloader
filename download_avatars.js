var request = require('request');
var fs = require('fs');
var token = require('./secrets')

function getRepoContributors(repoOwner, repoName, cb){

  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };

  // request.setEncoding('utf8')

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
  //console.log('Response Status Code:', response.statusCode)
})
.pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
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

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

// Original Code before Step 7

// function getRepoContributors(repoOwner, repoName, cb){

//   var options = {
//     url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
//     headers: {
//       'User-Agent': 'request',
//       'Authorization': token
//     }
//   };

//   request(options, function (err, res, body) {
//     cb(err, body);
//   })
// }

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });
