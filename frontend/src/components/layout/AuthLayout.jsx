const AuthLayout = ({ children, maxWidth = "max-w-lg" }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white px-4 py-8">
      <div
        className={`mx-auto ${maxWidth} flex min-h-[calc(100vh-4rem)] items-center justify-center`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
