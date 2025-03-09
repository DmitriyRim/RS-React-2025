import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', 'routes/root.tsx', [route('/:id', 'routes/home.tsx')]),
  route('*', 'routes/404.tsx'),
] satisfies RouteConfig;
