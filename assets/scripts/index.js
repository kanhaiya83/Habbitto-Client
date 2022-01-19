serverUrl = "https://habbitto-server.herokuapp.com" || "http://localhost:5000" ;


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
        document.querySelector(".loader-container").style.display = "none";
      });
  } else {
      window.location.href = "/login.html";
    
  }
});


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

  

//logout functionality
document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.setItem("auth-token", "");
  window.location.href = "/login.html";
});
