import { fetchAttractionsData } from "../views/index__view--attractions.js";
import { listBarApi } from "../views/index__view--listbar.js";
import { searchInputApi } from "../views/index__view--search.js";
import { getDomElements, setupEventListeners } from "../utils/user__dom.js"
import { detectJwt } from "../utils/user__auth.js"


window.addEventListener("DOMContentLoaded", function(){
    fetchAttractionsData();
    listBarApi();
    searchInputApi();

    const elements = getDomElements();
    setupEventListeners(elements);
    detectJwt(elements)
});


export const navigationLeftToHomePage = () => {
    document.querySelector(".navigation__left").addEventListener("click", function() {
    const homePage = `http://${window.location.host}`;
    window.location.href = homePage;
    }
)};