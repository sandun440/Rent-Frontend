import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './page/NotFound'
import MaintenancePage from './page/MaintenancePage'
import HomePage from './page/Homepage'
import Dashboard from './page/admin/Dashboard'



function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
