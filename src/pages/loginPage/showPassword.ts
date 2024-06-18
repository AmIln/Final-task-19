export const showPassword = () => {
  const icon = document.querySelector(".password-icon");
  const inputBox = document.querySelectorAll(".input-box");
  const input = inputBox[1]?.querySelector("input");

  icon?.addEventListener("click", () => {
    if (input) {
      if (input.type == "password") {
        icon.innerHTML = '<i class="fa-solid fa-eye"></i>';
        input.type = "text";
      } else {
        input.type = "password";
        icon.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      }
    }
  });
};
