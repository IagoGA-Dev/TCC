// * Interface do Card
interface CardProps {
  Icon: any;
  title: string;
  children?: React.ReactNode;
  important?: boolean;
  redirect?: (title: string) => void;
  route?: string;
  date?: string;
}

// * Componente principal
// TODO: Deve ter alguma forma de diminuir o tamanho do código. Mas não quero escrever props.(...) toda hora.
function Card({
  Icon,
  title,
  children,
  important,
  redirect,
  route,
  date = "hoje", // * Valor padrão
}: CardProps) {

  // ! Código em Home vai ficar mais verboso sem o translate.
  // ! Mas honestamente essa função é um crime contra a programação.

  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-lg bg-gradient-to-r from-white to-gray-100 shadow-md cursor-pointer
        hover:shadow-xl transition duration-200 ease-in-out
      ${important ? "relative" : ""}`}
      onClick={() => (redirect && route) && redirect(route)}
    >
      {important && (
        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></div>
      )}
      <div className="flex justify-between items-center">
        <Icon className="w-5 h-5 text-gray-600" />
        <p className="text-xs text-gray-600">{date}</p>
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
