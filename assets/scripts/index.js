

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
    let habitInnerHtml = `<div class="icon">
            <img src="./assets/images/${
              habitObj.isCompleted ? "checked" : "waiting"
            }.svg" alt="" />
          </div>
          <div class="wrapper">
            <div class="title"><span>${habitObj.title}</span></div>
            <div class="repeat-info">
              <img src="./assets/images/repeat.svg" alt="" />
              <span>Repeat Everyday</span>
            </div>
          </div>
          <div class="time">
            <span>05:30 AM</span>
          </div>`;
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
  })
  //set reminder checkbox
  customCheckbox.classList.remove("checked")
  //reminder time input
  document.querySelector(".reminder-time-input").value="12:00"
  //hide reminder time input
  document
    .querySelector(".reminder-time-input-wrapper")
    .classList.remove("show");
}
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

//custom checkbox in add add habit modal
const customCheckbox = document.querySelector(".custom-checkbox");
customCheckbox.addEventListener("click", () => {
  customCheckbox.classList.toggle("checked");
  document
    .querySelector(".reminder-time-input-wrapper")
    .classList.toggle("show");
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
  //is reminder set
  if (customCheckbox.classList.contains("checked")) {
    data.setReminder = true;
    //reminder time
    inputTime = document.querySelector("input.reminder-time-input").value.split(":");
    let currDate = new Date();
    currDate.setHours(inputTime[0]);
    currDate.setMinutes(inputTime[1]);
    currDate.setSeconds("0");
    data.reminderTime = currDate.getTime();
  }
  return data;
}


function showValidationWarning(type){
  let isValid=true

  const titleWarning= document.querySelector("title-warning")
  const passwordWarning= document.querySelector("title-warning")
  const reminderTimeWarning= document.querySelector("title-warning")

  titleWarning.classList.remove("show")
  passwordWarning.classList.remove("show")
  reminderTimeWarning.classList.remove("show")

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