## Live link - `https://moderation-q.vercel.app/`

# Moderation Queue Interface

A modern, human-centered React application for content moderation with intuitive UI/UX and powerful features.

## 🚀#Features

### Core Functionality
- **Post List View**: Clean card-based layout with post details, user info, and timestamps
- **Content Preview Modal**: Full content preview with navigation between posts
- **Batch Operations**: Select multiple posts for bulk approve/reject actions
- **Status Management**: Filter posts by status (Pending, Approved, Rejected, All)
- **Undo Actions**: Undo recent moderation decisions with toast notifications

### User Experience
- **Micro-interactions**: Smooth hover effects, button animations, and transitions
- **Keyboard Shortcuts**: Quick actions using keyboard (A=Approve, R=Reject, Space=Preview, Esc=Close)
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Empty States**: Friendly messages when no content is available
- **Loading States**: Smooth animations for state changes

### Technical Features
- **Redux Toolkit**: Centralized state management for posts and UI
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first styling with custom design system
- **React Hooks**: Custom hooks for keyboard shortcuts and state management

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd moderation-queue
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 Usage

### Basic Operations
- **View Posts**: Browse through posts in the main list
- **Preview Content**: Click on post titles or "View" button to open preview modal
- **Approve/Reject**: Use individual buttons on each post or batch operations
- **Filter Posts**: Use status tabs to filter by Pending, Approved, Rejected, or All

### Keyboard Shortcuts
- `A` - Approve selected posts
- `R` - Reject selected posts
- `Space` - Preview selected post (when only one is selected)
- `Esc` - Close modal or clear selection
- `?` - Show keyboard shortcuts help

### Batch Operations
1. Select posts using checkboxes
2. Use "Select All" to select all pending posts
3. Batch toolbar appears at bottom with approve/reject options
4. Actions can be undone using the toast notification

## 🏗️ Architecture

### Folder Structure
```
src/
├── components/     # Reusable UI components
│   ├── PostCard.jsx
│   ├── PreviewModal.jsx
│   ├── BatchToolbar.jsx
│   ├── UndoToast.jsx
│   ├── StatusTabs.jsx
│   ├── KeyboardShortcuts.jsx
│   └── EmptyState.jsx
├── features/       # Redux slices and store
│   ├── store.js
│   ├── postsSlice.js
│   └── uiSlice.js
├── pages/          # Main page components
│   └── ModerationQueue.jsx
├── hooks/          # Custom React hooks
│   └── useKeyboardShortcuts.js
├── utils/          # Utility functions
│   └── dateUtils.js
├── data/           # Mock data
│   └── mockPosts.js
└── App.jsx         # Main app component
```

### State Management
- **postsSlice**: Manages posts data, selections, filters, and undo stack
- **uiSlice**: Manages UI state like modals, toasts, and keyboard shortcuts

### Design System
- **Colors**: Soft grays, accent blues/greens/reds for actions
- **Typography**: Inter font family with proper hierarchy
- **Spacing**: Generous padding and margins for comfortable reading
- **Shadows**: Subtle shadows (shadow-md/shadow-lg) for depth
- **Borders**: Rounded corners (rounded-2xl) for modern feel

## 🎨 Design Principles

### Human-Centered Design
- Rounded corners and soft shadows for approachable feel
- Pleasant color palette avoiding harsh contrasts
- Adequate white space preventing cramped layouts
- Intuitive navigation and clear visual hierarchy

### Micro-Interactions
- Hover effects on interactive elements
- Button press animations with scale effects
- Smooth modal transitions with backdrop blur
- Animated counters and state changes
- Toast notifications with slide-up animations

### Accessibility
- Keyboard navigation support
- Clear focus indicators
- Semantic HTML structure
- ARIA labels where appropriate
- Color contrast compliance

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or connect your Git repository for automatic deployments

## 🧪 Testing Mock Data

The application includes 6 sample posts with different:
- Content types (text, images)
- Report reasons (Spam, Inappropriate Content, etc.)
- Timestamps (various time intervals)
- User information

You can modify the mock data in `src/data/mockPosts.js` to test different scenarios.

## 🔮 Future Enhancements

- Real API integration
- Advanced filtering and search
- User management and permissions
- Detailed analytics and reporting
- Mobile app version
- Real-time notifications
- Bulk import/export functionality

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

Built with ❤️ using React, Redux Toolkit, and Tailwind CSS
