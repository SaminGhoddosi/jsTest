const homePage = document.getElementById("homePage");
const aboutPage = document.getElementById("aboutPage");
const contactPage = document.getElementById("contactPage");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");

function hideAll() {
    homePage.classList.remove("visible");
    aboutPage.classList.remove("visible");
    contactPage.classList.remove("visible");
}

function showHome() {
    hideAll();
    resultsContainer.style.display = "none";
    homePage.classList.add("visible");
}

function showAbout() {
    hideAll();
    resultsContainer.style.display = "none";
    aboutPage.classList.add("visible");
}

function showContact() {
    hideAll();
    resultsContainer.style.display = "none";
    contactPage.classList.add("visible");
}

function resetSearch() {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
    resultsContainer.style.display = "none";
}


async function search() {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) return;

    const response = await fetch("travel_recommendation_api.json");
    const data = await response.json();

    let results = [];

    if (keyword.includes("beach")) {
        results = data.beaches;
    }

    else if (keyword.includes("temple")) {
        results = data.temples;
    }

    else if (keyword.includes("country") || keyword.includes("countries")) {
        data.countries.forEach(country => {
            country.cities.forEach(city => results.push(city));
        });
    }

    if (results.length === 0) {
        resultsContainer.innerHTML = "<h2>No results found.</h2>";
        resultsContainer.style.display = "block";
        return;
    }

    displayResults(results);
}

function displayResults(list) {
    resultsContainer.innerHTML = "";  
    resultsContainer.style.display = "block";

    list.forEach(item => {
        const card = document.createElement("div");
        card.style.margin = "20px 0";
        card.style.padding = "15px";
        card.style.border = "1px solid #ccc";
        card.style.borderRadius = "10px";
        card.style.background = "#f8f8f8";

        card.innerHTML = `
            <img src="${item.imageUrl}" style="width:300px; border-radius:10px;">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
        `;

        resultsContainer.appendChild(card);
    });
}
