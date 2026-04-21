import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { isYouTubeUrl, toYouTubeEmbedUrl } from "../utils/video.js";

export function VideoPlayerDialog({ open, song, onClose }) {
  const videoUrl = song?.url ?? "";
  const youTubeEmbed = videoUrl && isYouTubeUrl(videoUrl) ? toYouTubeEmbedUrl(videoUrl) : null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 900 }}>
            {song?.title ?? "Player"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {song ? `${song.artist} • ${song.album}` : ""}
          </Typography>
        </Box>

        <IconButton onClick={onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box className="w-full aspect-video bg-black rounded-xl overflow-hidden">
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

        {!youTubeEmbed && videoUrl ? (
          <Typography variant="caption" sx={{ display: "block", mt: 1, color: "text.secondary" }}>
            URL not detected as YouTube; using HTML5 video tag.
          </Typography>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}