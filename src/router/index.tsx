import { FC, lazy, Suspense } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

/* Layout 模板 */
const MainLayout = lazy(() => import('@layouts/MainLayout'));
const ManageLayuout = lazy(() => import('@layouts/ManageLayout'));
const QuestionLayout = lazy(() => import('@layouts/QuestionLayout'));
/* Pages 页面 */
const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const NotFound = lazy(() => import('@pages/NotFound'));
/* Pages/Manage 页面 */
const List = lazy(() => import('@pages/Manage/List'));
const Star = lazy(() => import('@pages/Manage/Star'));
const Trash = lazy(() => import('@pages/Manage/Trash'));
/* Pages/Question */
const Edit = lazy(() => import('@pages/Question/Edit'));
const Stat = lazy(() => import('@pages/Question/Stat'));

const manageRoutes: RouteObject[] = [
  { path: 'list', element: <List /> },
  { path: 'star', element: <Star /> },
  { path: 'trash', element: <Trash /> },
];

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'manage', element: <ManageLayuout />, children: manageRoutes },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      { path: 'edit/:id', element: <Edit /> },
      { path: 'stat/:id', element: <Stat /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);
const Routes: FC = () => {
  return (
    <Suspense fallback={<h1>Loding...😅</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Routes;
