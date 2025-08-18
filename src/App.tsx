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
import LoginPage from './pages/Login/LoginPage';
import VersionSelectPage from './pages/Tag/VersionSelectPage';
import ClassPage from './pages/Class/ClassPage';
import CreateClassPage from './pages/Class/CreateClassPage';
import TagSelectPage from './pages/Tag/TagSelectPage';
import LoadingScreen from './components/common/LoadingScreen';
import SignupPage from './pages/Auth/SignupPage';

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
        element: <CreateClassPage />, // 여기가 상위 라우트
        children: [
          { path: 'myplace', element: <CreateClassPage /> },
          { path: 'rent', element: <CreateClassPage /> },
          { path: 'done', element: <CreateClassPage /> },
          { path: 'apply/:classId', element: <CreateClassPage /> },
          { path: 'apply/:classId/payment', element: <CreateClassPage /> },
        ],
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
