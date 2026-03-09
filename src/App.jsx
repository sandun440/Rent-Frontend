import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./page/NotFound";
import MaintenancePage from "./page/MaintenancePage";
import HomePage from "./page/Homepage";
import Dashboard from "./page/admin/Dashboard";
import Bicycles from "./page/admin/Bicycles";
import Users from "./page/admin/Users";
import Orders from "./page/admin/Orders";
import Login from "./page/Login";
import Register from "./page/Register";
import Profile from "./page/Profile";
import { Navigate, Outlet } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
  }
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user.type !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/maintenance" element={<MaintenancePage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminLayout>
                  <Outlet />
                </AdminLayout>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="bicycles" element={<Bicycles />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
