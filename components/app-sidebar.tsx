"use client"

import type * as React from "react"
import { ChevronRight, File, Folder, Map, Settings, User } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useNavigation } from "./navigation-context"

// This is sample data.
const data = {
  tree: [
    ["Work", ["Resume.pdf",]],
    ["School", ["Junior Year", "File1.docx", "File2.docx"], "File3.docx", "File4.docx"],
    ["Personal", ["util.ts"]],
    ["Other", "favicon.ico", "vercel.svg"],
    "RootFile.pdf",
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setCurrentFile, setCurrentPath } = useNavigation()

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    setCurrentFile("File Map")
                    setCurrentPath(["General"])
                  }}
                >
                  <Map size={18} />
                  <span>File Map</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    setCurrentFile("Account")
                    setCurrentPath(["General"])
                  }}
                >
                  <User size={18} />
                  <span>Account</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    setCurrentFile("Settings")
                    setCurrentPath(["General"])
                  }}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.tree.map((item, index) => (
                <Tree key={index} item={item} path={[]} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

function Tree({ item, path }: { item: string | any[]; path: string[] }) {
  const { currentFile, setCurrentFile, currentPath, setCurrentPath, openFolders, toggleFolder } = useNavigation()
  const [name, ...items] = Array.isArray(item) ? item : [item]
  const currentItemPath = [...path, name]
  const isFolder = items.length > 0
  const isOpen = openFolders.has(name)

  if (!isFolder) {
    return (
      <SidebarMenuButton
        isActive={currentFile === name}
        className="data-[active=true]:bg-transparent"
        onClick={() => {
          setCurrentFile(name)
          setCurrentPath(path)
        }}
      >
        <File />
        {name}
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        open={isOpen}
        onOpenChange={(open) => toggleFolder(name)}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            onClick={(e) => {
              // Prevent the default behavior to avoid navigation
              e.preventDefault()
              toggleFolder(name)
            }}
          >
            <ChevronRight className="transition-transform" />
            <Folder />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} path={currentItemPath} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

