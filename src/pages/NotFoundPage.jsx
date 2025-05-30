import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-2xl font-semibold mb-6">Page Not Found</p>
      <p className="text-lg text-center mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
