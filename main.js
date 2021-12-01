const cards = document.getElementById("cards");
const ul = document.createElement("ul");
ul.classList.add("ul", "ul_start", "ul_rowWrap");
cards.appendChild(ul);

const loader = document.querySelector("#loader");
const buttons = document.getElementsByTagName("button");
const whenLoading = document.getElementById("whenLoading");
const arrButtonNames = [];

// fetch
const getArrObjUsers = () => {
  const arrObjUsers = fetch(
    "https://randomuser.me/api/?results=20"
  )
    .then((request) => request.json())
    .then((obj) => obj.results)
    .catch((error) => console.log("fetch error =>", error));
  console.log("arrObjUsers -> ", arrObjUsers);
  return arrObjUsers;
};

let but3 = buttons[3].addEventListener("click", () =>
  changeImg("L")
);
let but4 = buttons[4].addEventListener("click", () =>
  changeImg("M")
);
let but5 = buttons[5].addEventListener("click", () =>
  changeImg("S")
);
let but6 = buttons[6].addEventListener("click", () =>
  addColorInCard()
);

for (let i = 0; i < 3; i++) {
  buttons[i].addEventListener("click", (e) => {
    const userGender = e.target.dataset.gender; // <button data-gender="female">...</button>
    loadUsersData(userGender);
  });
}

function loadUsersData(userGender) {
  clearingContent();
  getArrObjUsers()
    .then((arrObjUsers) =>
      filterUsers(arrObjUsers, userGender)
    )
    .then((filteredUsers) => {
      console.log("filteredUsers 2-> ", filteredUsers);

      filteredUsers.forEach((user) =>
        ul.appendChild(creatingUserCard(user))
      );
    })
    .then(() => loader.classList.add("loader__hidden")); //запускается это
}
function filterUsers(arrObjUsers, userGender) {
  console.log(
    " 1 arrObjUsers 1.1 userGender -->",
    arrObjUsers,
    userGender
  );

  if (userGender === "all") return arrObjUsers;

  return arrObjUsers.filter(
    (user) => user.gender === userGender
  );
}

function clearingContent() {
  // clearingImgUrls();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}
function creatingUserCard(user) {
  const imgL = document.createElement("img");
  imgL.src = user.picture.large;
  imgL.classList.add("L");

  const imgM = document.createElement("img");
  imgM.src = user.picture.medium;
  imgM.classList.add("M");
  imgM.classList.add("hidden");

  const imgS = document.createElement("img");
  imgS.src = user.picture.thumbnail;
  imgS.classList.add("S");
  imgS.classList.add("hidden");

  const h3 = document.createElement("h3");
  h3.textContent = `${user.name.first} ${user.name.last}`;
  const p = document.createElement("p");
  p.textContent = user.location.country;
  const p1 = document.createElement("p");
  p1.textContent = user.gender;

  const div_content = document.createElement("div");
  div_content.appendChild(h3);
  div_content.appendChild(p);
  div_content.appendChild(p1);
  div_content.classList.add("cardContent");

  const div__hidden = document.createElement("div");
  div__hidden.classList.add("cardContent", "hidden");
  div__hidden.data = "additional";
  div__hidden.innerHTML = `
  <p> email: ${user.email}</p>
  <p> Phone: ${user.phone}</p>
  <p> State: ${user.state}</p>
  (x)?<p> Age: ${user.dob.age}
   `;
  const dataAtr = document.createAttribute("data-atr");
  dataAtr.value = "expendCardData";
  div__hidden.setAttributeNode(dataAtr);

  const userCard = document.createElement("div");
  userCard.appendChild(imgL);
  userCard.appendChild(imgM);
  userCard.appendChild(imgS);
  userCard.appendChild(div_content);
  userCard.appendChild(div__hidden);
  userCard.classList.add("cardBox");
  userCard.classList.add(`cardBox--${user.gender}`);
  userCard.addEventListener("click", showBigCard);

  const card = document.createElement("li");
  card.appendChild(userCard);
  card.classList.add("card_margin");
  return card;
}

function changeImg(size) {
  const images = document.querySelectorAll(".cardBox img");
  console.log("all img class list ->");

  switch (size) {
    case "L":
      for (let i = 0; i < images.length; i++) {
        if (!images[i].classList.contains("L")) {
          images[i].classList.add("hidden");
        } else {
          images[i].classList.remove("hidden");
        }
      }
      break;
    case "M":
      for (let i = 0; i < images.length; i++) {
        if (!images[i].classList.contains("M")) {
          images[i].classList.add("hidden");
        } else {
          images[i].classList.remove("hidden");
        }
      }
      break;
    case "S":
      for (let i = 0; i < images.length; i++) {
        if (!images[i].classList.contains("S")) {
          images[i].classList.add("hidden");
        } else {
          images[i].classList.remove("hidden");
        }
      }
      break;
  }
}
function addColorInCard() {
  const cardsBox = document.querySelectorAll("div.cardBox");
  for (let i = 0; i < cardsBox.length; i++) {
    cardsBox[i].classList.toggle("colored");
  }
}

function showBigCard(e) {
  const userCard = e.currentTarget;
  console.log("userCard", userCard);
  userCard.classList.toggle("bigCard");
  if (userCard.classList.contains("bigCard")) {
    setTimeout(
      () => userCard.lastChild.classList.remove("hidden"),
      500
    );
  } else {
    userCard.lastChild.classList.add("hidden");
  }
}
