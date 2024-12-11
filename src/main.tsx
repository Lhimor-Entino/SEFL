
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { configureStore } from '@reduxjs/toolkit';
import entryDataReducers from "@/store/entryDataReducer.ts"
import imageReducer from "@/store/imageReducer.ts"
import instructionReducer from "@/store/instructionLookUpReducer.ts"
import modalReducers from "@/store/modalReducer.ts"
import { Provider } from "react-redux";
import { Toaster } from 'sonner'
import { Toaster as ShadcnToaster } from "@/components/ui/toaster"
import { Toaster as HotToaster } from 'react-hot-toast';
// import { Toaster } from "@/components/ui/toaster"
const store = configureStore({
  reducer: {
    entry_data_reducer: entryDataReducers,
    image_data_reducer: imageReducer,
    instruction_data_reducer:instructionReducer,
    modal_data_reducer:modalReducers
  },
});
createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
      <App />
      <ShadcnToaster />
      <HotToaster position="top-center" reverseOrder={true} />
      <Toaster richColors theme='light' duration={2323} position='top-center' />
  </Provider>
  

)
