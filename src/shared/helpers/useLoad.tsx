import { useAppStore } from '@/entities/app-store';
import { useEffect } from 'react';

export function useLoad() {
    const { setAppLoading } =
  useAppStore();
  useEffect(() => {
    setAppLoading(false)
  }, []);
}