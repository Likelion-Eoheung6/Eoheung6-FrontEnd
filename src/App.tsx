import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import HomePage from './pages/Home/HomePage';
import EasyHomePage from './pages/Home/EasyHomePage';
import RecommendPage from './pages/Recommend/RecommendPage';
import SearchPage from './pages/Search/SearchPage';
import SearchResultsPage from './pages/Search/SearchResultsPage';
import WishlistPage from './pages/Wishlist/WishlistPage';
import MyPage from './pages/MyPage/MyPage';
import MyActivityPage from './pages/MyPage/MyActivityPage';
import ReviewPage from './pages/MyPage/ReviewPage';
import StartPage from './pages/Start/StartPage';
import CreateClassPage from './pages/Class/CreateClassPage';
import RentalPlacePage from './pages/Class/RentalPlacePage';
import RentalPlaceDetailPage from './pages/Class/RentalPlaceDetailPage';
import MyPlacePage from './pages/Class/MyPlacePage';
import AddMyPlacePage from './pages/Class/AddMyPlacePage';
import DoneCreateClassPage from './pages/Class/DoneCreateClassPage';
import LoginPage from './pages/Login/LoginPage';
import VersionSelectPage from './pages/Tag/VersionSelectPage';
import TagSelectPage from './pages/Tag/TagSelectPage';
import LoadingScreen from './components/common/LoadingScreen';
import SignupPage from './pages/Auth/SignupPage';
import ApplyClassPage from './pages/Class/ApplyClassPage';
import PaymentPage from './pages/Class/PaymentPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <></>,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'easy', element: <EasyHomePage /> },
      {
        path: 'open-class',
        element: <CreateClassPage />,
      },
      { path: 'open-class/myplace', element: <MyPlacePage /> },
      { path: 'open-class/myplace/register', element: <AddMyPlacePage /> },
      { path: 'open-class/rent', element: <RentalPlacePage /> },
      { path: 'open-class/rent/:placeId', element: <RentalPlaceDetailPage /> },
      { path: 'open-class/done', element: <DoneCreateClassPage /> },
      { path: 'class/:classId', element: <ApplyClassPage /> },
      {
        path: 'class/:classId/payment',
        element: <PaymentPage />,
      },
      { path: 'request-class', element: <CreateClassPage /> },
      { path: 'recommend', element: <RecommendPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'search-results', element: <SearchResultsPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'my-activity', element: <MyActivityPage /> },
      { path: 'review', element: <ReviewPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <></>,
    children: [
      { path: 'start', element: <StartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'version', element: <VersionSelectPage /> },
      { path: 'tags', element: <TagSelectPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      {/* 로딩 화면 테스트 */}
      <LoadingScreen isVisible={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
