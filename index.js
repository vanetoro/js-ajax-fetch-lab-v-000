const token  = ''
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
  let title =  document.getElementById('title').value
  let body =  document.getElementById('body').value
  const postData = { title: title, body: body }


  fetch(`${issuesRepo}`, {
    method: 'post',
    body: JSON.stringify(postData),
    headers: {
      Authorization: `token ${getToken()}`,
    }
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    getIssues()
  })
  
}

function showResults(json) {
  $("#results").append(`<a href="${json.html_url}" target="_blank" > Show Repo </a>` )
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: 'post',
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

  fetch(`https://api.github.com/repos/vanetoro/${repo}/forks`)

}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass

  return token
}

