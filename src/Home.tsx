import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import ImageViewer from "@/ImageViewerComponent"
import EntryForm from "./form/EntryForm"
import { BookOpenIcon, Loader2Icon } from "lucide-react"
import { AppSidebar } from "@/components/sidebarComponents/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,

} from "@/components/ui/sidebar"
import ImageViewerWrapper from "./ImageViewerWrapper"
import TopBar from "./TopBar"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import useRequestEntry from "./hooks/api/useRequestEntry"
import useInstructionLookup from "./hooks/api/useInstructionLookup"

import { useSelector } from "react-redux"
import RejectModal from "./modals/RejectModal"
// import useRefreshToken from "./hooks/api/useRefershToken"

type Props = {}

const Home = (_props: Props) => {
  const navigate = useNavigate();

  const image_data_reducer = useSelector((state: any) => state.image_data_reducer);
  const modal_data_reducer = useSelector((state: any) => state.modal_data_reducer);
  const { request } = useRequestEntry()
  // const {refreshToken} = useRefreshToken()
  const { getInstructions } = useInstructionLookup()
  const [currentImage, setCurrentImage] = useState<string>("")
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false)
  // AUTO REQUEST
  useEffect(() => {
    setTimeout(() => {
      request()
      getInstructions()
    }, 100);
  }, [])

  useEffect(() => {
    if (!Cookies.get("jt")) {
      navigate("/auth")
      return
    };
  }, [])

  useEffect(() => {
    setCurrentImage(image_data_reducer)
  }, [image_data_reducer])

  useEffect(() => {
    if (!modal_data_reducer) return
    setShowRejectModal(modal_data_reducer.rejectModal)
    // console.log(modal_data_reducer.rejectModal)
  }, [modal_data_reducer])



  // //  REFRESH TOKEN
  // useEffect(() => {


  //   // Set up the interval to run the function every 9 minutes (540,000 milliseconds) 540000
  //   const intervalId = setInterval(refreshToken,5000 );
  //   // Clean up the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);
  return (
    <>
      {/* MODALS */}

      <RejectModal setShowRejectModal={setShowRejectModal} showRejectModal={showRejectModal} />

      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-hidden" style={{ height: "100vh" }}>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <div className="flex items-center">
                {/* <SidebarTrigger className="-ml-1" /> */}
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbPage className='font-bold rounded-md bg-slate-600 p-[2px] pl-3 pr-3 text-white'>SEFL</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className='font-semibold text-slate-700' onClick={() => getInstructions()}>Data Entry </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

              </div>

              <TopBar />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-1 pb-1">
            <ResizablePanelGroup
              direction="horizontal"
              className=" rounded-lg border w-full h-[100px]" style={{ boxSizing: "border-box" }}
            >

              <ResizablePanel defaultSize={40} minSize={0} className="border-4 border-slate-800  " >
                <div className="relative z-10 w-fit h-fi t mb-20 ">

                  <div className="flex w-full items-center  justify-center p-6 relative">
                    {
                      JSON.stringify(currentImage) == "{}" ? <div className=" absolute flex top-64 left-52  gap-x-2 items-center">
                        <Loader2Icon className="w-4 h-4 animate-spin" />
                        <p>Loading</p>
                      </div> : currentImage == "" ? <p></p> : <ImageViewerWrapper img={currentImage}>
                        <ImageViewer image={currentImage} alt="temp.jpg" />

                      </ImageViewerWrapper>
                    }

                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={60} minSize={40} >
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={25} className="bg-slate-900">
                    <div className="pl-6 pr-4 mt-3 " >
                      <div className="flex items-center gap-x-3">
                        <BookOpenIcon className="text-slate-200 h-4" />
                        <p className="p-2 pl-0 font-bold text-sm text-white">Billing Information</p>
                      </div>

                      <EntryForm />
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />

                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
            {/* <RouterProvider router={router} /> */}

          </div>
        </SidebarInset>
      </SidebarProvider>
    </>



  )
}

export default Home