import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../contexts';
import { Home, NewRoom } from '../pages';

export function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms/new' element={<NewRoom />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
