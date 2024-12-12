
import { useEffect } from 'react';

const useNavigationKeyboardHooks = () => {

 
    useEffect(() => {

        // Define the event handler
        const handleKeyDown = (e: KeyboardEvent) => {

            // Get all input elements on the page
            const focusableElements = 'input,select'; // You can adjust this to include more elements like buttons, etc.
            const elements = Array.from(document.querySelectorAll(focusableElements)) as HTMLElement[];

            // Sort elements by tabIndex
            const sortedElements = elements
                .filter((element) => element.tabIndex > 0) // Only consider elements with a positive tabIndex
                .sort((a, b) => a.tabIndex - b.tabIndex);  // Sort by tabIndex in ascending order

            // Get the currently focused element
            const currentElement = document.activeElement as HTMLElement | null;
            if (!currentElement) return;  // If no element is focused, do nothing

            // Find the index of the currently focused element in the sorted list
            const currentElementIndex = sortedElements.indexOf(currentElement);


            if (e.key === 'Enter') {
                e.preventDefault();
               
                // For Enter, focus the next element (if it exists)
                const nextElement = sortedElements[currentElementIndex + 1];
                if (nextElement) {
                    nextElement.focus();
                }


            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                // For Arrow Down, focus the previous element (if it exists)
                const prevElement = sortedElements[currentElementIndex - 1];
                if (prevElement) {
                    prevElement.focus();
                }
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                // For Arrow Up, focus the next element (if it exists)
                const nextElement = sortedElements[currentElementIndex + 1];
                if (nextElement) {
                    nextElement.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

};

export default useNavigationKeyboardHooks;
