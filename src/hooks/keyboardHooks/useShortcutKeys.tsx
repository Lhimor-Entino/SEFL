
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAccessorial, addItems, addReference } from '@/store/entryDataReducer';
import useImage from '../api/useImage';


interface Props{
    handleScrollToBottom : () => void
    handleScrollToBottomRef: () =>  void
    handleScrollToBottomCharge: () =>void
}


const useShortcutKeys = (props:Props) => {
    const { handleScrollToBottom,handleScrollToBottomRef,handleScrollToBottomCharge} = props
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
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

};

export default useShortcutKeys;
