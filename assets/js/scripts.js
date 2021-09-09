// Toggle burgermenu
function burgerToggle() {
  const navLinks = document.querySelector("#nav-links");
  if (navLinks.style.display === "block") {
    navLinks.style.display = "";
  } else {
    navLinks.style.display = "block";
  }
}

// URL shortening functionality
const shortSection = document.querySelector("#shortSection");
const shortener = document.querySelector("#shortener");
const loading = document.querySelector(".spinner");
const submit = document.querySelector("#submit");

// Validate url input
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const urlValue = document.querySelector("#url").value;

  shortener.classList.remove("error");

  if (urlValue == null || urlValue.trim() == "") {
    shortener.classList.add("error");
  } else {
    loading.style.display = "inline-block";
    submit.style.display = "none";
    shortenURL(urlValue);
  }
});

// Connect to API and return new link
function shortenURL(urlValue) {
  let api = "https://api.shrtco.de/v2/shorten";

  fetch(api, {
    method: "POST",
    body: "url=" + encodeURIComponent(urlValue),
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((data) => renderURL(data));
}

// Render the links as elementes on the page
function renderURL(data) {
  let id = data.result.code;
  let short_link = data.result.full_short_link;
  let original_link = data.result.original_link;

  loading.style.display = "";
  submit.style.display = "";

  linkElm = `
  <div class="linkElm">
    <span class="orgLink">${original_link}</span>
    <div class="shortlink">
      <span id="${id}">${short_link}</span>
      <button type="button" class="copy" onclick="copyURL(${id})" id="${id}btn">Copy</button>
    </div>
  </div>
  `;

  shortSection.innerHTML += linkElm;
  let stateObj = { id: "100" };
  window.history.replaceState(stateObj, "", "");
}

function copyURL(id) {
  let shortLink = document.getElementById(id.id);
  let btn = document.getElementById(id.id + "btn");

  navigator.clipboard.writeText(shortLink.textContent).then(
    function () {
      if (btn.innerText == "Copy") {
        btn.innerText = "Copied!";
        btn.classList.add("sec-color");
      }
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
