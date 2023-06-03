import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

type IconType = React.ElementType<typeof AiOutlineCheckCircle>;

// * Interface do Card
interface CardProps {
  Icon?: IconType;
  title?: string;
  children?: React.ReactNode;
  important?: boolean;
  redirect?: (title: string) => void;
  route?: string;
  date?: string;
  className?: string;
  applyDefaultClassNames?: boolean;
  onClick?: () => void;
}

// * Componente principal
function Card({
  Icon,
  title,
  children,
  important,
  redirect,
  route,
  date,
  className,
  applyDefaultClassNames = true,
  onClick,
}: CardProps) {

  return (
    // ? Da para alterar o estilo do icone de importante posteriormente para deixar mais visivel.
    <div
      className={`
        rounded-lg bg-gradient-to-r from-white to-gray-100 shadow-md
        hover:shadow-xl transition duration-200 ease-in-out
        ${applyDefaultClassNames ? `flex flex-col gap-2 p-4 cursor-pointer` : ''}
        ${className ? className : ""}
        ${important ? `relative` : ""}
      `}
      onClick={() => (onClick && onClick()) || (redirect && route) && redirect(route)}
    >
      {important && (
        <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500"></div>
      )}
      <div className="flex justify-between items-center">
        {Icon && <Icon className="w-5 h-5 text-gray-600" />}
        {date && <p className="text-xs text-gray-600">{date}</p>}
      </div>
      <div className="flex flex-col gap-2">
        {title && <p className="text-xl font-bold">{title}</p>}
        {children}
      </div>
    </div>
  );
}

export default Card;
