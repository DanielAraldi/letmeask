import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../contexts';
import { AdminRoom, Home, NewRoom, NotFound, Room } from '../pages';

export function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms/new' element={<NewRoom />} />
          <Route path='/rooms/:id' element={<Room />} />
          <Route path='/admin/rooms/:id' element={<AdminRoom />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
