'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { Close, Visibility, VisibilityOff, Email, Lock, Phone, Person } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

interface AuthModalProps {
  open: boolean
  onClose: () => void
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const { signIn } = useAuth()

  // Check if Supabase is configured
  const isSupabaseConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const handleSubmit = async (e: React.FormEvent) => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Please set up your environment variables. See SUPABASE_SETUP.md for instructions.')
      return
    }
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      // Sign In with user data
      const { error } = await signIn(email, password, {
        full_name: fullName,
        phone: phone,
      })
      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setTimeout(() => {
          onClose()
          resetForm()
        }, 1000)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setFullName('')
    setPhone('')
    setError(null)
    setSuccess(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        },
      }}
    >
      <DialogTitle className="flex items-center justify-between">
        <Typography variant="h5" className="font-bold">
          Sign In
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {!isSupabaseConfigured && (
          <Alert severity="warning" className="mb-4">
            Supabase is not configured. Please set up your environment variables in .env.local file.
            See SUPABASE_SETUP.md for instructions.
          </Alert>
        )}

        {error && (
          <Alert severity="error" className="mb-4" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="mb-4">
            Successfully signed in! Your information has been saved.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TextField
              fullWidth
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </motion.div>

          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
            required
            placeholder="+91 1234567890"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className="text-gray-400" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />

          <Box className="mt-6">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                py: 1.5,
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                },
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}
