import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Discover } from './pages/Discover'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { Search } from './pages/Search'
import { List } from './pages/List'
import { useConfiguration } from './hooks/useConfiguration'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function AppContent() {
  // Initialize configuration on app load
  useConfiguration()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
