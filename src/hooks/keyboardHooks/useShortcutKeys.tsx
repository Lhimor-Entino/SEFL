
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItems } from '@/store/entryDataReducer';
import useImage from '../api/useImage';





const useShortcutKeys = ({ handleScrollToBottom }: { handleScrollToBottom: () => void }) => {

    const { refetchImg, nextImage } = useImage()

    const dispatch = useDispatch()
    useEffect(() => {

        // Define the event handler
        const handleKeyDown = (e: KeyboardEvent) => {

            // API SHORTCUT KEYS  
            if (e.ctrlKey && e.key == 'A' || e.ctrlKey && e.key == 'a') {
                e.preventDefault()
                dispatch(addItems())
              
                    handleScrollToBottom(); // Trigger scroll
                
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
