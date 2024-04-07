
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
import axios from "axios";


interface Artist {
  id: number;
  post_url: string;
  likes: string; // Change to string
  comments: string; // Change to string
  username: string;
  avatar: string;
  total_points: number;
  bitcoin_address: string;
}

// async function getArtists(): Promise<Artist[]> {
//   const response = await fetch("http://localhost:4009/artists");
//   return response.json();
// }


async function getBitcoinBalance(address: string): Promise<string> {
  const url = `https://blockchain.info/q/addressbalance/${address}`;
  const response = await axios.get(url);
  return (response.data / 1e8).toFixed(8); // Convert to BTC and format to 8 decimal places
}

function getArtists(): Artist[] {
  return db.artists;
}

export default async function Home() {
  let artists = await getArtists();

  // Sort artists by total_points in descending order
  artists = artists.sort((a, b) => b.total_points - a.total_points);

  return (

      <main>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <h1>Explode Cypher #3 leaderboard</h1>
              <p className="text-gray-500">last updated: 2024-05-06 1:35 pm</p>
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
                  <CardFooter className="flex flex-col items-start p-4 bg-gray-100 border-t border-gray-200">
                    <a
                      href={artist.post_url}
                      className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline transition duration-300 ease-in-out mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link to IG post
                    </a>
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold">Support the artist with a Bitcoin tip:</span> {artist.bitcoin_address}
                    </div>
                    <div>
                      
                    </div>

                  </CardFooter>
                  
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
  );
}

