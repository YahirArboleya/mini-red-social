// src/utils/storage.js
export const getUsers = () =>
  JSON.parse(localStorage.getItem("mrs_users") || "[]");

export const saveUsers = (users) =>
  localStorage.setItem("mrs_users", JSON.stringify(users));

export const getPosts = () =>
  JSON.parse(localStorage.getItem("mrs_posts") || "[]");

export const savePosts = (posts) =>
  localStorage.setItem("mrs_posts", JSON.stringify(posts));

export const setCurrentUser = (user) =>
  localStorage.setItem("mrs_current_user", JSON.stringify(user));

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("mrs_current_user") || "null");

export const logoutUser = () =>
  localStorage.removeItem("mrs_current_user");

// Actualiza el usuario en el array y en la sesión
export const updateUser = (user) => {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    users[idx] = user;
    saveUsers(users);
    setCurrentUser(user);
  }
};
