import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/auth/authThunks'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error, isAuthenticated } = useSelector(state => state.auth)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(register(form))
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit" disabled={loading}>Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default Register
