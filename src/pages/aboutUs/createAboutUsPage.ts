import { createTitulAbout } from "../../helpers/creators/aboutUs/createAboutTitul";
import { MemberCardCreator } from "../../helpers/creators/aboutUs/createMembetCard";
require("../../helpers/creators/aboutUs/aboutUs.scss");

export function createAboutUsPage() {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const aboutProjectTitul = createTitulAbout("About our project");

  const descriptionText = document.createElement("div");
  descriptionText.classList.add("about_page_description");
  descriptionText.innerHTML = `RSshop is a store where you can buy delicious chocolate in a large assortment. A group of novice developers worked on the projector. 
  To optimize the development process, a discussion channel was created in which all members of the group participated in the discussion of the project implementation process. 
  The entire project was divided into 4 sprints, each of the sprints in turn was divided into smaller tasks.
  Before the start of each sprint, a team meeting was held to discuss the order of task completion and the distribution of roles in the team. 
  The results of the discussion were recorded on the Trello task board.
  During the project, the team members fully demonstrated their strengths in development. 
  Each team member was ready to help their teammates. We consider RShop a successful project!! The project was completed as part of training on the RSShool platform`;

  const logoWraper = document.createElement("a");
  logoWraper.href = "https://rs.school/";
  const logo = document.createElement("img");
  logo.classList.add("school_logo");
  logo.src =
    "https://yandex-images.clstorage.net/zC9t83z57/d50029Hu0/jG-nwYlbrj9bMFPI6xb_S6JdO_b9uZ8Udv26SZU6WAQhbdEdOqXK9GVxoBNQfTijo0VjgeyDh9lVBYfLqQBz2d1u8vTYTtcjWyQC5MIml3viCAuD8eyXcGbg3njV0_XV_KBpqKIVWxmNHa17USVdguZE32mJqq-N1DC3S2n9wiREky_ZGdNnS7P8JtQvBvtTJminrlmkM4XCmX_tgRMVcWQkSai6FftZ7VnlSyH16Bb2_DfEqW6vlWS057uNGUJsvLtzFZVbr0d_kL4YrwJTu5oIDwIl8G-tpmV_sVGP3UmY4A3cDilj_TldhRvhqSwC9rTvRGkKz9Xk2I-fBakWOGzXY42R01dvC5Qa4MMqH3P-7LMafcRHCdo9EzHFH0WBoLSByLq9F3mp5SHf8ZX0-r7ARyDpGh-1eCR_W_G55sDY84-13R_bY3vw2qBbHtdPeqSHlrVA62EmXQ9d2TtVNTAY2TyCqe85oZG9f5GNmNJ2nEOsXX5fcRC8P1uBPQbcxL-XtZmHU1s3FJJ4h6angxo0426J_AehbkX_lV0r0UVEhJlM0pEPdSntQReB_fQWhqQ_RK1m12E8APsX6XGKpKxrw0UxR_tP8_Am3KsKLw-O7NMeqUQDNYJNwxUxvz014My9EO6Zyw2Fncl7BQEAtgoQs6zR3lNFMFj3g3H98jg0Fx-BGUMLI3skTlgj-tMf7gDbLlmM_1VKQb_p-XuxieRMuVjWVWMJoRnxY_E9lHa-YGMwpWZXZTA8d3fF5YoMjKO7Jb07r7ejgP7kRwbfP4bgV54hPKs1zhHvHQ13xWlQDI2QWrVX9RXltdNF9ezmQkCvROmqG41wSM8L6Z12wKQrm3kFC6O_K3yKRD_O00N6sGuGOfAHmSrlG6mhi4UZyBCBrMqp4xWp_UErXQmcJqLAY_Q93muFVPSPO_m1YtBE96-xFXffW2OYLrzPmotXCqDnArkg-6my9QP1DSsw";
  logoWraper.append(logo);

  const IvanCard = MemberCardCreator(
    "Ivan",
    "./Ivan.jpg",
    "Team lead",
    "I am 28 years old. I have a higher education in chemical engineering and economics. I have been studying frontend since 2021. In 2023, I completed the JS/FE PRE-SCHOOL 2023Q2 (JAVASCRIPT) course.",
    "https://github.com/ivankritsckii",
  );
  const MartaCard = MemberCardCreator(
    "Marta",
    "./Marta.jpg",
    "Best in design",
    "Hello, I'm Marta. I recently graduated from university with a bachelor's degree in Software Engineering. Currently, I'm actively learning web development at The Rolling Scopes School. I also completed training at TUMOLabs. I'm ready for new challenges and growth in the field of web development",
    "https://github.com/marta109",
  );
  const DmitriyCard = MemberCardCreator(
    "Dmitriy",
    "./Dmitriy.jpeg",
    "Best in commercetools API",
    "My name is Dmitry, I am 30 years old. I hate writing about myself, but I love tapping my fingers on the keyboard. That's why I'm here 🙂",
    "https://github.com/amiln",
  );

  const aboutProjectMembersTitul = createTitulAbout("The project was made by");
  descriptionText.append(logoWraper);
  content.append(aboutProjectTitul, descriptionText, aboutProjectMembersTitul, IvanCard, MartaCard, DmitriyCard);
}
