/**
 * Funciones CRUD para Jex y Vanne: Obtener detalle de un post (READ) y eliminar un post (DELETE)
 */

const fireBaseDB = "https://todo-list-ec668-default-rtdb.firebaseio.com/";

const post = {
  title: "Cafe con pan",
  description: "skdjghfkrsfjsdbchjdkgschbsdkhg",
};

const post1 = {
  title: "Cafe con leche",
  description: "dfgfdgd",
};

const createPost = (post) => {
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

const getAllPosts = () => {
  const posts = [];
  const url = `${fireBaseDB}articles.json`;
  fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      //console.log("data: ", data);
      const keys = Object.keys(data);
      //console.log("keys: ", keys);
      keys.forEach((key) => {
        let post = data[key];
        post.id = key;
        posts.push(post);
        //console.log("value", data[key]["description"]);
      });
    });
  return posts;
};

updatePost("-NGmn-xmrY2GbRnG4wQk", post1);
let allPosts = getAllPosts();
console.log("all posts: ", allPosts);
