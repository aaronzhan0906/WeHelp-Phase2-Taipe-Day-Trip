import { fetchAttractionsData } from "../views/index__view--attractions.js";
import { listBarApi } from "../views/index__view--listbar.js";
import { searchInputApi } from "../views/index__view--search.js";

// utils //
import { getUserDomElements, setupEventListeners } from "../utils/user__dom.js"
import { detectJwt } from "../utils/user__auth.js"
import { navigationLeftToHomePage } from "../utils/homepage.js"


window.addEventListener("DOMContentLoaded", function(){
    fetchAttractionsData();
    listBarApi();
    searchInputApi();
    navigationLeftToHomePage();

    // user //
    const elements = getUserDomElements();
    setupEventListeners(elements);
    detectJwt(elements)

    // booking //
    openBookingPage()
});

const openBookingPage = () => {
    document.querySelector(".navigation__right-booking").addEventListener("click",() => {
    const bookingPage = `http://${window.location.host}/booking`
    window.location.href =  bookingPage;
    });
};


