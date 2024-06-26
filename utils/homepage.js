

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