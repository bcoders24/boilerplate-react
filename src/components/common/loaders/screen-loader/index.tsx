const ScreenLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-200 z-10">
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-primary rounded-full" />
        <div className="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-ping" />
        <div className="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-pulse" />
      </div>
    </div>
  );
};

export default ScreenLoader;
