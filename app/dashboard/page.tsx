"use client"

import * as React from "react"
import { AppSidebar } from "../../components/app-sidebar"
import { NavigationProvider, useNavigation } from "../../components/navigation-context"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <NavigationProvider>
      <SidebarProvider>
        <AppSidebar />
        <MainContent />
      </SidebarProvider>
    </NavigationProvider>
  )
}

function MainContent() {
  const { currentFile, currentPath } = useNavigation()

  // Render different content based on the selected file
  const renderContent = () => {
    if (currentFile === "File Map") {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">File Map</h2>
          <p>This is the file map view showing an overview of all your files.</p>
        </div>
      )
    } else if (currentFile === "Account") {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
          <p>Manage your account preferences and personal information.</p>
        </div>
      )
    } else if (currentFile === "Settings") {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">System Settings</h2>
          <p>Configure application settings and preferences.</p>
        </div>
      )
    } else {
      // Default file view
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{currentFile}</h2>
          <p>Viewing file content for {currentFile}</p>
          <div className="mt-4 p-4 border rounded-md bg-muted/20">
            <p>
              File path: {currentPath.join(" / ")} / {currentFile}
            </p>
          </div>
        </div>
      )
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {currentPath.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{currentFile}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <button className="ml-auto flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-upload"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          Upload File
        </button>
      </header>
      <div className="flex flex-1 flex-col">{renderContent()}</div>
    </SidebarInset>
  )
}

