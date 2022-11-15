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
  // Se agraga la fehca para poder hacer el filtrado más adelante
  post.creationDate = new Date(Date.now())
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

const getAllPosts = (callback) => {
  const url = `${fireBaseDB}articles.json`;
  fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      const posts = []
      //console.log("data: ", data);
      const keys = Object.keys(data);
      //console.log("keys: ", keys);
      keys.forEach((key) => {
        let post = data[key];
        post.id = key;
        post.creationDate = new Date(post.creationDate)
        posts.push(post);
        //console.log("value", data[key]["description"]);
      });
      callback(posts)
    });
};

// Funcion de filtardo de fechas 

const filtrarFechas = (timePeriod, posts) => {
  console.log('inicio')
  const now = new Date(Date.now())
  let oldestDate = 0
  if(timePeriod === 'semana'){
    oldestDate = now.setDate(now.getDate() - 7)
  } else if (timePeriod === 'mes') {
    oldestDate = now.setMonth(now.getMonth() -1)    
  } else if (timePeriod === 'año') {
    oldestDate = now.setFullYear(now.getFullYear() -1)
  }

  const filteredPosts = posts.filter((post) => post.creationDate > oldestDate)
  console.log(filteredPosts)

  return filteredPosts
}



//updatePost("-NGmn-xmrY2GbRnG4wQk", post1);
let allPosts = getAllPosts((posts) => {
  const postsFiltrados = filtrarFechas('semana', posts)

});

console.log(allPosts)

//const ultimaSemana = setTimeout(filtrarFechas, 5000, 'semanas', allPosts)
//diego