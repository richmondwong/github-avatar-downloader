var request = require('request');
var token = require('./secrets')

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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

  for (var i in result){
    // console.log(i)
    console.log("Result:", result[i]["avatar_url"]);
  }

});



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
