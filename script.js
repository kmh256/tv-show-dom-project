//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const cardDeck = document.createElement("div");
  cardDeck.className = "card-deck justify-content-around";
  
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.map((episode) => {
    const episodeCard = document.createElement("div");
    episodeCard.className = "col-sm-3 text-white bg-dark m-2";
    const episodeImage = document.createElement("img");
    episodeImage.className = "card-img-top mt-3";
    episodeImage.src = episode.image.medium;
    episodeCard.appendChild(episodeImage);
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const episodeHeader = document.createElement("h5");
    episodeHeader.className = "card-title";
    episodeHeader.innerHTML = `${episode.name}: S0${episode.season}E0${episode.number}`;
    cardBody.appendChild(episodeHeader);

    const episodeSummary = document.createElement("p");
    episodeSummary.className = "card-text";
    episodeSummary.innerHTML = episode.summary;
    cardBody.appendChild(episodeSummary);

    episodeCard.appendChild(cardBody);
    cardDeck.appendChild(episodeCard);
    rootElem.appendChild(cardDeck);

  })
}

window.onload = setup;
