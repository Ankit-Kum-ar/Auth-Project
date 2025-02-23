import FloatingShape from "./components/FloatingShape"
import { Routes, Route, Navigate } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import EmailVerification from "./pages/EmailVerification"
import { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./redux/slices/authSlice"
import Dashboard from "./pages/Dashboard"
import LoadingSpinner from "./components/LoadingSpinner"

// Redirect unauthenticated user to login page
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);

  if (!isAuthenticated ) {
    return <Navigate to="/login" replace />;
  }

  if( !user.isVerified ) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
}

// Redirect authenticated user to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
}


function App() {
  const dispatch = useDispatch();
  const {isCheckingAuth, isAuthenticated, user } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isCheckingAuth) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
        <Route 
          path="/" 
          element= {
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/signup" 
          element={
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>
          } 
        />
        <Route 
          path="/login" 
          element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
          } 
        />
        <Route 
          path="/verify-email" 
          element={
          <RedirectAuthenticatedUser>
            <EmailVerification />
          </RedirectAuthenticatedUser>
          } 
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
