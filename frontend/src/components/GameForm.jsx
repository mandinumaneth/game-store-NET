import { useEffect, useState } from "react";
import { createGame, updateGame, fetchGenres } from "../api";

export default function GameForm({ game, onSuccess, onCancel }) {
  // Always initialize all fields for controlled inputs
  const initialForm = {
    id: game?.id || undefined,
    title: game?.title || game?.name || "",
    genreId: game?.genreId || "",
    price: game?.price || "",
    releaseDate: game?.releaseDate ? game.releaseDate.slice(0, 10) : "",
  };
  const [form, setForm] = useState(initialForm);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await updateGame(form.id, form);
    } else {
      await createGame(form);
    }
    onSuccess();
  };

  return (
    <form className="p-4 bg-gray-900 rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4 text-gray-100">
        {form.id ? "Edit Game" : "Add Game"}
      </h2>
      <div className="mb-2">
        <label className="block mb-1 text-gray-300">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border border-gray-700 bg-gray-950 text-gray-100 px-2 py-1 w-full rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 text-gray-300">Genre</label>
        <select
          name="genreId"
          value={form.genreId}
          onChange={handleChange}
          className="border border-gray-700 bg-gray-950 text-gray-100 px-2 py-1 w-full rounded"
          required
        >
          <option value="">Select genre</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block mb-1 text-gray-300">Price</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="border border-gray-700 bg-gray-950 text-gray-100 px-2 py-1 w-full rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 text-gray-300">Release Date</label>
        <input
          name="releaseDate"
          type="date"
          value={form.releaseDate}
          onChange={handleChange}
          className="border border-gray-700 bg-gray-950 text-gray-100 px-2 py-1 w-full rounded"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
