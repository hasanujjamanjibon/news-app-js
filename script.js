console.log("Connected");

const newsContainer = document.querySelector("#newsContainer");
const resultLength = document.querySelector("#searchResult");
const category = document.querySelector("#category");

// load all news
async function loadNewsData() {
  try {
    const res = await fetch("./news.json");
    const news = await res.json();

    // fetch name
    news.forEach((element) => {
      category.innerHTML += `
      <p class="bg-gray-100 block rounded-md  min-w-min px-10 py-1 border-2">${element?.source?.name}</p>
      `;
    });

    // fetch data
    resultLength.innerHTML = `${news.length} Results`;
    news?.forEach(({ urlToImage, title, description, url }) => {
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
       ${description}<a href="${url}" target="_blank" class="hover:underline text-rose-600 px-4">See More</a>
      </p>
    </div>
  </div>
    `;
    });
  } catch (error) {
    newsContainer.innerHTML = "Something Went Wrong";
  }
}

loadNewsData();
