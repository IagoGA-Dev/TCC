function Error({ children: message }: { children: string }) {
  return (
    <div
      className="fixed bottom-0 right-0 mb-4 mr-4 bg-red-500 text-white p-3 rounded-sm shadow-md">
      {message}
    </div>
  );
}

export default Error;
