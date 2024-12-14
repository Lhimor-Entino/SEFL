import { useRef } from "react";

const useBottomDivAutoScroll = () => {
    const divRef =  useRef<HTMLDivElement>(null);
    const divRef2 =  useRef<HTMLDivElement>(null);
    const divRef3 = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const handleScrollToTop = () => {
    
        // Scroll to the bottom using the ref
        if (topRef.current) {
            topRef.current.scrollIntoView({
                behavior: "smooth", // Smooth scrolling
            });
        }
    };
    const handleScrollToBottom = () => {
    
        // Scroll to the bottom using the ref
        if (divRef.current) {
            divRef.current.scrollIntoView({
                behavior: "smooth", // Smooth scrolling
            });
        }
    };
    const handleScrollToBottomRef = () => {
      
        if (divRef2.current) {
            divRef2.current.scrollIntoView({
                behavior: "smooth", // Smooth scrolling
            });
        }
    };
    const handleScrollToBottomCharge = () => {
      
        if (divRef3.current) {
            divRef3.current.scrollIntoView({
                behavior: "smooth", // Smooth scrolling
            });
        }
    };
    return {
        divRef,
        divRef2,
        divRef3,
        topRef,
        handleScrollToBottom,
        handleScrollToBottomRef,
        handleScrollToBottomCharge,
        handleScrollToTop
    }

}

export default useBottomDivAutoScroll