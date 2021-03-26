//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const searchForm = document.querySelector("form");
  const cardDeck = document.createElement("div");
  cardDeck.className = "card-deck justify-content-around";
  
  let episodeCounter = document.createElement("div");
  episodeCounter.textContent = `Got ${episodeList.length} episode(s)`;
  episodeCounter.className = "col-auto";
  searchForm.appendChild(episodeCounter);

  episodeList.map((episode) => {
    const episodeCard = document.createElement("div");
    episodeCard.className = "col-sm-3 text-#f7f7f7 bg-dark m-2";
    const episodeImage = document.createElement("img");
    episodeImage.className = "card-img w-75 mx-auto d-block mt-4";
    episodeImage.src = episode.image.medium;
    episodeCard.appendChild(episodeImage);
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const episodeHeader = document.createElement("h5");
    episodeHeader.className = "card-title text-center";
    episodeHeader.innerHTML = `S0${episode.season}E0${episode.number}: ${episode.name}`;
    cardBody.appendChild(episodeHeader);

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