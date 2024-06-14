window.addEventListener("DOMContentLoaded",() => {
    const attractionId = getIdFromUrl();
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
        throw new Error(`HTTP error! status: ${status}`);
    }
};

// returnHomePage
const redirectToHomePage = () => {
    const homePage = `http://${window.location.host}`
    const returnHomePage = window.location = homePage;
    return returnHomePage
}

// create content
const createAttractionPage = (attractionIdData) => {
    const images = attractionIdData.images;
    let currentImageIndex = 0;
   
    const sectionImage = document.querySelector(".section__image");
    const imageArrowLeft = document.querySelector(".image__arrow--left");
    const imageArrowRight = document.querySelector(".image__arrow--right");
    const imageCircle = document.querySelector(".image__circle")

    const updateImage = (index) => {
        sectionImage.style.opacity = 0;
      
        requestAnimationFrame(() => {
          sectionImage.style.backgroundImage = `url(${images[index]})`;
          sectionImage.style.opacity = 1; 
        });
      };

    for (let i = 0; i < images.length; i++){
        const imageWhiteCircle = document.createElement("div");
        imageWhiteCircle.classList.add("image__circle--white");
        imageCircle.appendChild(imageWhiteCircle);
    };

    const whiteCircles = document.querySelectorAll('.image__circle--white');
    const changeToBlack = (index) => {
        whiteCircles.forEach(circle => circle.classList.replace('image__circle--black', 'image__circle--white'));
        whiteCircles[index].classList.replace('image__circle--white', 'image__circle--black');
    }

    updateImage(currentImageIndex);
    changeToBlack(currentImageIndex);

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

    // Initialize the first image
    updateImage(currentImageIndex);


    // textContent
    const setTextContent = (selector, text) => {
        const element = document.querySelector(selector);
        if(element){
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

const timeAndCharge = () => {
    const timeOptions = document.querySelectorAll(".booking__time--radio")
    const costAmount = document.querySelector(".booking__cost--amount")

    timeOptions[0].checked = true;
    costAmount.textContent = "新台幣 2000 元";

    timeOptions.forEach(option => {
        option.addEventListener("change", () => {
            const selectedTime = document.querySelector(".booking__time--radio:checked")?.nextElementSibling?.textContent;
        
            costAmount.textContent = selectedTime === "上半天" ? "新台幣 2000 元" : "新台幣 2500 元";
        });
    });
};
    