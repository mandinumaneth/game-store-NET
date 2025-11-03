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

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to upload image: ${res.status} ${errorText}`);
  }

  return res.json();
}

export async function deleteImage(imageUrl) {
  if (!imageUrl) return;

  // Extract filename from URL (e.g., "/images/abc123.jpg" -> "abc123.jpg")
  const fileName = imageUrl.split("/").pop();

  const res = await fetch(`${API_BASE}/api/images/${fileName}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    console.warn("Failed to delete image:", imageUrl);
  }
}

export async function createGame(game) {
  // Map frontend 'title' to backend 'name' and ensure genreId is a number
  const payload = {
    name: game.title,
    genreId: Number(game.genreId),
    price: Number(game.price),
    releaseDate: game.releaseDate || null,
    imageUrl: game.imageUrl || null,
  };
  console.log("Creating game with payload:", payload);
  const res = await fetch(`${API_BASE}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log("Create game response status:", res.status);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Create game error:", errorText);
    throw new Error(`Failed to create game: ${res.status} ${errorText}`);
  }
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
    imageUrl: game.imageUrl || null,
  };
  console.log("Updating game with payload:", payload);
  const res = await fetch(`${API_BASE}/games/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log("Update game response status:", res.status);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Update game error:", errorText);
    throw new Error(`Failed to update game: ${res.status} ${errorText}`);
  }
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
