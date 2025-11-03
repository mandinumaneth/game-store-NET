import React from "react";

export default function Navigation() {
  return (
    <nav className="bg-black bg-opacity-60 backdrop-blur-xl text-white px-6 py-5 shadow-2xl border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <span className="text-3xl filter drop-shadow-lg">🎮</span>
        <span className="font-bold text-3xl tracking-wide text-white drop-shadow-lg">
          Game Store
        </span>
      </div>
    </nav>
  );
}
