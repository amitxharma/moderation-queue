export const mockPosts = [
  {
    id: "post_001",
    title: "Amazing sunset at the beach today!",
    content: "Just witnessed the most incredible sunset at Malibu Beach. The colors were absolutely breathtaking - deep oranges, pinks, and purples painting the sky. Nature never fails to amaze me! 🌅",
    author: {
      username: "beachLover23",
      id: "user_001"
    },
    reportedReason: "Spam",
    reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    reportCount: 3,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: "post_002",
    title: "New recipe: Chocolate chip cookies",
    content: "Finally perfected my grandmother's chocolate chip cookie recipe! The secret is browning the butter first and using a mix of dark and milk chocolate chips. They're crispy on the outside and chewy on the inside. Recipe in comments!",
    author: {
      username: "cookingMama",
      id: "user_002"
    },
    reportedReason: "Inappropriate Content",
    reportedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    reportCount: 5,
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop"
  },
  {
    id: "post_003",
    title: "My cat learned a new trick!",
    content: "You won't believe this - my cat Whiskers just learned how to high-five! It took weeks of training with treats, but now he does it on command. Best pet ever! 🐱",
    author: {
      username: "catParent42",
      id: "user_003"
    },
    reportedReason: "Off-topic",
    reportedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    reportCount: 2,
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop"
  },
  {
    id: "post_004",
    title: "Book recommendation: The Midnight Library",
    content: "Just finished reading 'The Midnight Library' by Matt Haig and I'm absolutely blown away. It's a beautiful exploration of life's infinite possibilities and the choices we make. Highly recommend for anyone going through a tough time.",
    author: {
      username: "bookworm2024",
      id: "user_004"
    },
    reportedReason: "Copyright Violation",
    reportedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    reportCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
  },
  {
    id: "post_005",
    title: "Morning workout complete!",
    content: "Just crushed a 5-mile run followed by 30 minutes of strength training. Feeling energized and ready to tackle the day! Remember, consistency is key to reaching your fitness goals. What's your favorite way to stay active?",
    author: {
      username: "fitnessGuru",
      id: "user_005"
    },
    reportedReason: "Harassment",
    reportedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    reportCount: 7,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  },
  {
    id: "post_006",
    title: "Weekend farmers market haul",
    content: "Spent the morning at the local farmers market and came home with the most beautiful fresh produce. Supporting local farmers while getting the freshest ingredients for the week. The tomatoes smell incredible!",
    author: {
      username: "localFoodie",
      id: "user_006"
    },
    reportedReason: "Misinformation",
    reportedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    reportCount: 4,
    imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop"
  }
];