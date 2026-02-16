# 🎬 Netflix Clone - Enhanced Version

A fully functional Netflix clone built with **React**, **Vite**, and **TMDB API**. This project includes advanced features like authentication, watchlist management, search functionality, and a professional UI with smooth animations.

## ✨ New Features & Improvements

### 🔐 **Authentication System**
- User login and sign-up functionality
- Form validation with error messages
- Local storage persistence for user sessions
- Protected routes (login required to access home page)
- User profile dropdown with logout

### 📺 **Movie Management**
- **Watchlist**: Add/remove movies from "My List"
- **Search Functionality**: Search movies by title from the navbar
- **Movie Details Page**: Comprehensive movie information including:
  - Genre, release date, language, budget, and revenue
  - IMDb ratings and duration
  - Cast and crew information
  - Detailed overview
- **Player Page**: Video player with movie metadata

### 🎨 **Enhanced UI/UX**
- **Responsive Design**: Fully mobile-friendly (tested on all screen sizes)
- **Smooth Animations**: Hover effects, transitions, and skeleton loaders
- **Dark Theme**: Professional Netflix-like dark interface
- **Loading States**: Skeleton loaders for content while fetching
- **Error Handling**: User-friendly error messages
- **Advanced Navbar**:
  - Search bar with auto-expand on focus
  - User profile dropdown with options
  - Watchlist counter
  - Scroll-based background opacity

### 🛠️ **Technical Improvements**
- **Context API**: Global state management for auth and watchlist
- **Error Boundaries**: Better error handling and user feedback
- **Performance**: Optimized re-renders and lazy loading
- **Clean Code**: Modular component structure
- **Real Data**: Integration with TMDB API for real movies and TV shows

## 📂 **Project Structure**

```
src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx (Enhanced with search & profile)
│   │   └── Navbar.css (Advanced styling)
│   ├── TitleCards/
│   │   ├── TitleCards.jsx (Improved with loading states)
│   │   └── TitleCards.css (Better animations)
│   ├── Footer/
│   ├── ProtectedRoute/
│   │   └── ProtectedRoute.jsx (NEW - Route protection)
│   └── ...
├── context/
│   └── AuthContext.jsx (NEW - Authentication & state management)
├── pages/
│   ├── Home/
│   │   ├── Home.jsx (Search support)
│   │   └── Home.css (Search results page styling)
│   ├── Login/
│   │   ├── Login.jsx (Real authentication)
│   │   └── Login.css (Enhanced styling)
│   ├── Player/
│   │   ├── Player.jsx (Movie details & watchlist toggle)
│   │   └── Player.css (Professional styling)
│   ├── MovieDetails/ (NEW)
│   │   ├── MovieDetails.jsx
│   │   └── MovieDetails.css
│   ├── Watchlist/ (NEW)
│   │   ├── Watchlist.jsx
│   │   └── Watchlist.css
│   └── ...
├── App.jsx (Updated with AuthProvider & ProtectedRoute)
├── index.css (Enhanced global styles)
└── main.jsx
```

## 🚀 **Getting Started**

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_api_token_here
   ```
   
   Get your TMDB API token from: https://www.themoviedb.org/settings/api

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 **Key Features Usage**

### Login/Sign Up
- Navigate to the login page to create an account
- Use any email and password (minimum 6 characters)
- Your session is saved locally

### Search Movies
- Click the search icon in the navbar
- Type a movie title and press Enter
- View search results with ratings and details
- Click any movie to watch

### Watch Movies
- Click any movie card to play the trailer
- View detailed information about the movie
- Rate and check cast information

### Manage Watchlist
- Add movies to your list by clicking "Add to My List" button
- View your watchlist from the navbar (My List menu)
- Sort by rating or most recent
- Remove movies by clicking the remove button

### Explore Categories
- **Now Playing**: Currently in theaters
- **Blockbuster Movies**: Top-rated films
- **Popular Movies**: Latest trending content
- **New Releases**: Upcoming movies
- **Trending Now**: Weekly trending movies

## 🎨 **Design Highlights**

### Color Scheme
- **Primary Red**: #e50914 (Netflix brand)
- **Dark Background**: #000000
- **Text Gray**: #b3b3b3
- **Accent**: White (#ffffff)

### Responsive Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

### Animations & Transitions
- Smooth scroll behavior
- Hover elevation effects
- Fade-in animations
- Scale transformations
- Slide-up animations
- Skeleton loaders for content

## 🔧 **Technologies Used**

- **React 19**: UI library
- **Vite**: Build tool and dev server
- **React Router DOM v7**: Client-side routing
- **TMDB API**: Movie database
- **CSS3**: Styling with animations
- **LocalStorage**: Session persistence

## 📝 **API Integration**

The app uses The Movie Database (TMDB) API v3 for all movie data:

- **Now Playing**: `/movie/now_playing`
- **Popular**: `/movie/popular`
- **Top Rated**: `/movie/top_rated`
- **Upcoming**: `/movie/upcoming`
- **Trending**: `/trending/movie/week`
- **Search**: `/search/movie`
- **Movie Details**: `/movie/{id}`
- **Movie Videos**: `/movie/{id}/videos`
- **Movie Credits**: `/movie/{id}/credits`

## 🔐 **Authentication Flow**

1. User navigates to login page
2. Enters email and password
3. Data is validated and stored in localStorage
4. User is redirected to home page
5. User session is checked on app load
6. Protected routes only accessible when logged in
7. User can log out from profile dropdown

## 📱 **Mobile Features**

- Touch-friendly buttons and navigation
- Optimized scrolling for vertical layouts
- Responsive grid layouts
- Hamburger menu considerations
- Mobile-optimized modals and dropdowns
- Proper viewport scaling

## 🐛 **Error Handling**

- API failure handling with user-friendly messages
- Form validation with specific error messages
- Missing image fallbacks
- Network error recovery
- Loading states for all async operations

## 📈 **Performance Optimizations**

- Lazy loading of images
- Efficient re-renders with proper dependencies
- Scroll performance optimization
- CSS animations instead of JavaScript
- Minimized bundle size
- Smooth scrolling

## 🎓 **Learning Points**

This project demonstrates:
- React Hooks (useState, useEffect, useRef, useContext)
- Context API for state management
- React Router for navigation
- API integration and data fetching
- Form handling and validation
- CSS animations and transitions
- Responsive design principles
- Component composition and reusability

## 📄 **License**

This project is for educational purposes.

## 🙏 **Credits**

- Movie data powered by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Inspired by Netflix UI/UX design

---

**Enjoy your Netflix Clone! 🍿**

For any issues or feature requests, feel free to create an issue or contribute to the project.
