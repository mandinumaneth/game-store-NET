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
      <div className="text-center py-8 text-lg text-gray-300">
        Loading games...
      </div>
    );

  return (
    <div>
      {/* Add Game Button at Top */}
      <div className="flex justify-end mb-6">
        <button
          onClick={onCreate}
          className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg shadow-lg transition font-semibold transform hover:scale-105"
        >
          + Add New Game
        </button>
      </div>

      {games.length === 0 ? (
        <div className="text-center py-16 text-gray-300 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm">
          <p className="text-xl mb-4">No games found</p>
          <button
            onClick={onCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Add Your First Game
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/50"
            >
              <div className="relative h-48 bg-gray-900 overflow-hidden">
                {game.imageUrl ? (
                  <img
                    src={game.imageUrl}
                    alt={game.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Use a simple gradient fallback instead of external placeholder
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                          <span class="text-6xl opacity-30">🎮</span>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <span className="text-6xl opacity-30">🎮</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                  LKR {game.price.toLocaleString()}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 truncate">
                  {game.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="font-semibold text-purple-400">
                      {getGenreName(game.genreId)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-300">
                    <span className="text-gray-400">Released:</span>
                    <span className="ml-1">
                      {game.releaseDate
                        ? new Date(game.releaseDate).toLocaleDateString()
                        : "Not set"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-1 border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition font-medium"
                    onClick={() => onEdit(game)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-1 border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition font-medium"
                    onClick={() => handleDelete(game.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
