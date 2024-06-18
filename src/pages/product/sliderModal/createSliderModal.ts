export function createSliderModal(slider: HTMLElement): void {
  const content = document.getElementById("content") as HTMLDivElement;
  const modalWrapper: HTMLDivElement = document.createElement("div");
  modalWrapper.className = "modalWrapper";
  const modalContent: HTMLDivElement = document.createElement("div");
  modalContent.className = "modalContent";

  const closeModal: HTMLButtonElement = document.createElement("button");
  closeModal.className = "close-modal";
  closeModal.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  modalContent.append(closeModal, slider);
  modalWrapper.append(modalContent);
  content.append(modalWrapper);

  closeModal.addEventListener("click", () => {
    modalWrapper.classList.remove("active");
  });

  modalWrapper.addEventListener("click", (event) => {
    if (event.target === modalWrapper) {
      modalWrapper.classList.remove("active");
    }
  });
}
