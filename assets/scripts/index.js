

//#region initial auth check

if (localStorage.getItem("auth-token") != "") {
  fetch(serverUrl + "/habits", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  }).then((res) => {
    if (res.status == 200) {
      res.json().then((hobbyData) => {
        populateData(hobbyData.habits);

        document.querySelector(".main-wrapper").style.display = "block";
        showLoader(false);
        showAlert("success","Logged in as "+hobbyData.username)
      });
    } else {
      window.location.href = "/login.html";
    }
  });
} else {
  window.location.href = "/login.html";
}

function populateData(habitsArr) {
  habitsArr.forEach((habitObj) => {
    let habitEle = document.createElement("div");
    habitEle.classList.add("habit");
    if (habitObj.isCompleted) {
      habitEle.classList.add("completed");
    }
    let habitInnerHtml = `
    <div class="habit-checkbox">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path d="M56.734 5.081c-8.437 7.302-15.575 14.253-22.11 23.322c-2.882 4-6.087 8.708-8.182 13.153c-1.196 2.357-3.352 6.04-4.087 9.581c-4.02-3.74-8.338-7.985-12.756-11.31c-3.149-2.369-12.219 2.461-8.527 5.239c6.617 4.977 12.12 11.176 18.556 16.375c2.692 2.172 8.658-2.545 10.06-4.524c4.602-6.52 5.231-14.49 8.585-21.602c5.121-10.877 14.203-19.812 23.17-27.571c5.941-5.541-.195-6.563-4.7-2.663" fill="#01C952"/></svg>
    </div>
    <div class="wrapper">
      <div class="title"><span>${habitObj.title}</span></div>
      <div class="repeat-info">
        <img src="./assets/images/repeat.svg" alt="" />
        <span>Repeat Everyday</span>
      </div>
    </div>
    <div class="reminder-time">
      <div class="bell-icon">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 448 512"><path d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29c0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29c-6 6.45-8.66 14.16-8.61 21.71c.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32c.05-7.55-2.61-15.27-8.61-21.71z" fill="#636363"/></svg>
      </div>
      <span>05:30 AM</span>
    </div>
`;
    habitEle.innerHTML = habitInnerHtml;
    document.querySelector(".habits-list").appendChild(habitEle);
  });
}

//#endregion

//logout functionality
document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.setItem("auth-token", "");
  window.location.href = "/login.html";
});

//add habit modal
const addHabitBtn = document.querySelector(".add-btn");
const addModalBackdrop = document.querySelector(".add-modal-backdrop");
const addModal = document.querySelector(".add-modal");

const closeModalBtn = document.querySelector(
  ".add-modal button.close-modal-btn"
);
const cancelModalBtn = document.querySelector(".add-modal button.cancel-btn");

function openModal() {
  addModalBackdrop.classList.add("show");
  addModal.classList.add("show");
}
function resetAddHabitForm(){
  //title
  addHabitForm.reset()
  //days picker
  daysPickerBtns.forEach((e,i)=>{
    if(i<5){
      e.classList.add("checked")
    }
    else{
      e.classList.remove("checked")
    }
  })}
function hideModal() {
  resetAddHabitForm()
  addModalBackdrop.classList.remove("show");
  addModal.classList.remove("show");
}
addHabitBtn.addEventListener("click", () => {
  openModal();
});

addModalBackdrop.addEventListener("click", () => {
  hideModal();
});
closeModalBtn.addEventListener("click", () => {
  hideModal();
});
cancelModalBtn.addEventListener("click", () => {
  hideModal();
});




//days picker
const daysPickerBtns = document.querySelectorAll(".days-picker button");
daysPickerBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.classList.toggle("checked");
  });
});



//add habit form handling

const addHabitForm = document.querySelector(".add-habit-form");

addHabitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = getAddFormData(e);

  sendAddHabitData(data)
  
  hideModal()
});

function getAddFormData(e) {
  let data = {
    title: "",
    repeatDays: [0, 0, 0, 0, 0, 0, 0],
    isReminderSet: false,
    reminderTime: "",
    isCompleted: false,
  };
  //title
  data.title = e.target["title-input"].value;
  //days on which to repeat stored in array(1 or 0) from monday to sunday
  daysPickerBtns.forEach((btn, i) => {
    if (btn.classList.contains("checked")) {
      data.repeatDays[i] = 1;
    }
  });
  
  return data;
}


function showValidationWarning(type){
  let isValid=true

  const titleWarning= document.querySelector("title-warning")
  const passwordWarning= document.querySelector("title-warning")

  titleWarning.classList.remove("show")
  passwordWarning.classList.remove("show")

  if(type==="title"){
   titleWarning.classList.add("show")
   isValid=false
  }
  if(type==="password"){
passwordWarning.classList.add("show")
isValid=false
}
  if(type==="reminderTime"){
    reminderTimeWarning.classList.add("show")
    isValid=false
  }
  return isValid
}

function sendAddHabitData(data) {
  showLoader(true)
  fetch(serverUrl + "/addhabit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
    body: JSON.stringify(data),
  }).then((r) => {
    
     return r.json();
    })
    .then((data) => {
      populateData([data])
      showLoader(false)
    });
}


//utilities
function showLoader(show=true){
if(show){
  document.querySelector(".loader-container").classList.add("show")

}
else{
  document.querySelector(".loader-container").classList.remove("show")

}
}
//alert 
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