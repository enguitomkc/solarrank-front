import FeedCreatePostButton from "./CreatePostButton";
import FeedPostSorter from "./PostSorter";
import FeedPostCard from "./PostCard";
import { Header } from "../ui/Header";
import { IPostUserComment } from "@/types/apiResponse/Post";

function FeedComponent({ posts }: { posts: IPostUserComment[] }) {
  return (
    <div className="container space-y-6">
      <Header
        title="Community Feed"
        description="Share your thoughts and ideas with the community."
      />

      <div className="flex items-center justify-between">
        <FeedPostSorter />
        <FeedCreatePostButton />
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <FeedPostCard key={post.post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default FeedComponent;
