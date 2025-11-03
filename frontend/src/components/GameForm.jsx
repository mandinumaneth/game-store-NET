import { useEffect, useState } from "react";
import {
  createGame,
  updateGame,
  fetchGenres,
  uploadImage,
  deleteImage,
} from "../api";

export default function GameForm({ game, onSuccess, onCancel }) {
  // Always initialize all fields for controlled inputs
  const initialForm = {
    id: game?.id || undefined,
    title: game?.title || game?.name || "",
    genreId: game?.genreId || "",
    price: game?.price || "",
    releaseDate: game?.releaseDate ? game.releaseDate.slice(0, 10) : "",
    imageUrl: game?.imageUrl || "",
  };
  const [form, setForm] = useState(initialForm);
  const [genres, setGenres] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(form.imageUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [originalImageUrl] = useState(game?.imageUrl || "");

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setForm({ ...form, imageUrl: "" });
    // Reset file input
    const fileInput = document.getElementById("imageInput");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalImageUrl = form.imageUrl;

      // If user selected a new image file
      if (imageFile) {
        // Delete old image if exists and updating
        if (originalImageUrl && form.id) {
          await deleteImage(originalImageUrl);
        }

        // Upload new image
        const uploadResult = await uploadImage(imageFile);
        finalImageUrl = `http://localhost:5274${uploadResult.imageUrl}`;
      }

      const gameData = { ...form, imageUrl: finalImageUrl };

      if (form.id) {
        await updateGame(form.id, gameData);
      } else {
        await createGame(gameData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving game:", error);
      alert("Failed to save game. Please try again.");
    } finally {
      setIsUploading(false);
    }
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
          style={{
            backgroundColor: "#030712",
            color: "#f3f4f6",
          }}
          required
        >
          <option
            value=""
            style={{ backgroundColor: "#030712", color: "#f3f4f6" }}
          >
            Select genre
          </option>
          {genres.map((g) => (
            <option
              key={g.id}
              value={g.id}
              style={{ backgroundColor: "#030712", color: "#f3f4f6" }}
            >
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

      {/* Image Upload Section */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-300 font-semibold">
          Game Image
        </label>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-3 relative inline-block">
            <img
              src={imagePreview}
              alt="Game preview"
              className="w-48 h-48 object-cover rounded border-2 border-gray-700"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold"
              title="Remove image"
            >
              ×
            </button>
          </div>
        )}

        {/* File Input */}
        {!imagePreview && (
          <div className="mb-2">
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-800 cursor-pointer"
            />
            <p className="text-gray-500 text-sm mt-1">
              Supported formats: JPG, PNG, GIF, WebP
            </p>
          </div>
        )}

        {/* Change Image Button */}
        {imagePreview && (
          <div className="mt-2">
            <label
              htmlFor="imageInput"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded cursor-pointer"
            >
              Change Image
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          disabled={isUploading}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isUploading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded"
          onClick={onCancel}
          disabled={isUploading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
