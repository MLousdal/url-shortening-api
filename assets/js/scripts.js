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
function validatUrl() {
  const urlValue = document.querySelector("#url").value;

  shortener.classList.remove("error");

  if (urlValue == null || urlValue.trim() == "") {
    shortener.classList.add("error");
  } else {
    shortenURL(urlValue);
  }
}


// Connect to API and return new link
function shortenURL(urlValue) {
  let api = "https://api.shrtco.de/v2/shorten";

  loading.style.display = "inline-block";
  submit.style.display = "none";
  
  fetch(api, {
    method: "POST",
    body: "url=" + encodeURIComponent(urlValue),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
  }
  })
  .then(response => response.json())
  .then(data => renderURL(data))
}

// Render the links as elementes on the page
function renderURL(data) {
  let short_link = data.result.full_short_link;
  let original_link = data.result.original_link;

  loading.style.display = "";
  submit.style.display = "";

  linkElm = `
  <div class="linkElm">
    <span class="orgLink">${short_link}</span>
    <div class="shortlink">
      <span>${original_link}</span>
      <button type="button" class="copy">Copy</button>
    </div>
  </div>
  `;

  shortSection.innerHTML += linkElm;
}