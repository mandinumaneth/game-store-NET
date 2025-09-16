import { useState } from "react";
import { createGenre, updateGenre } from "../api";

export default function GenreForm({ genre, onSuccess, onCancel }) {
  const [form, setForm] = useState(genre || { name: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await updateGenre(form.id, form);
    } else {
      await createGenre(form);
    }
    onSuccess();
  };

  return (
    <form className="p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">
        {form.id ? "Edit Genre" : "Add Genre"}
      </h2>
      <div className="mb-2">
        <label className="block mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
