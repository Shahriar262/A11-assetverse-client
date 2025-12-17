import { Link, useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'

const RegisterEmployee = () => {
  const { createUser, updateUserProfile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const dateOfBirth = form.dateOfBirth.value

    try {
      await createUser(email, password)
      await updateUserProfile(name, null)

      const employeeUser = {
        name,
        email,
        dateOfBirth,
        role: 'employee',
      }

      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(employeeUser),
      })

      toast.success('Employee account created')
      navigate('/login')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md w-[94%] md:w-full p-6 mt-6 md:mt-0 shadow-lg rounded-md sm:p-10 bg-white text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Register as Employee</h1>
          <p className='text-sm text-gray-400'>
            Create your personal account
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <input name='name' required placeholder='Full Name' className='input' />
          <input
            type='email'
            name='email'
            required
            placeholder='Personal Email'
            className='input'
          />
          <input
            type='password'
            name='password'
            required
            minLength={6}
            placeholder='Password'
            className='input'
          />
          <input
            type='date'
            name='dateOfBirth'
            required
            className='input'
          />

          <button className='bg-indigo-600 w-full rounded-md py-3 text-white'>
            {loading ? (
              <TbFidgetSpinner className='animate-spin m-auto' />
            ) : (
              'Register as Employee'
            )}
          </button>
        </form>

        <p className='px-6 text-sm text-center text-gray-400 mt-4'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-indigo-500 text-gray-600'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterEmployee
