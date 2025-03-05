import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export enum LoaderPath {
  Root = '/',
  PageId = '/[id]',
}

export function useLoader(path = LoaderPath.Root) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      const currentUrl = router.asPath;
      const nextUrl = new URL(url, window.location.origin);
      const currentId = new URL(location.origin + currentUrl).pathname;

      const currentParams = new URLSearchParams(currentUrl.split('?')[1] || '');
      const nextParams = new URLSearchParams(nextUrl.search);

      if (path === '/' && currentParams.toString() !== nextParams.toString()) {
        setLoading(true);
      }

      if (
        path !== '/' &&
        router.pathname === path &&
        nextUrl.pathname !== currentId
      ) {
        setLoading(true);
      }
    };

    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [path, router]);

  return loading;
}
