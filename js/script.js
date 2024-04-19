const overview = document.querySelector(".overview");

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
}; 

