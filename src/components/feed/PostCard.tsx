"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { formatDate } from "@/utils/formatter";
import { IPostUserComment } from "@/types/apiResponse/Post";
import { MessageCircle, Share, Plus, Minus } from "lucide-react";
import { apiRequest } from "@/api/apiRequest";
import ENDPOINTS from "@/api/enpoints";
import { useState } from "react";

function FeedPostCard({ post }: { post: IPostUserComment }) {
  const [energy, setEnergy] = useState(post.post.energy || 0);
  const [vote, setVote] = useState(post.vote || null);

  console.log(post, "post");

  console.log(energy, "energy");

  const votePost = async (voteType: "positive" | "negative") => {
    const energyChange = vote ? 2 : 1;
    setVote(voteType);
    setEnergy(
      energy + (voteType === "positive" ? energyChange : -energyChange)
    );
    const result = await apiRequest(ENDPOINTS.POSTS.votePost(post.post.id), {
      method: "POST",
      body: JSON.stringify({ voteType }),
    });
    if (!result.success) {
      setVote(null);
      setEnergy(
        (prev) =>
          prev - (voteType === "positive" ? energyChange : -energyChange)
      );
    }
  };

  const unvotePost = async () => {
    setVote(null);
    setEnergy(energy - (vote === "positive" ? 1 : -1));
    const result = await apiRequest(ENDPOINTS.POSTS.votePost(post.post.id), {
      method: "DELETE",
    });
    if (!result.success) {
      setVote(vote);
      setEnergy((prev) => prev + (vote === "positive" ? 1 : -1));
    }
  };

  const handleClickPositive = () => {
    if (vote === "positive") {
      unvotePost();
    } else {
      votePost("positive");
    }
  };

  const handleClickNegative = () => {
    if (vote === "negative") {
      unvotePost();
    } else {
      votePost("negative");
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        {/* Post header */}
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.user.profile_image} alt={post.user.name} />
            <AvatarFallback>
              {post.user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center">
            <Link
              href={`/profile/${post.user.id}`}
              className="text-sm font-medium hover:underline"
            >
              {post.user.name}
            </Link>
            <Badge variant="outline" className="ml-2 text-xs">
              {post.user.rank}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground ml-auto">
            {formatDate(post.post.created_at)}
          </span>
        </div>

        {/* Post content */}
        <div className="mb-4">
          <Link
            href={`/post/${post.post.id}`}
            className="block hover:underline"
          >
            <h3 className="text-lg font-semibold mb-2">{post.post.title}</h3>
          </Link>

          <p className="text-sm text-muted-foreground mb-4">
            {post.post.body.length > 300
              ? `${post.post.body.slice(0, 300)}...`
              : post.post.body}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bottom actions - Energy voting and comments */}
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center space-x-4">
            {/* Energy voting */}
            <div className="flex items-center space-x-1">
              <Button
                size="icon"
                variant={vote === "positive" ? "positive" : "positiveOutline"}
                className="h-6 w-6 rounded-full "
                aria-label="Positive Energy"
                onClick={handleClickPositive}
              >
                <Plus
                  className={`h-3 w-3 ${
                    vote === "positive" ? "text-white" : "text-red-600"
                  }`}
                />
              </Button>

              <span className="text-sm font-semibold px-2 py-1 rounded-full min-w-[2rem] text-center">
                {energy}
              </span>

              <Button
                size="icon"
                variant={vote === "negative" ? "negative" : "negativeOutline"}
                className="h-6 w-6 rounded-full"
                aria-label="Negative Energy"
                onClick={handleClickNegative}
              >
                <Minus
                  className={`h-3 w-3 ${
                    vote === "negative" ? "text-white" : "text-gray-900"
                  }`}
                />
              </Button>
            </div>

            {/* Comments */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href={`/post/${post.post.id}`}>
                <MessageCircle className="mr-2 h-4 w-4" />
                {post.comments?.count} Comments
              </Link>
            </Button>
          </div>

          {/* Share button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default FeedPostCard;
