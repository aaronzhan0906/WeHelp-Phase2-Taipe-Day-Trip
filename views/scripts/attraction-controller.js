export const redirectToHomePage = () => {
    const homePage = `http://${window.location.host}`
    const returnHomePage = window.location = homePage;
    return returnHomePage;
}


export const navigationLeftToHomePage = () => {
    document.querySelector(".navigation__left").addEventListener("click", function() {
    const homePage = `http://${window.location.host}`;
    window.location.href = homePage;
    }
)};

export const timeAndCharge = () => {
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
