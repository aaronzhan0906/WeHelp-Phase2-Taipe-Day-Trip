export const getDomElements = () => {
    return {
        navigationRightSignIn: document.querySelector(".navigation__right-signin"),
        user: document.querySelector(".user"),
        userFormSignIn: document.querySelector(".user__form--signin"),
        userBox: document.querySelector(".user__box"),
        overlay: document.querySelector(".overlay"),
        formFooterQuestion: document.querySelector(".form__footer--question"),
        formFooterRegister: document.querySelector(".form__footer--register"),
        formName: document.querySelector(".form__name")
    };
};

export const userSignIn = (elements) => {
    const { navigationRightSignIn, user, overlay, formFooterRegister, formFooterQuestion, formName, userBox, userFormSignIn } = elements;

    navigationRightSignIn.addEventListener("click", () => {
        user.style.display = "block";
        overlay.style.display = "block";
    });

    overlay.addEventListener("click", () => {
        user.style.display = "none";
        overlay.style.display = "none";
    });

    formFooterRegister.addEventListener("click", () => {
        userFormSignIn.classList.add("user__form--signup"); 
        userFormSignIn.classList.remove("user__form--signin"); 
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
    const userFormSignUp = document.querySelector(".user__form--signup");
  
    formFooterRegister.addEventListener("click", () => {
      userFormSignUp.classList.add('user__form--signin');
      userFormSignUp.classList.remove("user__form--signup");
      user.style.height = "275px";
      userBox.style.height = "265px";
      formName.style.display = "none";
      formFooterQuestion.textContent = "還沒有帳戶？";
      formFooterRegister.textContent = "點此註冊";
      userSignIn(elements);
    });
  };