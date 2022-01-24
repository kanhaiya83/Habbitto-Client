
//#region login page
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  if(validateFormData(formData)){
    loginUser(formData)
  }
});

function loginUser(data){
  
  fetch(serverUrl+"/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status == 200) {
      res.json().then((response) => {
        localStorage.setItem("auth-token", response.authToken);
        window.location.href = "/index.html";
      });
    } else {
      alert("Invalid credentials");
    }
  });
}

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
  return isValidData
}

function showInputWarning(key){
  if(key=="username"){
  document.querySelector(".username-input-warning").classList.add("show")

  }
  else if(key=="password"){
  document.querySelector(".password-input-warning").classList.add("show")

  }
}
function hideAllInputWarning(){
  document.querySelector(".username-input-warning").classList.remove("show")
  document.querySelector(".password-input-warning").classList.remove("show")
}