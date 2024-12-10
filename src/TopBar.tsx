import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ArrowLeftCircleIcon, ArrowRightCircleIcon,FileCog2Icon, FlipHorizontal2Icon, HardDriveDownloadIcon, ListRestartIcon, PencilLine, RadioTowerIcon, RefreshCcwDot, RefreshCcwIcon, Rotate3dIcon, RotateCcwIcon, ViewIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react"
import useSaveEntry from "./hooks/api/useSaveEntry"
import useRequestEntry from "./hooks/api/useRequestEntry"
import { hasPendingRequest, isAutoRequest, setAutoRequest } from "./lib/requestValidationUtil"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Cookies from "js-cookie"
import { useState } from "react"
type Props = {}

const TopBar = (_props: Props) => {
  const { saveEntry } = useSaveEntry()

  const { request } = useRequestEntry()
  const [isAuto,setIsAuto] = useState<boolean>()
  const handleChange = () => {
    if(!Cookies.get("auto_request")){
      setAutoRequest("1")
      return
    }
    if(Cookies.get("auto_request") == "1"){
      setAutoRequest("0")
    }else{
      setAutoRequest("1")
    }

    setIsAuto(isAutoRequest())
  }
  return (
    <div className="flex gap-x-5">
      <Menubar className="border-none text-white dark:text-slate-950 " >
        <MenubarMenu >
          <MenubarTrigger className="text-slate-900"><FileCog2Icon className="w-4 h-4 mr-1 " /> File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              disabled={hasPendingRequest()}
              onClick={() => saveEntry()}
            >
              <HardDriveDownloadIcon className="h-4 w-4 mr-2" />  Save <MenubarShortcut>F2</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              disabled={hasPendingRequest()} onClick={() => request()}
            >
              <RadioTowerIcon className="h-4 w-4 mr-2" />  Request <MenubarShortcut>F1</MenubarShortcut>
            </MenubarItem>
            {/* <MenubarItem
              disabled={hasPendingRequest()} onClick={() => reject()}
            >
              <BookmarkXIcon className="h-4 w-4 mr-2" />  Reject <MenubarShortcut>F3</MenubarShortcut>
            </MenubarItem> */}
            <MenubarItem
            //disabled={requesting} onClick={() => reloadData()}
            >
              <ListRestartIcon className="h-4 w-4 mr-2" />  Reload Data <MenubarShortcut>⌘+F7</MenubarShortcut>
            </MenubarItem>

          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu >
          <MenubarTrigger className="text-slate-900"><PencilLine className="h-4 w-4 mr-2" /> Image Control</MenubarTrigger>
          <MenubarContent >
            <MenubarItem //disabled={requesting} 
            >
              <Rotate3dIcon className="w-4 h-4 mr-2" />  Rotate Left <MenubarShortcut>⌘+L</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
            //disabled={requesting} 
            >
              <FlipHorizontal2Icon className="w-4 h-4 mr-2" /> Flip <MenubarShortcut>⌘+F</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
            //disabled={requesting}  
            >
              <ZoomInIcon className="w-4 h-4 mr-2" />  Zoom In <MenubarShortcut>⌘+I</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
            //disabled={requesting} 
            >
              <ZoomOutIcon className="w-4 h-4 mr-2" />    Zoom Out <MenubarShortcut>⌘+O</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
            //disabled={requesting}  
            >
              <RotateCcwIcon className="w-4 h-4 mr-2" />   Reset <MenubarShortcut>⌘+S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
            //disabled={requesting} onClick={() => refetchImg()}
            >
              <RefreshCcwDot className="h-4 w-4 mr-2" />  Reload Image <MenubarShortcut>F4</MenubarShortcut>
            </MenubarItem>
            <MenubarItem className="flex"
            //disabled={requesting} onClick={() => changeImg(currentPageRef.current + 1)}
            >
              <ArrowRightCircleIcon className="h-4 w-4 mr-2" />  Next Image <MenubarShortcut>Ctrl + 🡢</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
            // disabled={requesting} onClick={() => changeImg(currentPageRef.current - 1)}
            >
              <ArrowLeftCircleIcon className="h-4 w-4 mr-2" />  Prev Image <MenubarShortcut>Ctrl + 🡠
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="  text-slate-900"> <ViewIcon className="w-4 h-4 mr-2" /> View</MenubarTrigger>
          <MenubarContent >
            <MenubarItem
            //disabled={requesting} 
            >
              <RefreshCcwIcon className="w-4 h-4 mr-2" />
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>

            <MenubarSeparator />
            <MenubarItem
            //disabled={requesting} onClick={() => dispatch(toggleFullscreen())}
            >
              {/* {fullscreen ? <ShrinkIcon className="w-4 h-4 mr-2" /> : <FullscreenIcon className="w-4 h-4 mr-1" />}Toggle Fullscreen */}
            </MenubarItem>
            <MenubarItem
            //disabled={requesting} onClick={() => dispatch(toggleImageViewer())} 
            >
              {/* {showImageViewer ? <Image className="w-4 h-4 mr-2" /> : <FullscreenIcon className="w-4 h-4 mr-1" />}Toggle Image Viewer */}
            </MenubarItem>
            <MenubarSeparator />

          </MenubarContent>
        </MenubarMenu>



      </Menubar>

      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" onClick={()=> handleChange()} checked={isAuto}/>
        <Label htmlFor="airplane-mode">Auto Request</Label>
      </div>
    </div>


  )
}

export default TopBar