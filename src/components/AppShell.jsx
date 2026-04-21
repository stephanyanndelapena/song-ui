import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function AppShell({ children, onSearch }) {
  return (
    <Box className="min-h-screen text-white">
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ backgroundColor: "#0f0f0f", borderBottom: "1px solid #262626" }}
      >
        <Toolbar
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "220px 1fr 220px" },
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Left: Brand */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, whiteSpace: "nowrap" }}>
              SongTube
            </Typography>
          </Box>

          {/* Center: Search */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: 999,
                px: 2,
                py: 1,
                backgroundColor: "#1f1f1f",
                width: "100%",
                maxWidth: 560, // centered like YouTube
              }}
            >
              <SearchIcon fontSize="small" />
              <InputBase
                placeholder="Search songs…"
                sx={{ color: "white", width: "100%" }}
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </Box>
          </Box>

          {/* Right: placeholder column to keep center column truly centered */}
          <Box sx={{ display: { xs: "none", sm: "block" } }} />
        </Toolbar>
      </AppBar>

      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </Box>
  );
}