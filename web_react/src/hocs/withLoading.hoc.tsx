import React, { Suspense } from 'react';
import { Loading } from '@app/components/common/Loading/Loading';
import type { JSX } from 'react';

type ReturnType<T> = (props: T) => JSX.Element;

export const withLoading = <T extends object>(Component: React.ComponentType<T>): ReturnType<T> => {
  return (props: T) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};
