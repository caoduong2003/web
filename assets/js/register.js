const loginSelections = document.getElementById("login-selection");
const registerSelections = document.getElementById("register-selection");

const formLogin = document.querySelector(".form-login");
const formRegister = document.querySelector(".form-register");

const submit = document.querySelector(".form-submit");
const nameValue = document.getElementById("name-input");
const emailValue = document.getElementById("email-input");
const passwordValue = document.getElementById("password-input");
const confirmPasswordValue = document.getElementById("confirmPassword-input");
const errorEmail = document.querySelector(".errorMesEmail");
const errorPassword = document.querySelector(".errorMesPassword");
// const errorName = document.querySelector(".name-input");
const errorConfirmPassword = document.querySelector(".confirmPassword-error");
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

emailValue.onchange = (e) => {
  checkEmail(e.target.value);
};

passwordValue.onchange = (e) => {
  checkPassword(e.target.value);
};

confirmPasswordValue.onchange = (e) => {
  checkConfirm(e.target.value);
};

const register = async (obj) => {
  const response = await fetch("http://localhost:3000/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(obj),
  });
  return response;
};

function checkConfirm(value) {
  if (passwordValue.value === value) {
    errorConfirmPassword.textContent = "";
    return true;
  } else {
    errorConfirmPassword.textContent = "Mat khau khong khop";
    return false;
  }
}

function checkEmail(value) {
  if (regEmail.test(value)) {
    errorEmail.textContent = "";
    return true;
  } else {
    errorEmail.textContent = "Email khong hop le";
    return false;
  }
}

function checkPassword(value) {
  if (regPass.test(value)) {
    errorPassword.textContent = "";
    return true;
  } else {
    errorPassword.textContent =
      "Mật khẩu chứa ít nhất 6 kí tự, bao gồm ít nhất 1 chữ cái và 1 chữ số";
    return false;
  }
}

formRegister.onsubmit = (e) => {
  e.preventDefault();
  checkEmail(emailValue.value) &&
    checkPassword(passwordValue.value) &&
    checkConfirm(confirmPasswordValue.value) &&
    register({
      id: emailValue.value,
      name: nameValue.value,
      username: emailValue.value,
      password: passwordValue.value,
    }).then((res) => {
      if (res.status === 201) {
        alert("Dang ky thanh cong");
        window.location.assign("./src/page/login.html");
      } else {
        res.text().then(text => alert(text))
      }
    });
};
