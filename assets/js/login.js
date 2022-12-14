const loginSelections = document.getElementById("login-selection");
const registerSelections = document.getElementById("register-selection");

const formLogin = document.querySelector(".form-login");
const formRegister = document.querySelector(".form-register");

const submit = document.querySelector(".form-submit");
const emailValue = document.getElementById("email-input");
const passwordValue = document.getElementById("password-input");
const errorEmail = document.querySelector(".errorMesEmail");
const errorPassword = document.querySelector(".errorMesPassword");
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

emailValue.onchange = (e) => {
  checkEmail(e.target.value);
};

passwordValue.onchange = (e) => {
  checkPassword(e.target.value);
};

const login = async () => {
  const response = await fetch("http://localhost:3000/account").then((res) =>
    res.json()
  );
  return response;
};

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

function checkValidate() {
  login().then((data) =>
    data.find(
      (item) =>
        item.username === emailValue.value &&
        item.password === passwordValue.value
    )
      ? alert("Dang nhap thanh cong")
      : alert("Sai tai khoan")
  );
}

formLogin.onsubmit = (e) => {
  e.preventDefault();
  checkEmail(emailValue.value) && checkPassword(passwordValue.value) && checkValidate();
};
