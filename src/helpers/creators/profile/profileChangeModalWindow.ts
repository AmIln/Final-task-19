export function ProfileChangeModalWindow(isSucsessCahnge: boolean, title: string, textMessage: string) {
  const modalWindow = document.createElement("div");
  modalWindow.classList.add("profile_save_modal_window");
  if (isSucsessCahnge) {
    modalWindow.style.background = "green";
  } else {
    modalWindow.style.background = "red";
  }
  let timer = 1000;
  if (!isSucsessCahnge) timer = 5000;
  modalWindow.innerHTML = `<br>${title}</br> ${textMessage}`;
  document.body.append(modalWindow);
  setTimeout(() => {
    modalWindow.style.display = "none";
  }, timer);
}
