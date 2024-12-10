
import './App.css'
import Home from './Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login'
import SeparateTabImageViewer from './SeparateTabImageViewer'

import useRequestKeyboardHooks from './hooks/keyboardHooks/useRequestKeyboardHooks'
import useNavigationKeyboardHooks from './hooks/keyboardHooks/useNavigationKeyboardHooks'
import useShortcutKeys from './hooks/keyboardHooks/useShortcutKeys';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: "tabViewer/:img?",
    element: <SeparateTabImageViewer />,
  },

], {
  basename: '/sefl/entry'
});

function App() {

  useNavigationKeyboardHooks()
  useRequestKeyboardHooks()
  // ** useShortcutKeys() ->  THIS HOOK IS CALLED IN THE ENTRYFROM COMPONENT **
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
