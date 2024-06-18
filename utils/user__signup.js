const signUpForm = () =>{
    const userFormSignUp = document.querySelector(".user__form--signup")
    let isEmpty = false;

    userFormSignUp.addEventListener("submit", async (event) => {
        isEmpty = false;

        const inputs = userFormSignUp.querySelectorAll("input");
        inputs.forEach((input) => {
            if (input.value.trim() === "") {
                isEmpty = true;
            }
        });
        
        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        };

        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error("Error", error);
        }
    });
};
