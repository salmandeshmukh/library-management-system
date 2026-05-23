import { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import AuthLayout from '../../layouts/AuthLayout'

import { loginUser } from '../../features/authSlice'

function Login() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { loading, error, token } = useSelector(
    (state) => state.auth
  )

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(loginUser(formData))
  }

  useEffect(() => {

    if (token) {
      navigate('/dashboard')
    }

  }, [token, navigate])

  return (
    <AuthLayout>

      <div className="text-center mb-8">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          LMS
        </h1>

        <p className="text-zinc-400 mt-2">
          Smart Library Management System
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="text-sm text-zinc-400">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition"
          />

        </div>

        <div>

          <label className="text-sm text-zinc-400">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition"
          />

        </div>

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition p-3 rounded-lg font-semibold cursor-pointer"
        >

          {loading ? 'Loading...' : 'Login'}

        </button>

      </form>

      <p className="text-center text-zinc-400 mt-6">

        Don’t have an account?

        <Link
          to="/register"
          className="text-blue-500 ml-2 hover:underline"
        >
          Register
        </Link>

      </p>

    </AuthLayout>
  )
}

export default Login