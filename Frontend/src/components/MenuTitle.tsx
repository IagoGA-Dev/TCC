// * Pode ser alterado posteriormente para receber um icone como parametro ao invés de um componente

import React from 'react'

function MenuTitle({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-between p-4 bg-gray-100 border-b-2 max-h-16">
      <div className="flex flex-row items-center gap-4 text-2xl">
        <span style={{ fontSize: '2rem', height: '2rem' }}>{icon}</span>
        <h1 className="text-2xl font-bold text-gray-700 flex flex-row items-center gap-4">
          {title}
        </h1>
      </div>
      {children}
    </div>
  )
} 

export default MenuTitle