//#region
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
  showLoader(true)
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
      res.json().then((data)=>{
        if(data.success ===false && data.message){
          showLoader(false)
          showAlert("failure",data.message)
        }
        else{
          showLoader(false)
          showAlert("failure","Some error occurred!Please try again.")
        }
      })
      
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
//#endregion

//loader function 

function showLoader(show=true){
  if(show){
    document.querySelector(".loader-container").classList.add("show")
  
  }
  else{
    document.querySelector(".loader-container").classList.remove("show")
  
  }
  }

  
//alerts
const successAlert= document.querySelector(".success-alert")
const failureAlert= document.querySelector(".failure-alert")
const successAlertText= document.querySelector(".success-alert .alert-text")
const failureAlertText= document.querySelector(".failure-alert .alert-text")
function showAlert(type,msg){
  if(type=="success"){
    successAlertText.innerHTML=msg
   successAlert.classList.add("show")
    setTimeout(()=>{
     successAlert.classList.remove("show")
    },4000)
  }
  else{
    
    failureAlertText.innerHTML=msg
    failureAlert.classList.add("show")
    setTimeout(()=>{
      failureAlert.classList.remove("show")
    },4000)
  }
}

document.querySelectorAll(".alert .close-alert-btn").forEach((e)=>{
  e.addEventListener("click",()=>{
   successAlert.classList.remove("show")
    failureAlert.classList.remove("show")
  })
})