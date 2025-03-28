function ShowSignUpForm() {
    const signInForm = document.getElementById("sigin-form");
    const signUpForm = document.getElementById("signup-form");
    setTimeout(() => {
      signInForm.classList.add("d-hide");
      signUpForm.classList.remove("d-hide");
    }, 100); 
  }

  function ShowSignInForm() {
    const signInForm = document.getElementById("sigin-form");
    const signUpForm = document.getElementById("signup-form");
    setTimeout(() => {
      signUpForm.classList.add("d-hide");
      signInForm.classList.remove("d-hide");
    }, 100); 
  }
  VANTA.NET({
el: "#body-bg",
mouseControls: true,
touchControls: true,
gyroControls: false,
minHeight: 200.00,
minWidth: 200.00,
scale: 1.00,
scaleMobile: 1.00,
color: "#b02b19",
backgroundColor: "#23201b",
points: 17.00,
maxDistance: 23.00,
spacing: 16.00
})
let users = JSON.parse(localStorage.getItem('users')) || [];
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function dangKi() {
  const email = document.getElementById("emailInput").value;
  const username = document.getElementById("userNameInput").value;
  const password = document.getElementById("passInput").value;
  const passwordAgain = document.getElementById("passInputAgain").value;
  const dieukhoan = document.getElementById("dieukhoan").checked;

  if (email === "" || username === "" || password === "" || passwordAgain === "" || !dieukhoan) {
    showNotiMissing();
    return false;
  } else {
    if (password !== passwordAgain) {
      checkPassWord();
      return false;
    }

    const emailExists = users.some(user => user.email === email);
    const usernameExists = users.some(user => user.username === username);
    if (emailExists) {
      showNotiCustom("Lỗi", "Email đã được sử dụng!");
      return false;
    }
    if (usernameExists) {
      showNotiCustom("Lỗi", "Tên người dùng đã tồn tại!");
      return false;
    }

    const newUser = {
      id: users.length + 1,
      email: email,
      username: username,
      password: password,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers();

    showNotiSuccess();
    setTimeout(() => {
      window.location.href = "loginRegisterPage.html";
    }, 4000);
    return true;
  }
}

// Hàm đăng nhập
function dangNhap() {
  const username = document.getElementById("usnameLoginInput").value;
  const password = document.getElementById("passLoginInput").value;
  if (username === "" || password === "") {
    showNotiMissing();
    return false;
  } else {
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      showNotiFail(); 
      return false;
    } else {
      showNotiSuccess(); 
      setTimeout(() => {
        window.location.href = "homePage.html"; 
      }, 4000);
      return true;
    }
  }
}

function showNotiSuccess() {
  const noti = document.getElementById("noti-success");
  noti.classList.add("show");
  setTimeout(() => {
    noti.classList.remove("show");
  }, 3000);
}
function showNotiMissing() {
  const noti = document.getElementById("noti-missing");
  noti.classList.add("show");
  setTimeout(() => {
    noti.classList.remove("show");
  }, 3000);
}


function showNotiFail() {
  const noti = document.getElementById("noti-fail");
  noti.classList.add("show");
  setTimeout(() => {
    noti.classList.remove("show");
  }, 3000);
}

function checkPassWord() {
  const noti = document.getElementById("pass-duplicate");
  noti.classList.add("show");
  setTimeout(() => {
    noti.classList.remove("show");
  }, 3000);
}