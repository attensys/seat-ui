import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-50">
        <Header />
        <main className="w-full px-4 py-8">
          <Routes>
            <Route path="/" element={<HomeWrapper />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

// Wrapper component to use hooks
function HomeWrapper() {
  const [searchParams] = useSearchParams()
  const host = searchParams.get('host') || 'http://192.168.0.71:7080'
  return <Home host={host} />
}

export default App
