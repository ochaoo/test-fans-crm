import { createContext, useState, useContext, ReactNode } from 'react'
import { jwtDecode, JwtPayload } from 'jwt-decode'

interface User {
    email: string
    name: string
    id: number
}

interface UserContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (email: string, name: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
}

export interface CustomJwtPayload extends JwtPayload {
    email: string
    name: string
    id: number
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                throw new Error('Failed to log in')
            }

            const data: string = await response.json()

            const user: CustomJwtPayload = jwtDecode(data)

            setUser({ email: user.email, name: user.name, id: user.id })
            localStorage.setItem('token', data)
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    const register = async (email: string, name: string, password: string) => {
        try {
            const response = await fetch('/api/v1/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, name, password })
            })

            if (!response.ok) {
                throw new Error('Failed to register')
            }

            const data: string = await response.json()

            const user: CustomJwtPayload = jwtDecode(data)

            setUser({ email: user.email, name: user.name, id: user.id })
            localStorage.setItem('token', data)
        } catch (error) {
            console.error('Registration error:', error)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }

    const isAuthenticated = !!user

    return <UserContext.Provider value={{ user, login, register, logout, isAuthenticated }}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
