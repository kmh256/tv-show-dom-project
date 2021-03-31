//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(allEpisodes) {
  const rootElem = document.getElementById("root");
  const navForm = document.querySelector("form");
  const cardDeck = document.createElement("div");
  cardDeck.className = "card-deck justify-content-around";

  // All episodes selector
  const selectTag = document.createElement("select");
  const selectAllEpisodes = document.createElement("option");
  selectAllEpisodes.innerText = "All Episodes";
  selectAllEpisodes.value = "0";
  selectTag.appendChild(selectAllEpisodes);

  // Search bar
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase();
    const episodeCards = document.querySelectorAll(".episode-card");
    let countEpisodes = 0;
    // Checks if each card contains the search string and if not sets display to none
    for (let i = 0; i < episodeCards.length; i++) {
      if (!episodeCards[i].innerHTML.toLowerCase().includes(searchString)) {
        episodeCards[i].style.display = "none";
      } else {
        episodeCards[i].style.display = "block";
        countEpisodes ++;
      }
    }
    episodeCounter.textContent = `Displaying ${countEpisodes}/73 episode(s)`;
  });

  allEpisodes.map((episode) => {

    let optionTag = document.createElement("option");
    optionTag.value = episode.id;
    let episodeSeason = episode.season;
    let episodeNumber = episode.number;
    // Checks if episode season and number are less than or equal to 9 and applies 0 
    if (episode.season <= 9) {
      episodeSeason = `0${episode.season}`;
    }
    if (episode.number <= 9) {
      episodeNumber = `0${episode.number}`;
    }
    optionTag.innerText = `S${episodeSeason}E${episodeNumber}: ${episode.name}`;
    selectTag.appendChild(optionTag);
    selectTag.className = "form-control col-4";
    selectTag.addEventListener("click", episodeSelection);
    navForm.appendChild(selectTag);
    selectAllEpisodes.addEventListener("click", episodeSelection);

    // Hides all episode cards and displays only the episode selected
    function episodeSelection() {
      episodeCard.style.display = "none";
      if (optionTag.value === selectTag.value) {
        episodeCard.style.display = "block";
        episodeCounter.textContent = `Displaying 1/73 episode(s)`;
      }
      // Displays all cards when "All Episodes" selected
      if (selectTag.value === "0") {
        episodeCard.style.display = "block";
        episodeCounter.textContent = `Displaying ${allEpisodes.length}/73 episode(s)`;
      }
    }

    // Creates card for each episode with medium image at the top
    const episodeCard = document.createElement("div");
    episodeCard.className = "episode-card col-sm-3 text-#f7f7f7 bg-dark m-2";
    const episodeImage = document.createElement("img");
    episodeImage.className = "card-img w-75 mx-auto d-block mt-4";
    episodeImage.src = episode.image.medium;
    episodeCard.appendChild(episodeImage);
    
    // Creates heading for card body - season, episode number & episode name
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const episodeTitle = document.createElement("p");
    const episodeHeader = document.createElement("h5");
    episodeHeader.className = "card-title text-center";
    episodeHeader.innerHTML = `S${episodeSeason}E${episodeNumber}: ${episode.name}`;
    episodeTitle.appendChild(episodeHeader);
    cardBody.appendChild(episodeTitle);

    // Creates paragraph for episode summary
    const episodeSummary = document.createElement("p");
    episodeSummary.className = "card-text text-justify";
    episodeSummary.innerHTML = episode.summary;
    cardBody.appendChild(episodeSummary);

    episodeCard.appendChild(cardBody);
    cardDeck.appendChild(episodeCard);
    rootElem.appendChild(cardDeck);
  })

  // Counts number of episodes
  let episodeCounter = document.createElement("h4");
  episodeCounter.textContent = `Displaying ${allEpisodes.length}/73 episode(s)`;
  episodeCounter.className = "col-4 text-center";
  navForm.appendChild(episodeCounter);
}

window.onload = setup;