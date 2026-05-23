function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-lg">

        {children}

      </div>

    </div>
  )
}

export default AuthLayout