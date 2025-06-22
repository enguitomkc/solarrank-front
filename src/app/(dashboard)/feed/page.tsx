"use client";

import { Metadata } from "next";
import FeedComponent from "@/components/feed/index";
import { apiRequest } from "@/api/apiRequest";
import { IPostUserComment } from "@/types/apiResponse/Post";
import ErrorPage from "@/components/Error";
import ENDPOINTS from "@/api/enpoints";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Feed | SolarRank",
//   description: "Share your thoughts and ideas with the community.",
// };

export default function FeedPage() {
  const [posts, setPosts] = useState<IPostUserComment[]>([]);
  // const posts = await apiRequest<IPostUserComment[]>(ENDPOINTS.POSTS.getPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await apiRequest<IPostUserComment[]>(
        ENDPOINTS.POSTS.getPosts
      );
      setPosts(posts.data as IPostUserComment[]);
    };
    fetchPosts();
  }, []);

  console.log(posts, "posts");

  if (!posts) {
    return (
      <ErrorPage
        title="Failed to Load Feed"
        message="We couldn't load the feed data. Please check your connection and try again."
      />
    );
  }

  // const postsData = posts.data as IPostUserComment[];

  return <FeedComponent posts={posts} />;
}
