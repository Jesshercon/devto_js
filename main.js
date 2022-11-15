/**
 * Funciones CRUD para Jex y Vanne: Obtener detalle de un post (READ) y eliminar un post (DELETE)
 */

const fireBaseDB = "https://devto-5a011-default-rtdb.firebaseio.com/";

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

// Funcion de filtardo de fechas

const filtrarFechas = (timePeriod, posts) => {
  console.log("inicio");
  const now = new Date(Date.now());
  let oldestDate = 0;
  if (timePeriod === "semana") {
    oldestDate = now.setDate(now.getDate() - 7);
  } else if (timePeriod === "mes") {
    oldestDate = now.setMonth(now.getMonth() - 1);
  } else if (timePeriod === "año") {
    oldestDate = now.setFullYear(now.getFullYear() - 1);
  }

  const filteredPosts = posts.filter((post) => post.creationDate > oldestDate);
  console.log(filteredPosts);

  return filteredPosts;
};

//updatePost("-NGmn-xmrY2GbRnG4wQk", post1);
// let allPosts = getAllPosts();
// console.log(allPosts);

// const ultimaSemana = setTimeout(()=>filtrarFechas('semanas', allPosts), 5000)

//Creating 20 posts + rating

const createFakePosts = () => {
  for (let index = 1; index <= 20; index++) {
    createPost({
      title: "Post" + index,
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit veniam fugiat consequatur sapiente deleniti aperiam labore provident at nobis dolorum veritatis, magnam nostrum iusto consectetur et excepturi rem nulla sed.",
      rating: String(Math.floor(Math.random() * 5)),
    });
  }
};

//Main function

const main = async () => {
  let allPosts = [];
  allPosts = await getAllPosts();

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

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value;
    console.log("search", searchPosts(searchTerm));
  });
};

main();
