export type Pages = 'Home' | 'AdminPage';

export const Routes: Record<Pages, string> = {
  Home: '/',
  AdminPage: '/admin-page',
};

export const NavbarRoutes = [
  { path: Routes.Home, label: 'Home' },
  { path: Routes.AdminPage, label: 'AdminPage' },
];