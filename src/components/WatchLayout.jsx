import { Box, Typography, Chip, Stack, Button } from "@mui/material";
import { isYouTubeUrl, toYouTubeEmbedUrl, youTubeThumbnail } from "../utils/video.js";

function UpNextItem({ song, active, onPick }) {
  const thumb = youTubeThumbnail(song.url);

  return (
    <button
      onClick={() => onPick(song)}
      className={`w-full text-left rounded-xl p-3 transition ${
        active ? "bg-[#1f1f1f]" : "hover:bg-[#1a1a1a]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-32 aspect-video bg-black rounded-lg overflow-hidden shrink-0">
          {thumb ? (
            <img
              src={thumb}
              alt={song.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="font-extrabold truncate">{song.title}</div>
          <div className="text-sm text-gray-300 truncate">{song.artist}</div>
          <div className="text-sm text-gray-400 truncate">{song.album}</div>
          <div className="mt-2">
            <span className="inline-block text-xs px-2 py-1 rounded-full bg-black/60 border border-white/10">
              {song.genre}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export function WatchLayout({ song, upNext, onPick, onBack }) {
  const videoUrl = song?.url ?? "";
  const youTubeEmbed = videoUrl && isYouTubeUrl(videoUrl) ? toYouTubeEmbedUrl(videoUrl) : null;

  return (
    <Box>
      {/* Existing Back button moved to LEFT side below "SongTube" */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button variant="outlined" onClick={onBack} sx={{ borderRadius: 999 }}>
          Back
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          alignItems: "start",
        }}
      >
        {/* LEFT: Player */}
        <Box>
          <Box className="w-full aspect-video bg-black rounded-2xl overflow-hidden">
            {youTubeEmbed ? (
              <iframe
                key={youTubeEmbed}
                src={youTubeEmbed}
                title={song?.title ?? "YouTube Player"}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <video key={videoUrl} src={videoUrl} controls autoPlay className="h-full w-full" />
            )}
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 900, mt: 2 }}>
            {song?.title}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
            <Chip label={song?.artist} />
            <Chip label={song?.album} variant="outlined" />
            <Chip label={song?.genre} color="primary" />
          </Stack>
        </Box>

        {/* RIGHT: Up next */}
        <Box
          sx={{
            borderRadius: 3,
            border: "1px solid #262626",
            backgroundColor: "#101010",
            overflow: "hidden",
          }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #262626" }}>
            <Typography sx={{ fontWeight: 900 }}>Up next</Typography>
          </Box>

          <Box
            sx={{
              maxHeight: { xs: "auto", lg: "calc(100vh - 220px)" },
              overflow: "auto",
              p: 1,
            }}
          >
            <div className="space-y-2">
              {upNext.map((s) => (
                <UpNextItem
                  key={String(s.id)}
                  song={s}
                  active={s.id === song?.id}
                  onPick={onPick}
                />
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}