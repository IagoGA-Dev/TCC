interface TodoTextProps {
  text: string;
};

function TodoText({ text }: TodoTextProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold text-gray-700">{text}</h1>
    </div>
  )
}

export default TodoText