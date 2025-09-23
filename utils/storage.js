// Funciones para manejar la lógica de almacenamiento en localStorage

export const getUsers = () => {
  try {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  } catch (e) {
    console.error("Error al obtener los usuarios de localStorage", e);
    return [];
  }
};

export const saveUsers = (users) => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (e) {
    console.error("Error al guardar los usuarios en localStorage", e);
  }
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error("Error al obtener el usuario actual de localStorage", e);
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } catch (e) {
    console.error("Error al establecer el usuario actual en localStorage", e);
  }
};

export const logoutUser = () => {
  try {
    localStorage.removeItem("currentUser");
  } catch (e) {
    console.error("Error al cerrar sesión", e);
  }
};

export const getAllPosts = () => {
  try {
    const posts = localStorage.getItem("posts");
    return posts ? JSON.parse(posts) : [];
  } catch (e) {
    console.error("Error al obtener las publicaciones de localStorage", e);
    return [];
  }
};

export const savePosts = (posts) => {
  try {
    localStorage.setItem("posts", JSON.stringify(posts));
  } catch (e) {
    console.error("Error al guardar las publicaciones en localStorage", e);
  }
};
