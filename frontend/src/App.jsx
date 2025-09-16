import { useState } from "react";
import GameList from "./components/GameList";
import GameForm from "./components/GameForm";
import GenreList from "./components/GenreList";
import Navigation from "./components/Navigation";

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
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navigation />
      <div className="max-w-3xl mx-auto mt-8">
        <main className="flex flex-col items-center min-h-[80vh]">
          <div className="w-full max-w-3xl">
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-gray-100 mb-2">
                Game Store
              </h1>
              <p className="text-gray-400">
                Manage your games collection below.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl shadow p-6">
              {showGameForm ? (
                <GameForm
                  game={editingGame}
                  onSuccess={handleGameFormSuccess}
                  onCancel={() => setShowGameForm(false)}
                />
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
