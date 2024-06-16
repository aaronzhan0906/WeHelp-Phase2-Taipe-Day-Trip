import { fetchAttractionsData } from "./index-attractions.js";
import { listBarApi } from "../views/index__view--listbar.js";
import { searchInputApi } from "../views/index__view--search.js";



window.addEventListener("DOMContentLoaded", function(){
    fetchAttractionsData();
    listBarApi();
    searchInputApi();
});

export const navigationLeftToHomePage = () => {
    document.querySelector(".navigation__left").addEventListener("click", function() {
    const homePage = `http://${window.location.host}`;
    window.location.href = homePage;
    }
)};