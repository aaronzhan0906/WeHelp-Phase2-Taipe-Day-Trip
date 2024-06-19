export const userFormSignUp = () =>{
    const userForm = document.querySelector(".user__form")
    let isEmpty = false;

    userForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        isEmpty = false;

        const inputs = userForm.querySelectorAll("input");
        inputs.forEach((input) => {
            if (input.value.trim() === "") {
                isEmpty = true;
            }
        });
        
        const formData = new FormData(userForm);
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

            if(response.ok) {
                const responseData = await response.json();
                if (responseData.ok) {
                    console.log("註冊成功")
                } 
            } else {
                const responseData = await response.json();
                console.log(`${responseData.message}`)
            }

        } catch (error) {
            console.error("Error", error);
        }
    });
};
