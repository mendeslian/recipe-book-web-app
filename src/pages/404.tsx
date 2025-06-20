import { Home } from "lucide-react";

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-neutral-800 mb-2">404</h1>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold text-neutral-800">
            Page Not Found
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <Home size={18} />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
