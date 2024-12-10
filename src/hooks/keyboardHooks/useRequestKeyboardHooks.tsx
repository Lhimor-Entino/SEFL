
import { useEffect } from 'react';
import useSaveEntry from '../api/useSaveEntry';
import useCustomToast from '../useCustomToast';

import useRequestEntry from '../api/useRequestEntry';
import useRejectEntry from '../api/useRejectEntry';
import { hasOngoingRequest } from '@/lib/requestValidationUtil';
import { hasLoginUser } from '@/lib/cookieUtils';




const useRequestKeyboardHooks = () => {
    const { errorToast, warningToast } = useCustomToast()
    const { saveEntry } = useSaveEntry(); // Call your custom hook
    // Use the custom hook to fetch the data
    const { request } = useRequestEntry();
    const { reject } = useRejectEntry();

    useEffect(() => {

        // Define the event handler
        const handleKeyDown = (e: KeyboardEvent) => {

            // API SHORTCUT KEYS  
            if (e.key === 'F1') {
                e.preventDefault()
                if (!hasLoginUser()) {
                    warningToast("Session Expired", "Please Relogin")
                    setTimeout(() => {
                        window.location.href = "/sefl/entry/auth"
                    }, 1000)

                    return

                }
                if (hasOngoingRequest()) { // CHECK IF HAS ONGOING REQUEST
                    errorToast("Ongoing Request", "Please finish your pending request.")
                    return
                }
                request() //REQUEST ENRTY HERE
            }
            if (e.key === 'F2') {
                e.preventDefault();
                if (!hasLoginUser()) {
                    warningToast("Session Expired", "Please Relogin")
                    setTimeout(() => {
                        window.location.href = "/sefl/entry/auth"
                    }, 1000)

                    return

                }
                saveEntry()

            }
            if (e.key === 'F3') {
                e.preventDefault();
                if (!hasLoginUser()) {
                    warningToast("Session Expired", "Please Relogin")
                    setTimeout(() => {
                        window.location.href = "/sefl/entry/auth"
                    }, 1000)

                    return

                }
                reject() // REJECT ENTRY
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

};

export default useRequestKeyboardHooks;
