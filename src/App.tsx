import {ErrorBoundary} from 'components/error-boundary';
import { AuthenticatedApp } from 'authenticated-app';
import { FullPageErrorFallback } from 'components/lib';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <ErrorBoundary fallbackRender={FullPageErrorFallback}></ErrorBoundary> */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
