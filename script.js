console.log("Connected");

const newsContainer = document.querySelector("#newsContainer");
const resultLength = document.querySelector("#searchResult");
const category = document.querySelector("#category");
const searchText = document.querySelector("#search-text");
const searchBtn = document.querySelector("#search-btn");

// load all news
async function loadNewsData() {
  try {
    const res = await fetch(
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=714ea53a47f7470899e9132f9ab13f82"
    );
    const news = await res.json();
    // fetch data
    resultLength.innerHTML = `${news.articles.length} Results`;
    displayResult(news.articles);
  } catch (error) {
    newsContainer.innerHTML = "Something Went Wrong";
  }
}

function displayResult(news) {
  news?.forEach(({ urlToImage, title, description, url, author }) => {
    newsContainer.innerHTML += `
  <div
  class="w-full lg:max-w-[375px] mx-auto h-fit relative space-y-4 group bg-gray-50 rounded-md overflow-hidden px-2 py-4 cursor-pointer"
>

  <div class="h-60 w-full px-2 mx-auto rounded-md overflow-hidden">
    <img
      class="h-full w-full object-cover hover:scale-125 transition-transform duration-500 rounded-md"
      src="${urlToImage || "https://i.postimg.cc/GmWVngBv/image.png"}"
    />
  </div>

  <div class="px-2">
    <p class="text-2xl font-semibold truncate">
     ${title}
    </p>
    <p class="max-h-28 text-justify leading-5">
     ${
       description.length > 170
         ? description.slice(0, 171) + "..."
         : description
     }<a href="${url}" target="_blank" class="hover:underline text-rose-600 px-4">See More</a>
     <span class="block"> - ${author}</span>
    </p>
  </div>
</div>
  `;
  });
}

searchBtn.addEventListener("click", async () => {
  const searchValue = searchText.value;
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=714ea53a47f7470899e9132f9ab13f82"
  );
  const news = await res.json();
  const result = await news.articles.filter((item) =>
    item.author.toLowerCase().startsWith(searchValue.trim().toLowerCase())
  );

  newsContainer.innerHTML = "";
  resultLength.innerHTML = `${result?.length} Results`;
  displayResult(result);
});

loadNewsData();
