// Temporary mock data - replace with actual API data fetching
export const MOCK_POSTS = [
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