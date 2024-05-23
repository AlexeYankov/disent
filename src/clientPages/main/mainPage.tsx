'use client';

import { useAppStore } from '@/entities/app-store';
import { useLoad } from '@/shared/helpers/useLoad';

const MainClientPage = () => {
  const { setAppLoading } = useAppStore();
  useLoad();
  return <>gg</>;
};

export default MainClientPage;
