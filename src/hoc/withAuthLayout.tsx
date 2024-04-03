import React from 'react';
import AuthLayout from '@/layouts/auth-layout';

function withAuthLayout<T extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<T>) {
  const WithAuthContainer: React.FC<T> = (props) => (
    <AuthLayout>
      <WrappedComponent {...props} />
    </AuthLayout>
  );
  return WithAuthContainer;
}

export default withAuthLayout;
