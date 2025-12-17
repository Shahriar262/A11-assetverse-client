import { Link, useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'

const RegisterHR = () => {
  const { createUser, updateUserProfile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const form = e.target
    const name = form.name.value
    const companyName = form.companyName.value
    const companyLogo = form.companyLogo.value
    const email = form.email.value
    const password = form.password.value
    const dateOfBirth = form.dateOfBirth.value

    try {
      await createUser(email, password)
      await updateUserProfile(name, companyLogo)

      const hrUser = {
        name,
        companyName,
        companyLogo,
        email,
        dateOfBirth,
        role: 'hr',
        packageLimit: 5,
        currentEmployees: 0,
        subscription: 'basic',
      }

      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(hrUser),
      })

      toast.success('HR account created successfully')
      navigate('/login')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen mt-6'>
      <div className='flex flex-col max-w-md w-[94%] md:w-full p-6 rounded-md sm:p-10 shadow-lg bg-white text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Register as HR</h1>
          <p className='text-sm text-gray-400'>
            Create your company account
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <input name='name' required placeholder='Full Name' className='input' />
          <input
            name='companyName'
            required
            placeholder='Company Name'
            className='input'
          />
          <input
            name='companyLogo'
            required
            placeholder='Company Logo URL'
            className='input'
          />
          <input
            type='email'
            name='email'
            required
            placeholder='Company Email'
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
              'Register as HR'
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

export default RegisterHR
