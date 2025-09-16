import { useEffect, useState } from "react";
import { fetchGames, deleteGame, fetchGenres } from "../api";

export default function GameList({ onEdit, onCreate }) {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGames = async () => {
    setLoading(true);
    const [gamesData, genresData] = await Promise.all([
      fetchGames(),
      fetchGenres(),
    ]);
    setGames(gamesData);
    setGenres(genresData);
    setLoading(false);
  };

  useEffect(() => {
    loadGames();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    await deleteGame(id);
    loadGames();
  };

  const getGenreName = (genreId) => {
    const genre = genres.find((g) => Number(g.id) === Number(genreId));
    return genre ? genre.name : genreId || "";
  };

  if (loading)
    return (
      <div className="text-center py-8 text-lg text-gray-400 dark:text-gray-300">
        Loading games...
      </div>
    );

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Games</h2>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg shadow transition font-semibold"
          onClick={onCreate}
        >
          + Add Game
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-gray-900 text-sm text-gray-200">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-300">
                Title
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-300">
                Genre
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-300">
                Price
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-300">
                Release Date
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {games.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No games found.
                </td>
              </tr>
            ) : (
              games.map((game) => (
                <tr
                  key={game.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition"
                >
                  <td className="py-3 px-4">{game.name}</td>
                  <td className="py-3 px-4">{getGenreName(game.genreId)}</td>
                  <td className="py-3 px-4">${game.price}</td>
                  <td className="py-3 px-4">
                    {game.releaseDate
                      ? new Date(game.releaseDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      className="bg-yellow-900 hover:bg-yellow-800 text-yellow-200 px-3 py-1 rounded transition font-medium"
                      onClick={() => onEdit(game)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-900 hover:bg-red-800 text-red-200 px-3 py-1 rounded transition font-medium"
                      onClick={() => handleDelete(game.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
