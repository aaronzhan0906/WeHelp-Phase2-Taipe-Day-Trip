import { navigationLeftToHomePage, redirectToHomePage, timeAndCharge } from "./attraction-controller.js"

window.addEventListener("DOMContentLoaded",() => {
    const attractionId = getIdFromUrl();
    navigationLeftToHomePage();
    fetchAttractionIdData(attractionId)
    .then(createAttractionPage)
    .catch(error => console.error("(attractionId) Error fetching attraction data.", error));
});

// get attractionId
const getIdFromUrl = () => {
    const urlParts = window.location.href.split("/");
    return parseInt(urlParts[urlParts.length - 1], 10);
};

// fetch API and get json
const fetchAttractionIdData = async (attractionId) => {
    const apiAttractionIdUrl = `/api/attraction/${attractionId}`;
    const response = await fetch(apiAttractionIdUrl);
    const status = response.status;

    if (status === 200) {
        const data = await response.json();
        return data.data;
    } else {
        redirectToHomePage();
    }
};

// create content
const createAttractionPage = (attractionIdData) => {
    
    const sectionImage = document.querySelector(".section__image");
    const imageArrowLeft = document.querySelector(".image__arrow--left");
    const imageArrowRight = document.querySelector(".image__arrow--right");
    const imageCircle = document.querySelector(".image__circle")
    const images = attractionIdData.images;
    
    let currentImageIndex = 0;

    const preloadFirstImage = () => {
        const firstImage = new Image();
        firstImage.src = images[0];
        
        firstImage.onload = () => {
            const link = document.createElement("link");
            link.rel = "preload";
            link.fetchPriority = "high";
            link.href = images[0];
            document.head.appendChild(link);

            preloadRemainingImages(attractionIdData);
        };
    };
    preloadFirstImage();

    const initialImage = (initialIndex) => {
        sectionImage.style.backgroundImage = `url(${images[initialIndex]})`;
        sectionImage.style.opacity = 1;
    };

    for (let i = 0; i < images.length; i++) {
        const imageWhiteCircle = document.createElement("div");
        imageWhiteCircle.classList.add("image__circle--white");
        imageCircle.appendChild(imageWhiteCircle);
    };

    const whiteCircles = document.querySelectorAll(".image__circle--white");
    const changeToBlack = (nextIndex) => {
        whiteCircles.forEach(circle => circle.classList.replace("image__circle--black", "image__circle--white"));
        whiteCircles[nextIndex].classList.replace("image__circle--white", "image__circle--black");
    }

    initialImage(currentImageIndex);
    changeToBlack(currentImageIndex);


    const updateImage = (Index) => {
        sectionImage.style.opacity = 0;
    
        setTimeout(() => {
            sectionImage.style.backgroundImage = `url(${images[Index]})`;
            sectionImage.style.opacity = 1;
        }, 300); 
    };

    imageArrowLeft.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage(currentImageIndex);
        changeToBlack(currentImageIndex);
    });

    imageArrowRight.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage(currentImageIndex);
        changeToBlack(currentImageIndex);
    });

    // textContent
    const setTextContent = (selector, text) => {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    };

    setTextContent(".section__name", attractionIdData.name);
    setTextContent(".section__subtitle--category", attractionIdData.category);
    setTextContent(".section__subtitle--mrt", attractionIdData.mrt);
    setTextContent(".main__description", attractionIdData.description);
    setTextContent(".main__address--content", attractionIdData.address);
    setTextContent(".main__transport--content", attractionIdData.transport);

    timeAndCharge();
};


const preloadRemainingImages = (attractionIdData) => {
    const images = attractionIdData.images;
    images.slice(1).forEach(src => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
    });
};