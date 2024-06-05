let isFetching = false;
let nextPage = 1;

window.addEventListener("load", function(){
    fetchAttractionsData();
});

function fetchAttractionsData(){
    const apiUrl =`/api/attractions`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const attractionsData = data.data;
            const nextPage = data.nextPage;
            for(let i = 0 ; i < attractionsData.length; i++){
                createAttractionCard(attractionsData[i])
            }
            console.log(nextPage)
            handleObserver(nextPage); 
            return nextPage;
        })
        .catch(error => {
            console.log("Error fetching attraction data.", error)
        });
}



function createAttractionCard(data) {
    // attractions container
    const attractions = document.querySelector(".attractions");

    // cards
    const attractionCard = document.createElement("div");
    attractionCard.classList.add("attraction-card");

    // images
    const attractionCardImage = document.createElement("div");
    attractionCardImage.classList.add("attraction-card__image");
    attractionCardImage.style.backgroundImage = `url(${data.images[0]})`;

    const attractionCardName = document.createElement("div");
    attractionCardName.classList.add("attraction-card__name");
    attractionCardName.textContent = data.name;
    attractionCardImage.appendChild(attractionCardName);

    // Details
    const attractionCardDetails = document.createElement("div");
    attractionCardDetails.classList.add("attraction-card__details");

    const attractionCardMrt = document.createElement("div");
    attractionCardMrt.classList.add("attraction-card__mrt");
    attractionCardMrt.textContent = data.mrt;

    const attractionCardCategory = document.createElement("div");
    attractionCardCategory.classList.add("attraction-card__category");
    attractionCardCategory.textContent = data.category;

    // append
    attractionCardDetails.appendChild(attractionCardMrt);
    attractionCardDetails.appendChild(attractionCardCategory);
    attractionCard.appendChild(attractionCardImage);
    attractionCard.appendChild(attractionCardDetails);
    attractions.appendChild(attractionCard);

    return attractionCard;
}


// IntersectionObserver
const footer = document.querySelector("footer");

function handleObserver() {
    if (nextPage === null) {
        observer.disconnect();
        return;
    }

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    };
    console.log(nextPage)
    const observer = new IntersectionObserver(async (entries, observer) => {
        entries.forEach(async (entry) => {
            if (entry.isIntersecting && !isFetching) {
                isFetching = true; // Set the flag to true to prevent multiple fetches

                try {
                    const response = await fetch(`/api/attractions?page=${nextPage}`);
                    const data = await response.json();
                    const attractionsData = data.data;
                    nextPage = data.nextPage; // Update nextPage with the new value from the server

                    for (let i = 0; i < attractionsData.length; i++) {
                        createAttractionCard(attractionsData[i]);
                    }

                    handleObserver(); // Recursive call to handleObserver
                } catch (error) {
                        console.log("Error fetching attraction data.", error);
                } finally {
                        isFetching = false; // Reset the flag to false after the fetch is complete
                }
            }
        });
    }, options);

    observer.observe(footer);
}


// const nextUrl = `/api/attractions/?page=${nextPage}`


