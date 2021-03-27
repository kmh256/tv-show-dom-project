//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const navForm = document.querySelector("form");
  const selectTag = document.createElement("select");

  // All episodes selector
  const allEpisodes = document.createElement("option");
  allEpisodes.innerText = "All Episodes";
  selectTag.appendChild(allEpisodes);

  const cardDeck = document.createElement("div");
  cardDeck.className = "card-deck justify-content-around";
  
  // Counts number of episodes
  let episodeCounter = document.createElement("div");
  episodeCounter.textContent = `Displaying ${episodeList.length} episode(s)`;
  episodeCounter.className = "col-auto";
  navForm.appendChild(episodeCounter);

  episodeList.map((episode) => {

    let optionTag = document.createElement("option");
    optionTag.value = episode.id;
    let episodeSeason = episode.season;
    let episodeNumber = episode.number;
    if (episode.season <= 9) {
      episodeSeason = `0${episode.season}`;
    }
    if (episode.number <= 9) {
      episodeNumber = `0${episode.number}`;
    }
    optionTag.innerText = `S${episodeSeason}E${episodeNumber}: ${episode.name}`;
    selectTag.appendChild(optionTag);
    selectTag.className = "form-control w-25";
    selectTag.addEventListener("click", episodeSelection);
    navForm.appendChild(selectTag);
    function episodeSelection() {
      console.log(optionTag.value);
    }

    // Creates card for each episode with medium image at the top
    const episodeCard = document.createElement("div");
    episodeCard.className = "col-sm-3 text-#f7f7f7 bg-dark m-2";
    const episodeImage = document.createElement("img");
    episodeImage.className = "card-img w-75 mx-auto d-block mt-4";
    episodeImage.src = episode.image.medium;
    episodeCard.appendChild(episodeImage);
    
    // Creates heading for card body - season, episode number & episode name
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const episodeHeader = document.createElement("h5");
    episodeHeader.className = "card-title text-center";
    episodeHeader.innerHTML = `S${episodeSeason}E${episodeNumber}: ${episode.name}`;
    cardBody.appendChild(episodeHeader);

    // Creates paragraph for episode summary
    const episodeSummary = document.createElement("p");
    episodeSummary.className = "card-text text-justify";
    episodeSummary.innerHTML = episode.summary;
    cardBody.appendChild(episodeSummary);

    episodeCard.appendChild(cardBody);
    cardDeck.appendChild(episodeCard);
    rootElem.appendChild(cardDeck);

  })
}

window.onload = setup;