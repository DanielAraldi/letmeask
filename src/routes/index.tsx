import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../contexts';
import { Home, NewRoom, Room } from '../pages';

export function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms/new' element={<NewRoom />} />
          <Route path='/rooms/:id' element={<Room />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
