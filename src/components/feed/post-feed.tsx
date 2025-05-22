import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Temporary mock data - replace with actual API data fetching
const MOCK_POSTS = [
  {
    id: "1",
    title: "Just completed my first large commercial installation!",
    content:
      "After 3 years of residential installs, I finally got to work on a 500kW commercial project. The challenges were completely different - securing to metal roofing, working with 3-phase power, and coordinating a team of 8 installers. Has anyone else made the jump from residential to commercial? Any tips?",
    author: {
      id: "u1",
      name: "Sarah Jensen",
      avatar: "/avatars/sarah.jpg",
      rank: "Gold Installer",
    },
    upvotes: 24,
    downvotes: 2,
    commentCount: 8,
    createdAt: "2023-08-15T10:30:00Z",
    tags: ["Commercial", "Success Story"],
  },
  {
    id: "2",
    title: "How do you handle microinverter failures in the field?",
    content:
      "I've been getting more warranty calls for failed microinverters lately. When you're on a roof and identify a failed unit, what's your process? Do you carry replacements? Do you handle the warranty paperwork or have the customer do it? Looking to streamline my process.",
    author: {
      id: "u2",
      name: "Mike Torres",
      avatar: "/avatars/mike.jpg",
      rank: "Silver Installer",
    },
    upvotes: 18,
    downvotes: 0,
    commentCount: 15,
    createdAt: "2023-08-14T14:45:00Z",
    tags: ["Technical", "Question"],
  },
  {
    id: "3",
    title: "New certification requirements in California - heads up!",
    content:
      "Just a heads up to all installers in California - there are new certification requirements coming in January. The state is requiring all installers to complete a 4-hour safety course specific to solar installation. I just finished mine - it was pretty straightforward but make sure to schedule yours soon as classes are filling up.",
    author: {
      id: "u3",
      name: "Alex Washington",
      avatar: "/avatars/alex.jpg",
      rank: "Gold Installer",
    },
    upvotes: 42,
    downvotes: 1,
    commentCount: 12,
    createdAt: "2023-08-13T08:15:00Z",
    tags: ["Regulations", "California"],
  },
];

export function PostFeed() {
  return (
    <div className="space-y-4">
      {MOCK_POSTS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

interface PostCardProps {
  post: (typeof MOCK_POSTS)[0];
}

function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-start p-4">
        {/* Vote controls */}
        <div className="flex flex-col items-center mr-4 space-y-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Upvote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-up"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </Button>
          <span className="text-sm font-semibold">
            {post.upvotes - post.downvotes}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Downvote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </div>

        {/* Post content */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <Link
                href={`/profile/${post.author.id}`}
                className="text-sm font-medium hover:underline"
              >
                {post.author.name}
              </Link>
              <Badge variant="outline" className="ml-2 text-xs">
                {post.author.rank}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground ml-auto">
              {formatDate(post.createdAt)}
            </span>
          </div>

          <Link href={`/post/${post.id}`} className="block hover:underline">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
          </Link>

          <p className="text-sm text-muted-foreground mb-4">
            {post.content.length > 300
              ? `${post.content.slice(0, 300)}...`
              : post.content}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between border-t pt-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              asChild
            >
              <Link href={`/post/${post.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {post.commentCount} Comments
              </Link>
            </Button>

            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else {
    const diffInDays = diffInHours / 24;
    if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  }
}
