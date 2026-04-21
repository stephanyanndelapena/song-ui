import { SongCard } from "./SongCard";

export function SongGrid({ songs, onPick }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {songs.map((s) => (
        <SongCard key={String(s.id)} song={s} onClick={onPick} />
      ))}
    </div>
  );
}