const NoInternetConnection = () => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg px-4 py-6">
          <div className="grid place-items-center mb-4">
            <img width={60} src="images/no-internet.svg" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold">No Internet Connection</h1>
            <p>Please check your internet connection and try again.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoInternetConnection;
