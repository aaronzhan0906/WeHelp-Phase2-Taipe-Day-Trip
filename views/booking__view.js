export const renderBookingPage = async () => {
    const storedJWT = localStorage.getItem("jwt");
    const journeyGreet = document.querySelector(".journey__greet");
    const journeyGreetUsername = document.querySelector(".journey__greet--username");
    const signInName = localStorage.getItem("signInName");

    if (!storedJWT) {
        const journeyGreetReply = document.createElement("div");
        journeyGreetReply.classList.add("journey__greet--reply");
        journeyGreet.appendChild(journeyGreetReply);
        journeyGreetReply.textContent = "請先登入後確認是否有待預定的行程";
    } else {
        try {
            const response = await fetch("/api/booking", {
                headers: {
                    Authorization: `Bearer ${storedJWT}`
                }
            });

            const journeyData = await response.json();

            if (journeyGreetUsername) {
                journeyGreetUsername.textContent = signInName;
            }

            if (journeyGreet) {
                journeyGreet.textContent = `您好，${signInName}，待預定的行程如下：`;
            }

            if (!journeyData.data) {
                const journeyGreetReply = document.createElement("div");
                journeyGreetReply.classList.add("journey__greet--reply");
                journeyGreet.appendChild(journeyGreetReply);
                journeyGreetReply.textContent = "目前沒有等待預定的行程";
            } else {
                const { attraction, date, time, price } = journeyData.data;
                createBookingDOM(attraction, date, time, price);
            }
        } catch (error) {
            console.error(error);
            const journeyGreetReply = document.createElement("div");
            journeyGreetReply.classList.add("journey__greet--reply");
            journeyGreet.appendChild(journeyGreetReply);
            journeyGreetReply.textContent = "獲取行程資料時發生錯誤，請稍後再試";
        }
    }
};


const createBookingDOM = (attraction, date, time, price) => {
    
}