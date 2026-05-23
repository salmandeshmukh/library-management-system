import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import AuthLayout from '../../layouts/AuthLayout'

import { registerUser } from '../../features/authSlice'

function Register() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { loading, error } = useSelector(
    (state) => state.auth
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const result = await dispatch(
      registerUser(formData)
    )

    if (result.meta.requestStatus === 'fulfilled') {

      setSuccess(true)

      setTimeout(() => {
        navigate('/')
      }, 1500)
    }
  }

  return (
    <AuthLayout>

      <div className="text-center mb-8">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          LMS
        </h1>

        <p className="text-zinc-400 mt-2">
          Create your account
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="text-sm text-zinc-400">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition"
          />

        </div>

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
            placeholder="Create password"
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

        {success && (
          <p className="text-green-500 text-sm">
            Registration successful
          </p>
        )}

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition p-3 rounded-lg font-semibold cursor-pointer"
        >

          {loading ? 'Loading...' : 'Register'}

        </button>

      </form>

      <p className="text-center text-zinc-400 mt-6">

        Already have an account?

        <Link
          to="/"
          className="text-blue-500 ml-2 hover:underline"
        >
          Login
        </Link>

      </p>

    </AuthLayout>
  )
}

export default Register