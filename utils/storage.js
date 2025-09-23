// ================================
// Manejo de Usuarios
// ================================

// Obtener todos los usuarios
export const getUsers = () => {
  try {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  } catch (e) {
    console.error("Error al obtener los usuarios de localStorage", e);
    return [];
  }
};

// Guardar usuarios
export const saveUsers = (users) => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (e) {
    console.error("Error al guardar los usuarios en localStorage", e);
  }
};

// Registrar un nuevo usuario
export const registerUser = (username, email, password) => {
  const users = getUsers();

  // Verificar si ya existe el email
  const exists = users.some((u) => u.email === email);
  if (exists) {
    return { success: false, message: "El email ya está registrado." };
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password, // ⚠️ Nota: en producción deberías encriptar esto
    joined: new Date().toLocaleDateString(),
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
};

// Iniciar sesión
export const loginUser = (email, password) => {
  const users = getUsers();

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return { success: false, message: "Credenciales incorrectas." };
  }

  setCurrentUser(user);
  return { success: true, user };
};

// Obtener usuario actual
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error("Error al obtener el usuario actual de localStorage", e);
    return null;
  }
};

// Establecer usuario actual
export const setCurrentUser = (user) => {
  try {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } catch (e) {
    console.error("Error al establecer el usuario actual en localStorage", e);
  }
};

// Cerrar sesión
export const logoutUser = () => {
  try {
    localStorage.removeItem("currentUser");
  } catch (e) {
    console.error("Error al cerrar sesión", e);
  }
};

// ================================
// Manejo de Posts
// ================================
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

// Crear un nuevo post
export const createPost = (content, author) => {
  const posts = getAllPosts();

  const newPost = {
    id: Date.now(),
    content,
    author,
    date: new Date().toLocaleString(),
  };

  posts.unshift(newPost); // lo agregamos al inicio para que sea más reciente
  savePosts(posts);

  return newPost;
};
