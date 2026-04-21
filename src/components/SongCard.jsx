import { Card, CardActionArea, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import { youTubeThumbnail } from "../utils/video.js";

export function SongCard({ song, onClick }) {
  const thumb = youTubeThumbnail(song.url);

  return (
    <Card sx={{ backgroundColor: "#121212", color: "white", borderRadius: 3 }}>
      <CardActionArea onClick={() => onClick(song)}>
        <Box className="relative w-full aspect-video bg-black">
          {thumb ? (
            <img
              src={thumb}
              alt={song.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-300">
              No thumbnail
            </div>
          )}

          <Chip
            label={song.genre}
            size="small"
            sx={{
              position: "absolute",
              left: 8,
              bottom: 8,
              backgroundColor: "rgba(0,0,0,0.75)",
              color: "white",
            }}
          />
        </Box>

        <CardContent className="space-y-1">
          <Typography variant="subtitle1" sx={{ fontWeight: 900 }} noWrap>
            {song.title}
          </Typography>

          <Typography variant="body2" sx={{ color: "#b3b3b3" }} noWrap>
            {song.artist}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ pt: 0.5, flexWrap: "wrap" }}>
            <Chip size="small" label={song.album} sx={{ backgroundColor: "#1f1f1f", color: "white" }} />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}