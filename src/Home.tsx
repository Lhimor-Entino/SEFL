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
  SidebarTrigger,
} from "@/components/ui/sidebar"
import ImageViewerWrapper from "./ImageViewerWrapper"
import TopBar from "./TopBar"
import { useEffect, useLayoutEffect, useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import useRequestEntry from "./hooks/api/useRequestEntry"
import useInstructionLookup from "./hooks/api/useInstructionLookup"
import { getImg } from "./lib/cookieUtils"
import { useSelector } from "react-redux"

type Props = {}

const Home = (props: Props) => {
  const navigate = useNavigate();
  const image_data_reducer = useSelector((state: any) => state.image_data_reducer);
  const { request } = useRequestEntry()
  const {getInstructions} = useInstructionLookup()
  const [currentImage,setCurrentImage] = useState<string>("")
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

  },[image_data_reducer])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden" style={{ height: "100vh" }}>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between gap-2 px-4 w-full">
            <div className="flex items-center">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage className='font-bold rounded-md bg-slate-600 p-[2px] pl-3 pr-3 text-white'>SEFL</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className='font-semibold text-slate-700' onClick={() => getInstructions()}>Data Entry</BreadcrumbPage>
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
                      <Loader2Icon className="w-4 h-4 animate-spin"/>
                      <p>Loading</p>
                      </div> :  <ImageViewerWrapper img={currentImage}>
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


  )
}

export default Home