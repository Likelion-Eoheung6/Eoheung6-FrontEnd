import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import HomePage from './pages/Home/HomePage';
import RecommendPage from './pages/Recommend/RecommendPage';
import SearchPage from './pages/Search/SearchPage';
import WishlistPage from './pages/Wishlist/WishlistPage';
import MyPage from './pages/MyPage/MyPage';
import StartPage from './pages/Start/StartPage';
import LoginPage from './pages/Auth/LoginPage';
import CreateClassPage from './pages/Class/CreateClassPage';
import RentalPlacePage from './pages/Class/RentalPlacePage';
import RentalPlaceDetailPage from './pages/Class/RentalPlaceDetailPage';
import MyPlacePage from './pages/Class/MyPlacePage';
import RegisterMyPlacePage from './pages/Class/RegisterMyPlacePage';
import DoneCreateClassPage from './pages/Class/DoneCreateClassPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <></>,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'open-class',
        element: <CreateClassPage />,
      },
      { path: 'open-class/myplace', element: <MyPlacePage /> },
      { path: 'open-class/myplace/register', element: <RegisterMyPlacePage /> },
      { path: 'open-class/rent', element: <RentalPlacePage /> },
      { path: 'open-class/rent/:placeId', element: <RentalPlaceDetailPage /> },
      { path: 'open-class/done', element: <DoneCreateClassPage /> },
      { path: 'open-class/apply/:classId', element: <CreateClassPage /> },
      {
        path: 'open-class/apply:classId/payment',
        element: <CreateClassPage />,
      },
      { path: 'request-class', element: <CreateClassPage /> },
      { path: 'recommend', element: <RecommendPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'mypage', element: <MyPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <></>,
    children: [
      { path: 'start', element: <StartPage /> },
      { path: 'login', element: <LoginPage /> },
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
