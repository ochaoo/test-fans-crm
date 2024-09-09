import AppRouter from './AppRouter'
import { UserProvider } from './components/UserContext'

function App() {
    return (
        <UserProvider>
            <AppRouter></AppRouter>
        </UserProvider>
    )
}

export default App
