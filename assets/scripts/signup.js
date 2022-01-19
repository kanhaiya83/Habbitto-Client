const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  console.log(userData);
  
  fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
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
});

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
//       //send the request to server to create the user
//       async function signUpUser(data) {
//         let response=await fetch("http://localhost:5000/signup",{
//           method:"POST",
//           headers:{
//             'Content-type':"application/json"
//           },
//           body:JSON.stringify(data)
//         })
//         res=await response.json()
//         console.log(res)
//       }
//       let signupForm = document.querySelector(".signup-form");
//       signupForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const userData = {
//           name: e.target.name.value.trim(),
//           password: e.target.password.value,
//           email: e.target.email.value.trim(),
//           mobileNumber: e.target.mobileNumber.value,
//         };
//         if (validateInputs(userData)) {
//           //send the data to server

//           signUpUser(userData);
//         }
//       });
    
