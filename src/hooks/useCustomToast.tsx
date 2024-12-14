// import { getDateTime } from "@/utils/dateUtils"
import { toast } from "sonner"

import { ReactNode } from "react"

const useCustomToast = () => {


    // //  TOAST THAT RETURNS A PROMISE
    // const confirmationToast = (title: string, description: string) => {
    //     return new Promise<boolean>((resolve) => {
    //         hotToast.custom((t:any) => (
    //             <div
    //                 className={`${t.visible ? 'opacity-100' : 'opacity-0'
    //                     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-yellow-800 ring-opacity-5 transition-opacity duration-500`}
    //             >
    //                 <div className="w-full p-4">
    //                     <div className="flex items-center">
    //                         <div className="flex-shrink-0 pt-0.5">
    //                             <CircleHelpIcon className="w-10 h-10 text-yellow-700 animate-bounce" />
    //                         </div>
    //                         <div className="ml-3 flex-1">
    //                             <p className="text-sm font-medium text-yellow-700">{title}</p>
    //                             <p className="mt-1 text-sm text-yellow-700 text-justify">{description}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-l justify-end border-gray-200">
    //                     <button
    //                         onClick={() => {
    //                             hotToast.dismiss(t.id);
    //                             resolve(false); // Close button clicked, resolve with false
    //                         }}
    //                         className="border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm  text-red-700 font-bold "
    //                     >
    //                         Close
    //                     </button>
    //                     <button
    //                         onClick={() => {
    //                             hotToast.dismiss(t.id);
    //                             resolve(true); // Proceed button clicked, resolve with true
    //                         }}
    //                           className="border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm  text-green-700 font-bold "
    //                     >
    //                         Proceed
    //                     </button>
    //                 </div>
    //             </div>
    //         ));
    //     });
    // };

    const successToast = (title: string, description: string) => {
        return toast.success(title, {
            description: description,
            duration: 2000
        });
    }
    const createdToast = (_title: string) => {
        // return toast({
        //     title: title,
        //    // description: getDateTime(),
        // })
    }
    const deactivateToast = (_title: string) => {
        // return toast({
        //     title: title,
        //   //  description: getDateTime(),
        //     className: "  text-white",
        //     duration: 2000
        // })
    }

    const warningToast = (title: string, description: string) => {
        // return toast({
        //     title: title,
        //     description: description,
        //     className: "bg-amber-400 text-black",
        //     duration: 2000
        // })
        return toast.warning(title, {
            description: description,
            duration: 1000
        });
    }

    const errorToast = (title: string, description: string | ReactNode, duration?: number) => {
   
        return toast.error(title, {
            description: description,
            duration: duration || 2000,
         
        });
    }

    const loadingToast = (title: string, description: ReactNode) => {
        // return toast({
        //     title: title,
        //     description: description,
        //     className: "bg-green-400 text-black",
        //     duration: 2000


        // })
        return toast.loading(title, {
            description: description,
            duration: 2000
        });


    }
    const closeToast = (toastId: string) => {
        // After your operation completes, dismiss the toast

        toast.dismiss(toastId);
    };
 
    return {
        createdToast,
        deactivateToast,
        warningToast,
        loadingToast,
        errorToast,
        closeToast,
        successToast
        // confirmationToast
    }
}

export default useCustomToast