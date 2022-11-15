/**
 * Funciones CRUD para Jex y Vanne: Obtener detalle de un post (READ) y eliminar un post (DELETE)
 */

//
//https://todo-list-ec668-default-rtdb.firebaseio.com/

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

const createPost = (post, sentCallback) => {
  // Se agraga la fecha para poder hacer el filtrado más adelante
  post.creationDate = new Date(Date.now());
  const url = `${fireBaseDB}articles.json`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) =>{
        sentCallback();
        console.log("data: ", data);
    }) 
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
