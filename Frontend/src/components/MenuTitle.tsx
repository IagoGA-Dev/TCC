// TODO: Melhorar a aparência desse componente.
// TODO: Verificar a razão do icone não estar com o mesmo height do texto.

import React from 'react'

function MenuTitle({ icon, title, children }: { icon: any, title: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-between p-4 bg-gray-100 border-b-2 max-h-16">
      <div className="flex flex-row items-center gap-4 text-2xl">
      {icon}
      <h1 className="text-2xl font-bold text-gray-700 flex flex-row items-center gap-4">
        {title}
      </h1>
      </div>
      {children}
    </div>
  )
}

export default MenuTitle