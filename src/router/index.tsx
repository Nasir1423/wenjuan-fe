import { FC, lazy, Suspense } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

/* Layout 模板 */
const MainLayout = lazy(() => import(/* webpackChunkName: "mainLayout" */ '@layouts/MainLayout'));
const ManageLayout = lazy(
  () => import(/* webpackChunkName: "manageLayout" */ '@layouts/ManageLayout')
);
const QuestionLayout = lazy(
  () => import(/* webpackChunkName: "questionLayout" */ '@layouts/QuestionLayout')
);
/* Pages 页面 */
const Home = lazy(() => import(/* webpackChunkName: "homePage" */ '@pages/Home'));
const Login = lazy(() => import(/* webpackChunkName: "loginPage" */ '@pages/Login'));
const Register = lazy(() => import(/* webpackChunkName: "registerPage" */ '@pages/Register'));
const NotFound = lazy(() => import(/* webpackChunkName: "notFoundPage" */ '@pages/NotFound'));
/* Pages/Manage 页面 */
const List = lazy(() => import(/* webpackChunkName: "listPage" */ '@pages/Manage/List'));
const Star = lazy(() => import(/* webpackChunkName: "starPage" */ '@pages/Manage/Star'));
const Trash = lazy(() => import(/* webpackChunkName: "trashPage" */ '@pages/Manage/Trash'));
/* Pages/Question */
const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '@pages/Question/Edit'));
const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '@pages/Question/Stat'));

/* 路由规则 */
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
      { path: 'manage', element: <ManageLayout />, children: manageRoutes },
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

/* 路由器 */
const router = createBrowserRouter(routes);

/* 使用路由器 */
const Routes: FC = () => {
  return (
    <Suspense fallback={<h1>Loading...😅</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Routes;

export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_LIST_PATHNAME = '/manage/list';
export const MANAGE_STAR_PATHNAME = '/manage/star';
export const MANAGE_TRASH_PATHNAME = '/manage/trash';
export const QUESTION_EDIT_PATHNAME = '/question/edit';
export const QUESTION_STAT_PATHNAME = '/question/stat';
