//You can edit ALL of the code here

// Selectors
const rootElem = document.getElementById("root");
const navForm = document.querySelector("form");

// Gets all show information from shows.js
const allShows = getAllShows();

// All shows selectors
const selectShowTag = document.createElement("select");
const selectAllShows = document.createElement("option");
selectAllShows.innerText = "All Shows";
selectAllShows.value = "0";
selectShowTag.appendChild(selectAllShows);
const showCards = document.querySelectorAll(".show-card");

// All episodes selectors
const selectEpisodeTag = document.createElement("select");
const selectAllEpisodes = document.createElement("option");
selectAllEpisodes.innerText = "All Episodes";
selectAllEpisodes.value = "0";
selectEpisodeTag.appendChild(selectAllEpisodes);

// Card selectors
const cardDeck = document.createElement("div");
cardDeck.className = "card-deck justify-content-around";
const episodeCards = document.querySelectorAll(".episode-card");

// Show / Episode counter
let counter = document.createElement("h5");
counter.id = "counter";

function setup() {

  let api = 'https://api.tvmaze.com/shows';
  getEpisodeFromApi(api);
  let apiLink = 1;

  allShows.forEach((show) => {

    let showOptionTag = document.createElement("option");
    showOptionTag.value = show.id;
    let showName = show.name;
    showOptionTag.innerText = `${showName}`;
    selectShowTag.appendChild(showOptionTag);
    selectShowTag.className = "form-control col-3 mt-2 mb-3 mr-2";
    selectShowTag.addEventListener("click", showSelection);
    navForm.appendChild(selectShowTag);
    selectAllShows.addEventListener("click", showSelection);

    function showSelection() {
      const allEpisodeCards = document.querySelectorAll(".episode-card")
      const allShowCards = document.querySelectorAll(".show-card");

      // Hides show cards
      for (let i = 0; i < allEpisodeCards.length; i++) {
        allEpisodeCards[i].style.display = "none";
      }
      // Displays all shows if All Shows is selected
      if (selectShowTag.value === "0") {
        for (let i = 0; i < allShowCards.length; i++) {
          allShowCards[i].style.display = "block";
        }
        selectEpisodeTag.style.display = "none";
        let showCounter = document.querySelector("#counter")
        showCounter.textContent = `Displaying 240/240 show(s)`;
      }
      // Hides all Shows if episode is selected
      if (showOptionTag.value === selectShowTag.value) {
        for (let i = 0; i < allShowCards.length; i++) {
          allShowCards[i].style.display = "none";
        }
        selectEpisodeTag.style.display = "block";
        // Removes episode cards
        for (let i = 0; i < allEpisodeCards.length; i++) {
          allEpisodeCards[i].remove();
        }
        // Gets episode data from API
        apiLink = show.id;
        api = `https://api.tvmaze.com/shows/${apiLink}/episodes`;
        getShowDataFromApi(api);
      }
      // Removes episode cards
      const episodeOptions = document.querySelectorAll("#episode-option");
      for (let i = 0; i < episodeOptions.length; i++) {
        episodeOptions[i].remove();
      }
    }
  })

  function getEpisodeFromApi(api) {
    fetch(api)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error (
          `Encountered an error: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((allShows) => {
      makePageForShows(allShows);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function getShowDataFromApi(api) {
    fetch(api)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error (
          `Encountered an error: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((allEpisodes) => {
      makePageForEpisodes(allEpisodes);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

function makePageForShows(allShows) {

  // Search bar
  const searchBar = document.getElementById("searchBar");
  searchBar.className = "form-control col-3 ml-4 mt-2 mr-2 mb-3";
  searchBar.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase();
    const showCards = document.querySelectorAll(".show-card");
    let countShows = 0;

    // Checks if each card contains the search string and if not sets display to none
    for (let i = 0; i < showCards.length; i++) {
      if (!showCards[i].innerHTML.toLowerCase().includes(searchString)) {
        showCards[i].style.display = "none";
      } else {
        showCards[i].style.display = "block";
        countShows ++;
      }
    }
    counter.textContent = `Displaying ${countShows}/240 show(s)`;
  });

  allShows.forEach((show) => {

    function showDisplay() {
      for (i = 0; i < showCards.length; i++) {
        showCards[i].style.display = "none";
      }
    }
    showDisplay();

    // Creates card for each show with medium image at the top
    const showCard = document.createElement("div");
    showCard.className = "show-card col-sm-3 text-#f7f7f7 bg-dark m-2";
    const showImage = document.createElement("img");
    showImage.className = "card-img w-75 mx-auto d-block mt-3";
    showImage.src = show.image.medium;
    showCard.appendChild(showImage);
    
    // Creates heading for card body - show name
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const showTitle = document.createElement("p");
    const showHeader = document.createElement("h5");
    showHeader.className = "card-title text-center";
    showHeader.innerHTML = `${show.name}`;
    showTitle.appendChild(showHeader);
    cardBody.appendChild(showTitle);

    // Creates paragraph for show summary
    const showSummary = document.createElement("p");
    showSummary.className = "card-text text-justify";
    showSummary.innerHTML = show.summary;
    cardBody.appendChild(showSummary);

    showCard.appendChild(cardBody);
    cardDeck.appendChild(showCard);
    rootElem.appendChild(cardDeck);
  })
  // Counts number of shows
  counter.textContent = `Displaying ${allShows.length}/240 show(s)`;
  counter.className = "ml-4 mt-1 mr-2 mb-2";
  navForm.appendChild(counter);
}

function makePageForEpisodes(allEpisodes) {

  // Search bar
  const searchBar = document.getElementById("searchBar");
  searchBar.className = "form-control col-3 ml-4 mt-2 mr-2 mb-3";
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
    counter.textContent = `Displaying ${countEpisodes}/${countEpisodes} episode(s)`;
  });

  allEpisodes.forEach((episode) => {

    let episodeOptionTag = document.createElement("option");
    episodeOptionTag.value = episode.id;
    let episodeSeason = episode.season;
    let episodeNumber = episode.number;
    
    // Checks if episode season and number are less than or equal to 9 and applies 0 
    if (episode.season <= 9) {
      episodeSeason = `0${episode.season}`;
    }
    if (episode.number <= 9) {
      episodeNumber = `0${episode.number}`;
    }
    episodeOptionTag.innerText = `S${episodeSeason}E${episodeNumber}: ${episode.name}`;
    episodeOptionTag.id = "episode-option";
    selectEpisodeTag.appendChild(episodeOptionTag);
    selectEpisodeTag.className = "form-control col-3 mt-2 mr-2 mb-3";
    selectEpisodeTag.addEventListener("click", episodeSelection);
    navForm.appendChild(selectEpisodeTag);
    selectAllEpisodes.addEventListener("click", episodeSelection);

    // Hides all episode cards and displays only the episode selected
    function episodeSelection() {
      episodeCard.style.display = "none";
      if (episodeOptionTag.value === selectEpisodeTag.value) {
        episodeCard.style.display = "block";
        counter.textContent = `Displaying 1/${allEpisodes.length} episode(s)`;
      }
      // Displays all episode cards when "All Episodes" selected
      if (selectEpisodeTag.value === "0") {
        episodeCard.style.display = "block";
        episodeOptionTag.id = "episode-option";
        counter.textContent = `Displaying ${allEpisodes.length}/${allEpisodes.length} episode(s)`;
      }
      if (selectShowTag.value === "0") {
        counter.textContent = `Displaying 240/240 show(s)`;
      }
    }

    // Creates card for each episode with medium image at the top
    const episodeCard = document.createElement("div");
    episodeCard.className = "episode-card col-sm-3 text-#f7f7f7 bg-dark m-2";
    const episodeImage = document.createElement("img");
    episodeImage.className = "card-img w-75 mx-auto d-block mt-3";
    if (episode.image !== null) {
      episodeImage.src = episode.image.medium;
      episodeCard.appendChild(episodeImage);
    }
    
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
  counter.textContent = `Displaying ${allEpisodes.length}/${allEpisodes.length} episode(s)`;
  navForm.appendChild(counter);
}

window.onload = setup;