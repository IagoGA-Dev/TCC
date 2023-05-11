interface CardProps {
  Icon: any;
  title: string;
  children?: React.ReactNode;
  important?: boolean;
}

function Card({ Icon, title, children, important }: CardProps) {
  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-lg bg-gradient-to-r from-white to-gray-100 shadow-md cursor-pointer
        hover:shadow-xl transition duration-200 ease-in-out
      ${
        important ? "relative" : ""
      }`}
    >
      {important && (
        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></div>
      )}
      <div className="flex justify-between items-center">
        <Icon className="w-5 h-5 text-gray-600" />
        <p className="text-xs text-gray-600">Hoje</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">{title}</p>
        {/* <p className="text-xs text-gray-600">{value}</p> */}
        {children}
      </div>
    </div>
  );
}

export default Card;
