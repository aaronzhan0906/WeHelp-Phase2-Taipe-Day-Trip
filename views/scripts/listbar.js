export async function listBarApi() {
    const mrtsUrl = `/api/mrts`;
  
    try {
        const response = await fetch(mrtsUrl);
        const data = await response.json();
        const mrtsData = data.data;
    
        for (let i = 0; i < mrtsData.length; i++) {
            createListBarItem(mrtsData[i]);
        }
  
        leftArrow();
        rightArrow();
    } catch (error) {
        console.log("Error fetching mrts data.", error);
    }
  }

function createListBarItem(item) {
    const listBarContainer = document.querySelector(".list-bar__container");
    const listBarItem = document.createElement("div");
    listBarItem.classList.add("list-bar__item");
    listBarItem.textContent = item;
    listBarContainer.appendChild(listBarItem);
    return listBarContainer;
  }

function leftArrow() {
    const listBarContainer = document.querySelector(".list-bar__container");
    // scroll amount
    const scrollAmount = 0.8 * listBarContainer.clientWidth;
    document.querySelector(".list-bar__arrow--left").addEventListener('click', function(event) {
        listBarContainer.scrollLeft -= scrollAmount;
    });
}

function rightArrow() {
    const listBarContainer = document.querySelector(".list-bar__container");
    // scroll amount
    const scrollAmount = 0.8 * listBarContainer.clientWidth;
    document.querySelector(".list-bar__arrow--right").addEventListener('click', function(event) {
        listBarContainer.scrollLeft += scrollAmount;
    });
}

