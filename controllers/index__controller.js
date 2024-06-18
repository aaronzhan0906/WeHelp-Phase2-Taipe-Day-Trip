import { fetchAttractionsData } from "../views/index__view--attractions.js";
import { listBarApi } from "../views/index__view--listbar.js";
import { searchInputApi } from "../views/index__view--search.js";
import { getDomElements, userSignIn } from "../utils/user.js"


window.addEventListener("DOMContentLoaded", function(){
    fetchAttractionsData();
    listBarApi();
    searchInputApi();
    const elements = getDomElements();
    userSignIn(elements);
});


export const navigationLeftToHomePage = () => {
    document.querySelector(".navigation__left").addEventListener("click", function() {
    const homePage = `http://${window.location.host}`;
    window.location.href = homePage;
    }
)};