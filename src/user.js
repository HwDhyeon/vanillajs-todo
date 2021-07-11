const userText = document.querySelector(".user");
const userForm = document.querySelector(".user-form");
const userInput = userForm.querySelector(".user-input");

const saveUsername = (username) => {
  localStorage.setItem("username", username);
};

const readUsername = () => {
  return localStorage.getItem("username");
};

const setUsername = (username) => {
  userForm.classList.add("hide");
  userText.classList.remove("hide");
  userText.innerText = `Hi, ${username}`;
};

const handleUserFormSubmit = (event) => {
  event.preventDefault();

  const username = userInput.value;
  if (username) {
    userInput.value = "";
    saveUsername(username);
    setUsername(username);
  }
};

const handleUserTextClick = () => {
  userForm.classList.remove("hide");
  userText.classList.add("hide");
  userInput.focus();
  saveUsername("");
};

userForm.addEventListener("submit", handleUserFormSubmit);
userText.addEventListener("click", handleUserTextClick);

(() => {
  const username = readUsername();
  if (username) {
    setUsername(username);
  }
})();
