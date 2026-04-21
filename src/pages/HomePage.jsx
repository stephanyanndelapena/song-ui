import { useEffect, useMemo, useState } from "react";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { fetchSongs } from "../api/songApi";
import { AppShell } from "../components/AppShell";
import { SongGrid } from "../components/SongGrid";
import { WatchLayout } from "../components/WatchLayout";

export function HomePage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [activeSong, setActiveSong] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSongs();
        if (!cancelled) {
          setSongs(data);
          setActiveSong((prev) => prev ?? data?.[0] ?? null); // pick first by default
        }
      } catch (e) {
        if (!cancelled) setError(e?.message ?? "Failed to load songs");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return songs;

    return songs.filter((s) => {
      const hay = `${s.title} ${s.artist} ${s.album} ${s.genre}`.toLowerCase();
      return hay.includes(q);
    });
  }, [songs, query]);

  const upNext = useMemo(() => {
    if (!activeSong) return filtered;
    return [activeSong, ...filtered.filter((s) => s.id !== activeSong.id)];
  }, [filtered, activeSong]);

  return (
    <AppShell onSearch={setQuery}>
      {/* When a song is selected -> show Watch page */}
      {activeSong ? (
        <WatchLayout
          song={activeSong}
          upNext={upNext}
          onPick={setActiveSong}
          onBack={() => setActiveSong(null)}
        />
      ) : (
        <>
          <div className="flex items-end justify-between gap-4 mb-4">
            <Typography variant="h5" sx={{ fontWeight: 900, color: "white" }}>
              Songs
            </Typography>
            <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
              {filtered.length} result(s)
            </Typography>
          </div>

          {loading ? (
            <div className="py-16 flex justify-center">
              <CircularProgress />
            </div>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <SongGrid songs={filtered} onPick={(s) => setActiveSong(s)} />
          )}
        </>
      )}
    </AppShell>
  );
}