// pages/api/addSong.js
import { getSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const spotifyApi = new SpotifyWebApi({
    accessToken: session.accessToken,
  });

  try {
    // Example: Add a song to the current playback queue
    const trackUri = req.body.trackUri;
    await spotifyApi.addTracksToQueue(trackUri);
    res.status(200).json({ message: "Song added to the queue" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add song to queue" });
  }
}
