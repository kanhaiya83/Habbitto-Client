serverUrl = "https://habbitto-server.herokuapp.com" || "http://localhost:5000" ;

//#region login page
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userCredentials = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  fetch(serverUrl+"/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
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
});

//#endregion
