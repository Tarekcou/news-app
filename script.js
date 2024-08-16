const api_key = "30cb82d0e7374199be1f612c4437414f"
const blogContainer = document.getElementById("blog-container")
const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const spinner=document.getElementById("spinner");
async function fetchNews(query) {
  // https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=837ad1ef90634598b6b668240af50e7f
  spinner.style.visibility="visible";
  try {
    const api_Url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=15&apikey=${api_key}`;
    const response = await fetch(api_Url);

    const data = await response.json();
    console.log(response)
    spinner.style.visibility="hidden";
    spinner.style.display="none";
    return data.articles

  }
  catch (error) {
    
    console.error("Error fetching random news" + error)
    return [];
  }
}
searchBtn.addEventListener("click", async () => {
  spinner.style.visibility="visible";
  spinner.style.display="";
  const query = search.value.trim();
  if (query !== "") {
    try {

      fetchNews(query)
      const articles = await fetchNewsQuery(query);
      displayBlocks(articles);
      
    }
    catch (error) {
      console.log("error search",error)
    }
  }
})
async function fetchNewsQuery(query) {
    // https://newsapi.org/v2/everything?q=tesla&from=2024-07-15&sortBy=publishedAt&apiKey=837ad1ef90634598b6b668240af50e7f

  try {
    console.log(query)
    const api_Url = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&sortBy=publishedAt&apiKey=${api_key}`;
    const response = await fetch(api_Url);
    const data = await response.json();
    spinner.style.visibility="hidden";
    spinner.style.display="none"
    console.log(data)
    return data.articles 

  }
  catch (error) {
    
    console.error("Error fetching random news" + error)
    return [];
  }
}

function displayBlocks(articles) {
  // footer.style.visibility="visible";
  blogContainer.innerHTML = "";
  console.log(articles)
  articles.forEach(article => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blogCard");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    img.classList.add("cardImg")
    const title = document.createElement("h2");
    const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30)+"...": article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    const truncatedDes = article.description.length > 120 ? article.title.slice(0,120)+"...": article.title;
    description.textContent = truncatedDes;

    blogCard.appendChild(img)
    blogCard.appendChild(title)
    blogCard.appendChild(description)


    blogContainer.appendChild(blogCard)

    blogCard.addEventListener("click", () =>{
      window.open(article.url,"_blank")
    })

    
  });
}
// fetchNews();
(async () => {
  try {
    const articles = await fetchNews()
        // console.log(articles)
    
    displayBlocks(articles)
  }
  catch (error) {
    console.error("errro found", error);
  }
})();