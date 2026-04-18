import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Dashboard } from "./pages/Dashboard"

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}
