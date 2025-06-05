import { Metadata } from "next";
import FeedComponent from "@/components/feed/index";

export const metadata: Metadata = {
  title: "Feed | SolarRank",
  description: "Share your thoughts and ideas with the community.",
};

export default function FeedPage() {
  return (
    <FeedComponent />
    // <Suspense fallback={<PostFeedSkeleton />}>
    //   <PostFeed />
    // </Suspense>
  );
}

// function PostFeedSkeleton() {
//   return (
//     <div className="space-y-4">
//       {Array(5)
//         .fill(0)
//         .map((_, i) => (
//           <div
//             key={i}
//             className="bg-card rounded-lg p-4 border shadow-sm animate-pulse"
//           >
//             <div className="flex items-start gap-4">
//               <div className="flex flex-col items-center gap-1">
//                 <div className="h-6 w-6 rounded-full bg-muted"></div>
//                 <div className="h-4 w-4 rounded-sm bg-muted"></div>
//                 <div className="h-6 w-6 rounded-full bg-muted"></div>
//               </div>
//               <div className="flex-1 space-y-2">
//                 <div className="flex items-center gap-2">
//                   <div className="h-8 w-8 rounded-full bg-muted"></div>
//                   <div className="h-4 w-24 bg-muted rounded"></div>
//                   <div className="h-4 w-16 bg-muted rounded ml-auto"></div>
//                 </div>
//                 <div className="h-6 w-4/5 bg-muted rounded"></div>
//                 <div className="h-24 w-full bg-muted rounded"></div>
//                 <div className="flex gap-4 pt-2">
//                   <div className="h-8 w-20 bg-muted rounded"></div>
//                   <div className="h-8 w-20 bg-muted rounded"></div>
//                   <div className="h-8 w-20 bg-muted rounded ml-auto"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }
