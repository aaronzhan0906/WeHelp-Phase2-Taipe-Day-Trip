export const getDomElements = () => {
    return {
        navigationRightSignIn: document.querySelector(".navigation__right-signin"),
        user: document.querySelector(".user"),
        userForm: document.querySelector(".user__form"),
        userBox: document.querySelector(".user__box"),
        overlay: document.querySelector(".overlay"),
        formFooterQuestion: document.querySelector(".form__footer--question"),
        formFooterRegister: document.querySelector(".form__footer--register"),
        formName: document.querySelector(".form__name")
    };
};

export const userSignIn = (elements) => {
    const { navigationRightSignIn, user, overlay, formFooterRegister, formFooterQuestion, formName, userBox } = elements;

    navigationRightSignIn.addEventListener("click", () => {
        user.style.display = "block";
        overlay.style.display = "block";
    });

    overlay.addEventListener("click", () => {
        user.style.display = "none";
        overlay.style.display = "none";
    });

    formFooterRegister.addEventListener("click", () => {
        user.style.height = "332px";
        userBox.style.height = "322px";
        formName.style.display = "block";
        formFooterQuestion.textContent = "已經有帳戶了？";
        formFooterRegister.textContent = "點此登入";
        userSignUp(elements);
    });
};

export const userSignUp = (elements) => {
    const { user, formFooterRegister, formFooterQuestion, formName, userBox } = elements;
  
    formFooterRegister.addEventListener("click", () => {
      user.style.height = "275px";
      userBox.style.height = "265px";
      formName.style.display = "none";
      formFooterQuestion.textContent = "還沒有帳戶？";
      formFooterRegister.textContent = "點此註冊";
      userSignIn(elements);
    });
  };