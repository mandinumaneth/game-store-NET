import { useEffect, useState } from "react";
import { fetchGenres } from "../api";

export default function GenreList() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGenres = async () => {
    setLoading(true);
    setGenres(await fetchGenres());
    setLoading(false);
  };

  useEffect(() => {
    loadGenres();
  }, []);

  if (loading) return <div>Loading genres...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Genres</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.id} className="border-t">
              <td className="py-2">{genre.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
