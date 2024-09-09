import { useUser } from './UserContext'
import { useNavigate } from 'react-router-dom'

const User = () => {
    const { user, isAuthenticated, logout } = useUser()
    const navigate = useNavigate()

    if (!isAuthenticated) {
        return <p>Please login first.</p>
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div>
            <h1>User Info</h1>
            <p>Email: {user?.email}</p>
            <p>Name: {user?.name}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default User
