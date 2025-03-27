
import ProtectedRoute from "@/components/ProtectedRoute";
import { ImageCountProvider } from "@/context/ImageCountContext";
import { SidebarProvider } from "@/context/SidebarContext";
import DashboardLayout from "@/layouts/dashboardLayout";


export default function Layout({ children }) {

  return(
    <ProtectedRoute>
      <SidebarProvider>
      <DashboardLayout>{children}</DashboardLayout>;
    </SidebarProvider>
    </ProtectedRoute>
    
 
  )
  
}
