import './styles/global.scss';

import { Toaster } from 'react-hot-toast';

import { ToastProvider } from './contexts';
import { Router } from './routes';

function App() {
  return (
    <>
      <Toaster toastOptions={{ className: 'toast' }} position='top-right' />

      <ToastProvider>
        <Router />
      </ToastProvider>
    </>
  );
}

export default App;
