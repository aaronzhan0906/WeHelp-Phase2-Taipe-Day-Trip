import { navigationLeftToHomePage } from "../utils/homepage.js"
import { renderBookingPage } from "../views/booking__view.js"
import { getUserDomElements, setupEventListeners } from "../utils/user__dom.js"
import { detectJwt } from "../utils/user__auth.js"


window.addEventListener("DOMContentLoaded",() => {
    renderBookingPage()
    // utils //
    navigationLeftToHomePage();
    const elements = getUserDomElements();
    setupEventListeners(elements);
    detectJwt(elements);
});



