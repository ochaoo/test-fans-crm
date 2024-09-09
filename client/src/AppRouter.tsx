import { Routes, Route } from 'react-router-dom'
import Auth from './components/Auth'
import User from './components/User'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/user" element={<User />} />
        </Routes>
    )
}

export default AppRouter
