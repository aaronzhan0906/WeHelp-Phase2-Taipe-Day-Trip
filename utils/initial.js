
export const initial = () => {
    navigationLeftToHomePage();
    navigationRightBooking();
}

export const navigationLeftToHomePage = () => {
    document.querySelector(".navigation__left").addEventListener("click", function() {
    const homePage = `http://${window.location.host}`;
    window.location.href = homePage;
    }
)};

export const redirectToHomePage = () => {
    const homePage = `http://${window.location.host}`
    const returnHomePage = window.location = homePage;
    return returnHomePage;
}


export const navigationRightBooking = () => {
    document.querySelector(".navigation__right-booking").style.display = "block"
    document.querySelector(".navigation__right-booking").textContent = "預定行程"
}