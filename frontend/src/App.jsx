import { useState } from "react";
import GameList from "./components/GameList";
import GameForm from "./components/GameForm";
import GenreList from "./components/GenreList";

function App() {
  // Only one page: games
  const [editingGame, setEditingGame] = useState(null);
  const [showGameForm, setShowGameForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Handlers for games
  const handleEditGame = (game) => {
    setEditingGame(game);
    setShowGameForm(true);
  };
  const handleCreateGame = () => {
    setEditingGame(null);
    setShowGameForm(true);
  };
  const handleGameFormSuccess = () => {
    setShowGameForm(false);
    setEditingGame(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen text-gray-100">
      <div className="max-w-[1600px] mx-auto mt-8 px-4">
        <main className="flex flex-col items-center min-h-[80vh]">
          <div className="w-full">
            <div className="mb-8 text-center">
              <h1 className="text-6xl font-extrabold text-white mb-4 drop-shadow-2xl tracking-tight">
                🎮 Game Store
              </h1>
              <p className="text-xl text-gray-100 drop-shadow-lg font-medium">
                Manage your epic games collection
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 backdrop-blur-lg border border-white/10">
              {showGameForm ? (
                <div className="max-w-2xl mx-auto">
                  <GameForm
                    game={editingGame}
                    onSuccess={handleGameFormSuccess}
                    onCancel={() => setShowGameForm(false)}
                  />
                </div>
              ) : (
                <GameList
                  key={refreshKey}
                  onEdit={handleEditGame}
                  onCreate={handleCreateGame}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
