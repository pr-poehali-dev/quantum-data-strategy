import { ReactNode } from 'react'
import { Squares } from "./squares-background"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-[#0A0A0A] relative">
      <div className="absolute inset-0 z-10">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="#1a1a1a"
          hoverFillColor="#FF6B35"
        />
      </div>
      <div className="relative z-20 h-full">
        {children}
      </div>
      <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity">
        <img
          src="https://cdn.poehali.dev/projects/08341ff5-14f0-4b08-977f-303dbba6a0b3/files/fc3221f0-7cbc-423c-aef0-0fc8deb1ab8a.jpg"
          alt="Импульс"
          className="w-12 h-12 rounded-xl object-cover shadow-lg"
        />
        <span className="text-white text-base font-bold tracking-wide drop-shadow-lg">Импульс</span>
      </div>
    </div>
  )
}