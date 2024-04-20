export type Pages = 'Home' | 'About';

export const Routes: Record<Pages, string> = {
  Home: '/',
  About: '/about',
};

export const NavbarRoutes = [
  { path: Routes.Home, label: 'Home' },
  { path: Routes.About, label: 'About' },
];