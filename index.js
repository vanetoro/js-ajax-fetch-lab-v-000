
const issuesRepo = 'https://api.github.com/repos/vanetoro/javascript-fetch-lab/issues'

function getIssues() {
  fetch(`${issuesRepo}`)
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    showIssues(data)
  })

}

function showIssues(json) {
  issueList = `<ul> ${json.map(j => '<li>' + j.user.login + '-' + j.body + '</li>'  ).join('')}</ul>`
  $("#issues").html(`${issueList}`)
}

function createIssue() {
  let title =  $("#title").val()
  let body = $("#body").val()
  const postData = { title: title, body: body }


  fetch(`${issuesRepo}`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      Authorization: `token ${getToken()}`,
    }
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
  })
  getIssues()
}

function showResults(json) {
  $("#results").append(`<a href="${json.html_url}" target="_blank" > Show Repo </a>` )
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
      let jData = JSON.stringify(data)
      showResults(data)
  })
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass

  return token
}

// const token = 'YOUR_TOKEN_HERE';
// const postData = {
//   body: 'Great stuff'
// };
// //
// fetch('https://api.github.com/repos/:your_ghname/:your_repo/commits/:sha/comments', {
//   method: 'POST',
//   body: JSON.stringify(postData),
//   headers: {
//     Authorization: `token ${token}`
//   }
// }).then(res => console.log(res));
