
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import db from "../../data/db.json";
import WalletConnect from '../components/WalletConnect'; // Adjust the path as needed
import { WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

const wallets = [
  new PhantomWalletAdapter(),
  // Add other wallet adapters here
];

interface Artist {
  id: number;
  post_url: string;
  likes: string; // Change to string
  comments: string; // Change to string
  username: string;
  avatar: string;
  total_points: number;
}

// async function getArtists(): Promise<Artist[]> {
//   const response = await fetch("http://localhost:4009/artists");
//   return response.json();
// }

function getArtists(): Artist[] {
  return db.artists;
}

export default async function Home() {
  let artists = await getArtists();

  // Sort artists by total_points in descending order
  artists = artists.sort((a, b) => b.total_points - a.total_points);

  return (
    <WalletProvider wallets={wallets}>

      <main>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <h1>Explode Cypher #3 leaderboard</h1>
              <p className="text-gray-500">last updated: 2024-04-02 8:17 am</p>
              <WalletConnect />
              {artists.map((artist, index) => (
                <Card key={artist.id}>
                  <CardHeader className="flex items-center space-x-2"> {/* space-x-2 for space between avatar and title */}
                    <Avatar className="flex-shrink-0 w-12 h-12"> {/* Adjust the width and height as needed */}
                      <AvatarImage src={`/img/${artist.avatar}`} alt={`Avatar of ${artist.username}`} />
                      <AvatarFallback>
                        {/* Fallback content */}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center"> {/* This wrapper can help align text if needed */}
                      <CardTitle>
                        @{artist.username}
                        {index === 0 && " 🥇"}
                        {index === 1 && " 🥈"}
                        {index === 2 && " 🥉"}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {/* the comments / likes interface is wrong!!!! */}
                      <p>Likes: {artist.likes}</p>
                      <p>Comments: {artist.comments}</p>
                      <p>Total Points: {artist.total_points}</p>
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                  <a 
                      href={artist.post_url} 
                      className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline transition duration-300 ease-in-out"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      link to ig post
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </WalletProvider>
  );
}

