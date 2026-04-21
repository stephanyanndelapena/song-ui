import axios from "axios";

const baseURL =
  import.meta.env.VITE_SONG_API_BASE_URL?.trim() || "http://localhost:8080";

export const songApi = axios.create({
  baseURL,
  timeout: 15000,
});

export async function fetchSongs() {
  const res = await songApi.get("/delapena/songs");
  return res.data;
}