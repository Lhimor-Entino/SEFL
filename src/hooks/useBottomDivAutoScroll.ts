import { useRef } from "react";

const useBottomDivAutoScroll = () => {
    const divRef =  useRef<HTMLDivElement>(null);
    const handleScrollToBottom = () => {
        console.log(divRef)
        // Scroll to the bottom using the ref
        if (divRef.current) {
            divRef.current.scrollIntoView({
                behavior: "smooth", // Smooth scrolling
                // block: "end", // Scroll to the end of the container
            });
        }
    };
    return {
        divRef,
        handleScrollToBottom
    }

}

export default useBottomDivAutoScroll