import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/Home/HomePage';
import RecommendPage from './pages/Recommend/RecommendPage';
import SearchPage from './pages/Search/SearchPage';
import WishlistPage from './pages/Wishlist/WishlistPage';
import MyPage from './pages/MyPage/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <></>,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'recommend', element: <RecommendPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'mypage', element: <MyPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
