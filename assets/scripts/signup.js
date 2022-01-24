
const signupForm = document.querySelector(".signup-form");


signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    username: e.target.username.value,
    password: e.target.password.value,
    mobileNumber:""
  };
  if (iti && iti.getNumber()!="") {
      formData.mobileNumber = iti.getNumber();
  }
  if(validateFormData(formData)){
    signupUser(formData)
    }
  
});


function validateFormData(data){
  isValidData=true
  hideAllInputWarning()
  if(data.username.length < 4){
    showInputWarning("username")
    isValidData=false
  }
  if(data.password.length < 6){
    showInputWarning("password")
    isValidData=false

  }
  if(data.mobileNumber != "" && iti && !iti.isValidNumber()){
    showInputWarning("mobile")
    isValidData=false
  }
  return isValidData
}

function signupUser(data){
  fetch(serverUrl + "/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status == 200) {
      res.json().then((response) => {
        console.log(response);

        localStorage.setItem("auth-token", response.authToken);
        window.location.href = "/index.html";
      });
    } else {
      alert("Invalid credentials");
    }
  });
}

function showInputWarning(key){
  if(key=="username"){
  document.querySelector(".username-input-warning").classList.add("show")

  }
  else if(key=="password"){
  document.querySelector(".password-input-warning").classList.add("show")

  }
  else if(key=="mobile"){
  document.querySelector(".mobile-input-warning").classList.add("show")

  }
}
function hideAllInputWarning(){
  document.querySelector(".username-input-warning").classList.remove("show")
  document.querySelector(".password-input-warning").classList.remove("show")
  document.querySelector(".mobile-input-warning").classList.remove("show")
}

// const nameWarning = document.querySelector(".name-warning");
//         const passwordWarning = document.querySelector(".password-warning");
//         const mobileWarning = document.querySelector(".mobile-warning");
//       const nameInput = document.querySelector(".name-input");
//       const passwordInput = document.querySelector(".password-input");
//       const mobileInput = document.querySelector(".mobile-input");
//       //validate the input and show the warnings
//       function validateInputs({ name, password, email, mobileNumber }) {
//           let isFormValid=true
//           //validate name and show warnings according to them
//         if (name.length < 4) {
//           nameWarning.classList.add("show");
//           nameInput.classList.add("show-red-border");
//           isFormValid= false;
//         }
//         else{
//             nameWarning.classList.remove("show");
//             nameInput.classList.remove("show-red-border");

//         }
//         if (password.length < 6) {
//           passwordWarning.classList.add("show");
//           passwordInput.classList.add("show-red-border");
//           isFormValid= false;
//         }
//         else{
//             passwordWarning.classList.remove("show");

//             passwordInput.classList.remove("show-red-border");
//         }
//         if (!iti.isValidNumber()) {
//           mobileWarning.classList.add("show");
//           mobileInput.classList.add("show-red-border");
//           isFormValid= false;
//         }
//         else{
//             mobileWarning.classList.remove("show");

//             mobileInput.classList.remove("show-red-border");
//         }
//         return isFormValid
//       }
//      
