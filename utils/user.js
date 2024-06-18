export const getDomElements = () => {
    return {
        navigationRightSignIn: document.querySelector(".navigation__right-signin"),
        signIn: document.querySelector(".signin"),
        signInBox: document.querySelector(".signin__box"),
        overlay: document.querySelector(".overlay"),
        formFooterQuestion: document.querySelector(".form__footer--question"),
        formFooterRegister: document.querySelector(".form__footer--register"),
        formName: document.querySelector(".form__name")
    };
};

export const userSignIn = (elements) => {
    const { navigationRightSignIn, signIn, overlay, formFooterRegister, formFooterQuestion, formName, signInBox } = elements;

    navigationRightSignIn.addEventListener("click", () => {
        signIn.style.display = "block";
        overlay.style.display = "block";
    });

    overlay.addEventListener("click", () => {
        signIn.style.display = "none";
        overlay.style.display = "none";
    });

    formFooterRegister.addEventListener("click", () => {
        signIn.style.height = "332px";
        signInBox.style.height = "322px";
        formName.style.display = "block";
        formFooterQuestion.textContent = "已經有帳戶了？";
        formFooterRegister.textContent = "點此登入";
        userSignUp(elements);
    });
};

export const userSignUp = (elements) => {
    const { formFooterRegister, formFooterQuestion, formName, signIn, signInBox } = elements;

    formFooterRegister.addEventListener("click", () => {
        signIn.style.height = "275px";
        signInBox.style.height = "265px";
        formName.style.display = "none";
        formFooterQuestion.textContent = "還沒有帳戶？";
        formFooterRegister.textContent = "點此註冊";
        userSignIn(elements);
    });
};