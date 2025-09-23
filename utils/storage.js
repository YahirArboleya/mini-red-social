// ================================
// Manejo de Usuarios
// ================================

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

export const registerUser = (username, email, password) => {
  const users = getUsers();
  const exists = users.some((u) => u.email === email);
  if (exists) {
    return { success: false, message: "El email ya está registrado." };
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
    joined: new Date().toLocaleDateString(),
    bio: "",
    avatar: "",
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
};

export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return { success: false, message: "Credenciales incorrectas." };
  }
  setCurrentUser(user);
  return { success: true, user };
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error("Error al obtener el usuario actual", e);
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } catch (e) {
    console.error("Error al guardar el usuario actual", e);
  }
};

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
    console.error("Error al obtener publicaciones", e);
    return [];
  }
};

export const savePosts = (posts) => {
  try {
    localStorage.setItem("posts", JSON.stringify(posts));
  } catch (e) {
    console.error("Error al guardar publicaciones", e);
  }
};

export const createPost = (content, author, image = null) => {
  const posts = getAllPosts();
  const newPost = {
    id: Date.now(),
    content,
    author,
    image,
    date: new Date().toLocaleString(),
    likes: [],
    comments: [],
  };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
};

// ================================
// Likes únicos
// ================================

export const toggleLike = (postId, userId) => {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.id === postId);
  if (index >= 0) {
    const post = posts[index];
    if (!post.likes) post.likes = [];

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      post.likes.push(userId);
    }

    posts[index] = post;
    savePosts(posts);
    return post;
  }
  return null;
};

// ================================
// Comentarios
// ================================

export const addComment = (postId, comment) => {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.id === postId);
  if (index >= 0) {
    const post = posts[index];
    if (!post.comments) post.comments = [];
    post.comments.push(comment);

    posts[index] = post;
    savePosts(posts);
    return post;
  }
  return null;
};
