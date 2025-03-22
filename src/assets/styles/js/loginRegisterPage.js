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