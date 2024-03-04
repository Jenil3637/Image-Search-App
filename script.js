const accessKey = "UF47slAuK3NeGi0jB-qLCDRz5NJPngMqT9rzVcw1Aqk";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("Search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button")

let inputData = ""

// we are letting that default page no is 1, So that when user click on Show more button we can edit it and use it...
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imagelink = document.createElement('a');
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imagelink);
        searchResults.appendChild(imageWrapper);
        
    });

    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () =>{
    searchImages();
});