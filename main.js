/**
 * Funciones CRUD para Jex y Vanne: Obtener detalle de un post (READ) y eliminar un post (DELETE)
 */

//https://devto-5a011-default-rtdb.firebaseio.com/

const fireBaseDB = "https://todo-list-ec668-default-rtdb.firebaseio.com/";

const post = {
  title: "Cafe con pan",
  description: "skdjghfkrsfjsdbchjdkgschbsdkhg",
  date: "2022/11/14",
};

const post1 = {
  title: "Cafe con leche",
  description: "dfgfdgd",
  date: "2022/11/01",
};

const createPost = (post) => {
  // Se agraga la fehca para poder hacer el filtrado más adelante
  post.creationDate = new Date(Date.now());
  const url = `${fireBaseDB}articles.json`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => console.log("data: ", data));
};

const getPost = (id) => {
  const url = `${fireBaseDB}articles/${id}.json`;
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

const deletePost = (id) => {
  const url = `${fireBaseDB}articles/${id}.json`;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

const updatePost = (id, newData) => {
  const url = `${fireBaseDB}articles/${id}.json`;
  fetch(url, { method: "PUT", body: JSON.stringify(newData) })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

const getAllPosts = async () => {
  const posts = [];
  const url = `${fireBaseDB}articles.json`;
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  //console.log("data: ", data);
  const keys = Object.keys(data);
  //console.log("keys: ", keys);
  keys.forEach((key) => {
    let post = data[key];
    post.id = key;
    post.creationDate = new Date(post.creationDate);
    posts.push(post);
    //console.log("value", data[key]["description"]);
  });
  return posts;
};

//updatePost("-NGmn-xmrY2GbRnG4wQk", post1);
// let allPosts = getAllPosts();
// console.log(allPosts);

// const ultimaSemana = setTimeout(()=>filtrarFechas('semanas', allPosts), 5000)

//Creating 20 posts + rating

// const createFakePosts = () => {
//   for (let index = 1; index <= 20; index++) {
//     createPost({
//       title: "Post" + index,
//       description:
//         " Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit veniam fugiat consequatur sapiente deleniti aperiam labore provident at nobis dolorum veritatis, magnam nostrum iusto consectetur et excepturi rem nulla sed.",
//       rating: String(Math.floor(Math.random() * 5)),
//     });
//   }
// };

//-- Functions for creating the HTML
const createdoc = (title, description, creationDate) => {

  const nombre = title;
  const texto = description;
  const hashtags = ["javascript", "react", "webdev", "opensource"] 
  const userImage = "https://i.pravatar.cc/90?image=50"
  const userName = "IroncladDev"
  const postCreationDate = creationDate

  const article = document.createElement("article");
  article.classList.add("card", "justify-content-center");
  article.setAttribute("onclick", "window.location.href='./post.html'")

  const img = document.createElement("img");
  img.src =
    "https://res.cloudinary.com/practicaldev/image/fetch/s--T9V-4Pl3--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cc1iscwbl7v1o0ggbkfe.png";
  img.classList.add("card-img-top");
  article.appendChild(img);

  let divCardBody = document.createElement("div")
  divCardBody.classList.add("card-body")

  // Creacion de Usuario
  let divCardUser = document.createElement("div")
  divCardUser.classList.add("d-flex", "align-items-center", "mb-4")

  // Creacion de Avatar
  let userAvatar = document.createElement("a")
  let userAvatarImage = document.createElement("img")
  userAvatarImage.src = userImage
  userAvatarImage.alt = ""
  userAvatarImage.width = 40
  userAvatarImage.classList.add("rounded-circle", "me-2", "d-inline-block")

  userAvatar.appendChild(userAvatarImage)
  divCardUser.appendChild(userAvatar)

  let userAvatarNameContainer = document.createElement('div')
  let userAvatarName = document.createElement('a')
  userAvatarName.href = ""
  userAvatarName.classList.add("fw-bold", "link-dark", "text-decoration-none")
  userAvatarName.innerText = userName
  userAvatarNameContainer.appendChild(userAvatarName)

  let creationDateContainer = document.createElement("div")
  creationDateContainer.classList.add("text-xs", "text-gray")
  creationDateContainer.innerText = "Posten on " + postCreationDate.getMonth() + " " + postCreationDate.getDate()
  userAvatarNameContainer.appendChild(creationDateContainer)

  divCardUser.appendChild(userAvatarNameContainer)
  divCardBody.appendChild(divCardUser)

  let divCardInfo = document.createElement("div")
  divCardInfo.classList.add("div", "div__container_info", "g-col-6", "offset-md-1")
  

  // Creacion del título de la publicación
  let postTitle = document.createElement("h4")
  postTitle.classList.add("card-title")
  postTitle.innerText = nombre
  divCardInfo.appendChild(postTitle)


  // Creacion de hashtags
  let postHashtags = document.createElement("div")
  postHashtags.classList.add("card__tags", "card__tags-links", "text")
  hashtags.forEach((hashtag) => {
    let hashtagElement = document.createElement("a")
    hashtagElement.classList.add("text-decoration-none", "link-dark", "p-1")
    hashtagElement.href = ""
    hashtagElement.innerText = "#" + hashtag
    postHashtags.appendChild(hashtagElement)
  })
  divCardInfo.appendChild(postHashtags)


  // Creacion de descripcion de la publicacion
  let cardText = document.createElement('p')
  cardText.classList.add("card-text")
  cardText.innerText = texto

  let lastUpdated = document.createElement('small')
  lastUpdated.classList.add("text-muted")
  lastUpdated.innerText = " Last updated 3 mins ago"
  cardText.appendChild(lastUpdated)

  divCardInfo.appendChild(cardText)


  // Creacion de footer de la publicacion
  let postFooter = document.createElement("footer")
  postFooter.classList.add("comment__footer", "print-hidden", "d-flex", "justify-content-between", "gap-1", "mt-3")
  

  //article.addEventListener("click", () => (window.location = "./post.html"));

  const post = `    
      <div class="comment__footer-icon">
      <button class="btn btn-light btn-sm mr-1 reaction-like inline-flex">
      <svg class="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
      </svg>
      <span data-testid="tooltip" class="crayons-tooltip__content">
      71 Reactions
      </span>
      </button>

      <button class="btn btn-light btn-sm actions toggle-reply-form mr-1 inline-flex" href="#/ironcladdev/the-greatest-skill-issue-of-all-time-building-my-first-typescript-application-3g84/comments/new/21hd8">
      <svg class="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
      </svg>
      <span class="hidden m:inline-block">4 Comments</span>
      </button>
      </div>
      
      <div class="div div__container-save">
      <small class="small__container-read">4 min read</small>
      <button class="btn btn-light btn-sm mr-1 reaction-like inline-flex">
      <svg class="crayons-icon c-btn__icon" aria-hidden="true" focusable="false" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.75 4.5h10.5a.75.75 0 0 1 .75.75v14.357a.375.375 0 0 1-.575.318L12 16.523l-5.426 3.401A.375.375 0 0 1 6 19.607V5.25a.75.75 0 0 1 .75-.75zM16.5 6h-9v11.574l4.5-2.82 4.5 2.82V6z"></path>
      </svg>
      </button>
      </div>`;


  postFooter.innerHTML = post
  divCardInfo.appendChild(postFooter)
  divCardBody.appendChild(divCardInfo)
  article.appendChild(divCardBody)
  console.log('article: ', article)

  document.getElementById("prueba").appendChild(article);
};

//Main function

const main = async () => {
  let allPosts = [];
  allPosts = await getAllPosts();

  allPosts.forEach((post) => {
    createdoc(post.title, post.description, post.creationDate);
  });

  //Search posts
  const searchPosts = (searchTerm) => {
    if (searchTerm != "") {
      return allPosts.filter((post) => {
        if (post.title.includes(searchTerm)) {
          return true;
        }
        return false;
      });
    }
  };

  // Funcion de filtardo de fechas
  const filterByDate = (timePeriod) => {
    const now = new Date(Date.now());
    let oldestDate = 0;
    if (timePeriod === "semana") {
      oldestDate = now.setDate(now.getDate() - 7);
    } else if (timePeriod === "mes") {
      oldestDate = now.setMonth(now.getMonth() - 1);
    } else if (timePeriod === "año") {
      oldestDate = now.setFullYear(now.getFullYear() - 1);
    }

    return (filteredPosts = allPosts.filter(
      (post) => post.creationDate > oldestDate
    ));
  };

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value;
    console.log("search", searchPosts(searchTerm));
  });
};

main();
