'use client';

import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/queue")
        .then(res => res.json())
        .then(data => {
          if (data && data.queue) {
            setQueue(data.queue);
          }
        })
        .catch(err => console.error("Failed to load queue", err));
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      {!session && (
        <button
          onClick={() => signIn("spotify")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Sign in with Spotify
        </button>
      )}

      {session && (
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-2xl font-semibold mb-4">Welcome, {session.user.name}</h1>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded mb-8"
          >
            Sign out
          </button>

          <h2 className="text-xl font-bold mb-4">Your Current Queue</h2>
          {queue.length === 0 ? (
            <p>No items in queue.</p>
          ) : (
            <ul className="space-y-2">
              {queue.map((track, idx) => (
                <li key={idx} className="bg-gray-100 rounded p-2">
                  {track.name} by {track.artists?.map(a => a.name).join(", ")}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
