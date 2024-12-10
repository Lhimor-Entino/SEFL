
import {

  ChevronsUpDown,
  CreditCard,
  LogOut,
 
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Cookies from "js-cookie"
import UserIcon from "@/assets/img/computer-user-icon-28.png"
import { useState } from "react"
import LogoutModal from "@/modals/LogoutModal"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const [loggingOut,setLoggingOut] = useState<boolean>(false)

  return (
    <>

      <LogoutModal loggingOut={loggingOut} setLoggingOut={setLoggingOut} />
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={UserIcon} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                
                <span className="truncate font-semibold">{Cookies.get('user')}</span>
                <span className="truncate text-xs">{Cookies.get('role')}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" /> 
           
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={UserIcon} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>

                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{Cookies.get('user')?.toLocaleUpperCase()}</span>
                  <span className="truncate text-[10px]">{Cookies.get('role')}</span>
                </div>
              </div>
            </DropdownMenuLabel>
    
            <DropdownMenuGroup>
           
              <DropdownMenuItem>
                <CreditCard />
               <p> Cliet : </p>
                {Cookies.get('client')}
              </DropdownMenuItem>
        
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLoggingOut(true)}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>

    </>
  )
}
