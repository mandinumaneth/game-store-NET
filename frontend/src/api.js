// API utility for GameStore backend
const API_BASE = "http://localhost:5274"; // Updated to match backend

export async function fetchGames() {
  const res = await fetch(`${API_BASE}/games`);
  return res.json();
}

export async function fetchGenres() {
  const res = await fetch(`${API_BASE}/genres`);
  return res.json();
}

export async function createGame(game) {
  // Map frontend 'title' to backend 'name' and ensure genreId is a number
  const payload = {
    name: game.title,
    genreId: Number(game.genreId),
    price: Number(game.price),
    releaseDate: game.releaseDate || null,
  };
  const res = await fetch(`${API_BASE}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function updateGame(id, game) {
  // Map frontend 'title' to backend 'name' and ensure genreId is a number
  const payload = {
    name: game.title,
    genreId: Number(game.genreId),
    price: Number(game.price),
    releaseDate: game.releaseDate || null,
  };
  const res = await fetch(`${API_BASE}/games/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function deleteGame(id) {
  await fetch(`${API_BASE}/games/${id}`, { method: "DELETE" });
}

export async function createGenre(genre) {
  const res = await fetch(`${API_BASE}/genres`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(genre),
  });
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function updateGenre(id, genre) {
  const res = await fetch(`${API_BASE}/genres/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(genre),
  });
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function deleteGenre(id) {
  await fetch(`${API_BASE}/genres/${id}`, { method: "DELETE" });
}
