import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, NewRoom } from '../pages';

export function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms/new' element={<NewRoom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
