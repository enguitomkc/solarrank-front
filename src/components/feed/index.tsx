import FeedCreatePostButton from "./CreatePostButton";
import FeedPostSorter from "./PostSorter";
import FeedPostCard from "./PostCard";
import { Header } from "../ui/Header";
import { MOCK_POSTS } from "./mockData";

function FeedComponent() {
  return (
    <div className="container max-w-5xl space-y-6">
      <Header
        title="Community Feed"
        description="Share your thoughts and ideas with the community."
      />

      <div className="flex items-center justify-between">
        <FeedPostSorter />
        <FeedCreatePostButton />
      </div>
      <div className="space-y-4">
        {MOCK_POSTS.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default FeedComponent;
