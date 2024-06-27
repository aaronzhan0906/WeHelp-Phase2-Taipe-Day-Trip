import { initial } from "../utils/initial.js"
import { renderBookingPage } from "../views/booking__view.js"
import { getUserDomElements, setupEventListeners } from "../utils/user__dom.js"
import { detectJwt } from "../utils/user__auth.js"



window.addEventListener("DOMContentLoaded",() => {
    // initial //
    initial();

    // utils //
    const elements = getUserDomElements();
    setupEventListeners(elements);
    detectJwt(elements);


    // booking__view //
    renderBookingPage();
});





