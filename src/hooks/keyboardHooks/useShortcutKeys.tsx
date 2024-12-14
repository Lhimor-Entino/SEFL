
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAccessorial, addItems, addReference, deleteAllAccessorial, deleteAllInstruction, deleteAllItems, deleteAllReference } from '@/store/entryDataReducer';
import useImage from '../api/useImage';
import { focusNextInput } from '@/lib/generalUtil';


interface Props{
    handleScrollToBottom : () => void
    handleScrollToBottomRef: () =>  void
    handleScrollToBottomCharge: () =>void
    handleScrollToTop: () =>void
}


const useShortcutKeys = (props:Props) => {
    const { handleScrollToBottom,handleScrollToBottomRef,handleScrollToBottomCharge,handleScrollToTop} = props
    const { refetchImg, nextImage } = useImage()

    const dispatch = useDispatch()
    useEffect(() => {

        // Define the event handler
        const handleKeyDown = (e: KeyboardEvent) => {
          
            // API SHORTCUT KEYS  
            if (e.ctrlKey && e.key == "Insert" ) {
                e.preventDefault()
                dispatch(addItems())
              
                    handleScrollToBottom(); // Trigger scroll
                
            }
            // SCROLL TO TOP
            if (e.ctrlKey && e.altKey && e.key.toUpperCase() === "T" ) {
                
                e.preventDefault()
             
                handleScrollToTop(); // Trigger scroll
                focusNextInput(0)
                
            }
            if (e.altKey && e.key.toUpperCase() == "A"    ) {
                e.preventDefault()
                dispatch(addReference())
              
                handleScrollToBottomRef(); // Trigger scroll
                
            }
            if(e.altKey && e.key.toUpperCase() =="C"){
                e.preventDefault()
                dispatch(addAccessorial())
                handleScrollToBottomCharge()
            }
            if (e.key == "F4") {
                e.preventDefault()
                refetchImg()
            }
            if (e.ctrlKey && e.key == "ArrowRight") {
                nextImage(1)
            }

            //DATA SHORTCUT KEYS

            if(e.ctrlKey && e.shiftKey && e.key =="Delete"){
                e.preventDefault()
                   // Get the currently focused element
            const currentElement = document.activeElement as HTMLElement | null;
     
            if(currentElement?.id ==="spec_ins"){ // MEANS ACTION COMES FOR SPEC INS FIELD
                dispatch(deleteAllInstruction())
                return
            }
          
            if(currentElement?.classList.contains("item-input")){
              dispatch(deleteAllItems())
              return
            }
            if(currentElement?.classList.contains("reference-input")){
                dispatch(deleteAllReference())
                return
              }
              if(currentElement?.classList.contains("accessorial-input")){
                dispatch(deleteAllAccessorial())
                return
              }
             
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

};

export default useShortcutKeys;
