const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector("input.filter-repos");

const username = "shareestark";

const getGitHubData = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayGitHubData(data);
}

getGitHubData();

const displayGitHubData = function (data) {
    const newDiv = document.createElement("div");
    newDiv.className = "user-info";
    newDiv.innerHTML = `<figure>
    <img alt="user avatar" src="${data.avatar_url}" />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(newDiv);
  getRepos();
}; 

// Fetch Repo Data 

const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

const displayRepos = function (repos) {

    filterInput.classList.remove("hide");
    
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
  };


// Display info on each Repo

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    console.log(repoInfo);

     // Fetch language data
     const fetchLanguages = await fetch(repoInfo.languages_url);
     const languageData = await fetchLanguages.json();
 
     // Add languages to an array
     const languages = [];
     for (const language in languageData) {
         languages.push(language);
     }
 
     displaySpecificRepoInfo(repoInfo, languages);
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
    backButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allRepos.classList.add("hide");
    const newDiv2 = document.createElement("div");
    newDiv2.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoData.append(newDiv2);
};
  
backButton.addEventListener("click", function () {
    allRepos.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
})

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowerCase = searchText.toLowerCase();
    repos.forEach(repo => {
        const repoText = repo.innerText.toLowerCase();

        if (repoText.includes(searchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    })
})


