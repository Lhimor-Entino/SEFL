

import * as React from "react"
import {
 
  BookOpen,
  Bot,
  
  Frame,

  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"


import { NavUser } from "@/components/sidebarComponents/nav-user"
import { TeamSwitcher } from "@/components/sidebarComponents/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,

} from "@/components/ui/sidebar"
import Cookies from "js-cookie"
import SeflLogo from "@/assets/img/sefl_logo.png"
import DdcLogo from "@/assets/img/ddc.png"
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "SEFL",
      logo: SeflLogo,
      plan: "Freight",
    },
    {
      name: "FPOSI",
      logo: DdcLogo,
      plan: "DDC PHIL.",
    },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
 
  const isOpen = Cookies.get("sidebar:state")
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} /> */}
 
        {
          isOpen !=="true" ? 
          <div className="flex flex-col mt-12 ">
            <p className="rotate-90 mt-10 font-serif  tracking-[6px] ">
              Southeastern
            </p>
            <p className="rotate-90 mt-40 font-serif tracking-[6px]">
              Freight
            </p>
            <p className=" rotate-90 mt-24 font-serif  tracking-[6px]">
              Lines
            </p>
          </div> : 
          <div className="mt-4">
            <p className=" mt-10 font-serif text-center  tracking-[6px]">
              Southeastern  Freight
            </p>
            <p className=" text-center font-serif  tracking-[6px]">
              Lines
            </p>

            <div className=" flex justify-center mt-5">
              <img src={SeflLogo} alt="logo-sefl" className=" w-56 " />
            </div>
          </div>
        }




      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
