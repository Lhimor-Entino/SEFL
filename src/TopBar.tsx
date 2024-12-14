import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ArrowDownFromLineIcon, ArrowLeftCircleIcon, ArrowLeftFromLineIcon, ArrowRightCircleIcon, ArrowRightFromLineIcon, ArrowUpCircleIcon, ArrowUpFromLineIcon, BookMarkedIcon, BookmarkXIcon, FileCog2Icon, FlipHorizontal2Icon, HardDriveDownloadIcon, KeyboardMusicIcon, LayoutListIcon, ListRestartIcon, PencilLine, RadioTowerIcon, RefreshCcwDot, RefreshCcwIcon, Rotate3dIcon, RotateCcwIcon, ScrollTextIcon, ViewIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react"
import useSaveEntry from "./hooks/api/useSaveEntry"
import useRequestEntry from "./hooks/api/useRequestEntry"
import { hasPendingRequest, isAutoRequest, setAutoRequest } from "./lib/requestValidationUtil"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Cookies from "js-cookie"
import { useEffect, useRef, useState } from "react"

import { changeModalData } from "./store/modalReducer"
import { useDispatch } from "react-redux"
import useInstructionLookup from "./hooks/api/useInstructionLookup"
type Props = {}

const TopBar = (_props: Props) => {
  const { saveEntry } = useSaveEntry()
  const dispatch = useDispatch()
  const { request } = useRequestEntry()
  const { getInstructions } = useInstructionLookup()
  const [isAuto, setIsAuto] = useState<boolean>()
  const autoRef = useRef(isAuto)
  const handleChange = () => {
    if (!Cookies.get("auto_request")) {
      setAutoRequest("1")
      return
    }
    if (Cookies.get("auto_request") == "1") {
      setAutoRequest("0")
    } else {
      setAutoRequest("1")
    }

    setIsAuto(isAutoRequest())
  }
  useEffect(() => {
    let is_auto: boolean = isAutoRequest()


    setIsAuto(is_auto)
    autoRef.current = is_auto
  }, [])
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
            <MenubarItem
              disabled={hasPendingRequest()}
              onClick={() => dispatch(changeModalData({ property: "rejectModal" }))}
            >
              <BookmarkXIcon className="h-4 w-4 mr-2" />  Reject <MenubarShortcut>F3</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              disabled={hasPendingRequest()} onClick={() => getInstructions()}
            >
              <ListRestartIcon className="h-4 w-4 mr-2" />  Reload Instruction <MenubarShortcut className="ml-3">⌘+F7</MenubarShortcut>
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
            <MenubarItem
            // disabled={requesting} onClick={() => changeImg(currentPageRef.current - 1)}
            >
              <ArrowLeftFromLineIcon className="h-4 w-4 mr-2" />Move Left <MenubarShortcut>Shift + 🡠
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem
            // disabled={requesting} onClick={() => changeImg(currentPageRef.current - 1)}
            >
              <ArrowRightFromLineIcon className="h-4 w-4 mr-2" />Move Right <MenubarShortcut>Shift + 🡢
              </MenubarShortcut>
            </MenubarItem>
               <MenubarItem
            // disabled={requesting} onClick={() => changeImg(currentPageRef.current - 1)}
            >
              <ArrowUpFromLineIcon className="h-4 w-4 mr-2" />Move Up <MenubarShortcut>Shift +  🡡
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem
            // disabled={requesting} onClick={() => changeImg(currentPageRef.current - 1)}
            >
              <ArrowDownFromLineIcon className="h-4 w-4 mr-2" />Move Down <MenubarShortcut>Shift +  🡣
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

        <MenubarMenu>
          <MenubarTrigger className="  text-slate-900"> <KeyboardMusicIcon className="w-4 h-4 mr-2" /> Hot Keys</MenubarTrigger>
          <MenubarContent >
            <MenubarItem
            //disabled={requesting} 
            >
              <BookMarkedIcon className="w-4 h-4 mr-2" />
              Add Reference <MenubarShortcut>Alt + A</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <ScrollTextIcon className="w-4 h-4 mr-2 " />
              Add Accessorials <MenubarShortcut className="ml-5" >Alt + C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <LayoutListIcon className="w-4 h-4 mr-2" />
              Add Item <MenubarShortcut>Ctrl + Insert</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <ArrowRightCircleIcon className="w-4 h-4 mr-2" />
             Next Field <MenubarShortcut>Arrow Up</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <ArrowLeftCircleIcon className="w-4 h-4 mr-2" />
             Prev Field <MenubarShortcut>Arrow Down</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <ArrowUpCircleIcon className="w-4 h-4 mr-2" />
             Scroll Top<MenubarShortcut>Ctrl + Alt + T</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

      </Menubar>

      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" onClick={() => handleChange()} checked={isAuto} />
        <Label htmlFor="airplane-mode">Auto Request</Label>
      </div>
    </div>


  )
}

export default TopBar