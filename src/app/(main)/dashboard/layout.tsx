import { AppStateProvider } from '@/lib/providers/state-provider';
import React from 'react'

interface LayoutProps{
    children:React.ReactNode;
    params:any;
}

const Layout:React.FC<LayoutProps> = ({children,params}) => {
  return (
    <AppStateProvider>
             {children}
           </AppStateProvider>
  )
}

export default Layout