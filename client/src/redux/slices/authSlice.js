import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://auth-project-backend-ic3g.onrender.com/auth'

axios.defaults.withCredentials = true

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, name })
      return response.data
    } catch (error) {
      // "rejectWithValue" allows us to return a custom error payload
      return rejectWithValue(
        error?.response?.data?.message || 'Error signing up'
      )
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Error logging in'
      )
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`)
      return {} // No data needed on success
    } catch {
      return rejectWithValue('Error logging out')
    }
  }
)

export const verifyEmail = createAsyncThunk(
  'auth/verify-email',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Error verifying email'
      )
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/check-auth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`)
      return response.data
    } catch(error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Error checking authentication'
      )
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgot-Password',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Error sending reset password email'
      )
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/reset-Password',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password
      })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Error resetting password'
      )
    }
  }
)

// -------------------------------------------
// Initial State
// -------------------------------------------
const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null
}

// -------------------------------------------
// Slice
// -------------------------------------------
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // If you have any synchronous actions, define them here.
    // For example, to reset your message or error, you could do:
    resetError: (state) => {
      state.error = null
    },
    resetMessage: (state) => {
      state.message = null
    }
  },
  extraReducers: (builder) => {
    // signup
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // verifyEmail
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Error verifying email'
      })

      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true
        state.error = null
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false
        state.isAuthenticated = false
      })

      // forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload.message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload.message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { resetError, resetMessage } = authSlice.actions
export default authSlice.reducer
