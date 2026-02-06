'use client'

import { useState } from 'react'
import { Box, Typography, Container, TextField, Button, Paper, Link, Grid, Chip, Alert, Snackbar } from '@mui/material'
import { Send, LinkedIn, GitHub, Email, Phone, LocationOn, WhatsApp, Twitter, CheckCircle, Error as ErrorIcon } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setShowError(true)
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setFocusedField(null)
    }, 1500)
  }

  const contactMethods = [
    {
      icon: Email,
      label: 'Email',
      value: 'rajanksingh2009@gmail.com',
      href: 'mailto:rajanksingh2009@gmail.com',
      color: 'from-red-500 to-red-600',
      description: 'Send me an email',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9654072640',
      href: 'tel:+919654072640',
      color: 'from-green-500 to-green-600',
      description: 'Call or text me',
    },
    {
      icon: LocationOn,
      label: 'Location',
      value: 'Remote / India',
      href: '#',
      color: 'from-blue-500 to-blue-600',
      description: 'Available worldwide',
    },
  ]

  const socialLinks = [
    {
      icon: LinkedIn,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rajan-kumar-a13179235/',
      color: 'from-blue-600 to-blue-700',
      description: 'Connect professionally',
    },
    {
      icon: GitHub,
      label: 'GitHub',
      href: 'https://github.com/RajankrSingh',
      color: 'from-gray-800 to-gray-900',
      description: 'View my code',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/yourusername',
      color: 'from-sky-500 to-sky-600',
      description: 'Follow for updates',
    },
    {
      icon: WhatsApp,
      label: 'WhatsApp',
      href: 'https://wa.me/9654072640',
      color: 'from-green-500 to-green-600',
      description: 'Quick chat',
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <Container maxWidth="lg" ref={ref} className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <Box className="bg-gradient-to-br from-primary-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Email className="text-white text-4xl" />
            </Box>
          </motion.div>
          <Typography
            variant="h2"
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            component="h2"
          >
            Let&apos;s Work Together
          </Typography>
         
          <Box className="flex items-center justify-center gap-2 mt-4">
            <Chip
              icon={<CheckCircle className="text-green-500" />}
              label="Available for new projects"
              className="bg-green-50 text-green-700 border border-green-200"
              size="small"
            />
            <Typography variant="caption" className="text-gray-500">
              Response time: Within 24 hours
            </Typography>
          </Box>
        </motion.div>

        <Box className="max-w-6xl mx-auto">
          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} lg={7}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Paper
                  elevation={4}
                  className="p-6 md:p-8 relative overflow-hidden"
                  sx={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '2px solid rgba(14, 165, 233, 0.1)',
                    borderRadius: '24px',
                  }}
                >
                  {/* Decorative gradient */}
                  <motion.div
                    className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full blur-3xl opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  <Box className="relative z-10">
                    <Typography variant="h5" className="font-bold mb-6 text-gray-900">
                      Send me a message
                    </Typography>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <motion.div
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <TextField
                              fullWidth
                              label="Your Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              required
                              variant="outlined"
                              error={!!errors.name}
                              helperText={errors.name}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '12px',
                                  '&:hover fieldset': {
                                    borderColor: '#0ea5e9',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#0ea5e9',
                                    borderWidth: '2px',
                                  },
                                },
                              }}
                            />
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <motion.div
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <TextField
                              fullWidth
                              label="Your Email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              required
                              variant="outlined"
                              error={!!errors.email}
                              helperText={errors.email}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '12px',
                                  '&:hover fieldset': {
                                    borderColor: '#0ea5e9',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#0ea5e9',
                                    borderWidth: '2px',
                                  },
                                },
                              }}
                            />
                          </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                          <motion.div
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <TextField
                              fullWidth
                              label="Subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('subject')}
                              onBlur={() => setFocusedField(null)}
                              required
                              variant="outlined"
                              error={!!errors.subject}
                              helperText={errors.subject}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '12px',
                                  '&:hover fieldset': {
                                    borderColor: '#0ea5e9',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#0ea5e9',
                                    borderWidth: '2px',
                                  },
                                },
                              }}
                            />
                          </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                          <motion.div
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <TextField
                              fullWidth
                              label="Your Message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('message')}
                              onBlur={() => setFocusedField(null)}
                              required
                              multiline
                              rows={6}
                              variant="outlined"
                              error={!!errors.message}
                              helperText={errors.message || `${formData.message.length} characters`}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '12px',
                                  '&:hover fieldset': {
                                    borderColor: '#0ea5e9',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#0ea5e9',
                                    borderWidth: '2px',
                                  },
                                },
                              }}
                            />
                          </motion.div>
                        </Grid>
                      </Grid>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6"
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Send /></motion.div> : <Send />}
                          disabled={isSubmitting}
                          fullWidth
                          sx={{
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            py: 1.5,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                              boxShadow: '0 10px 25px rgba(14, 165, 233, 0.4)',
                            },
                            '&:disabled': {
                              background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
                            },
                          }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </motion.div>
                    </form>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} lg={5}>
              <Box className="space-y-4 h-full">
                {/* Contact Methods */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Paper
                    elevation={4}
                    className="p-6 relative overflow-hidden"
                    sx={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      border: '2px solid rgba(14, 165, 233, 0.1)',
                      borderRadius: '24px',
                    }}
                  >
                    <Typography variant="h6" className="font-bold mb-4 text-gray-900">
                      Contact Information
                    </Typography>
                    <Box className="space-y-3">
                      {contactMethods.map((method, index) => {
                        const Icon = method.icon
                        return (
                          <motion.div
                            key={method.label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ x: 5, scale: 1.02 }}
                          >
                            <Link
                              href={method.href}
                              target={method.href.startsWith('http') ? '_blank' : undefined}
                              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-lg transition-all no-underline group"
                              sx={{
                                border: '1px solid rgba(14, 165, 233, 0.1)',
                                '&:hover': {
                                  borderColor: 'rgba(14, 165, 233, 0.3)',
                                  background: `linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(14, 165, 233, 0.02) 100%)`,
                                },
                              }}
                            >
                              <motion.div
                                className={`bg-gradient-to-br ${method.color} p-3 rounded-xl shadow-md`}
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                              >
                                <Icon className="text-white" />
                              </motion.div>
                              <Box className="flex-1">
                                <Typography
                                  variant="body2"
                                  className="text-gray-500 text-xs mb-1"
                                >
                                  {method.label}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className="text-gray-900 font-semibold group-hover:text-primary-600 transition-colors"
                                >
                                  {method.value}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  className="text-gray-500"
                                >
                                  {method.description}
                                </Typography>
                              </Box>
                            </Link>
                          </motion.div>
                        )
                      })}
                    </Box>
                  </Paper>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Paper
                    elevation={4}
                    className="p-6 relative overflow-hidden"
                    sx={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      border: '2px solid rgba(14, 165, 233, 0.1)',
                      borderRadius: '24px',
                    }}
                  >
                    <Typography variant="h6" className="font-bold mb-4 text-gray-900">
                      Connect with me
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-4">
                      Follow me on social media for updates, insights, and more.
                    </Typography>
                    <Box className="grid grid-cols-2 gap-3">
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon
                        return (
                          <motion.div
                            key={social.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            <Link
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-all no-underline group"
                              sx={{
                                border: '1px solid rgba(14, 165, 233, 0.1)',
                                '&:hover': {
                                  borderColor: 'rgba(14, 165, 233, 0.3)',
                                },
                              }}
                            >
                              <motion.div
                                className={`bg-gradient-to-br ${social.color} p-3 rounded-xl`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <Icon className="text-white" />
                              </motion.div>
                              <Typography
                                variant="caption"
                                className="text-gray-700 group-hover:text-primary-600 font-medium transition-colors text-center"
                              >
                                {social.label}
                              </Typography>
                              <Typography
                                variant="caption"
                                className="text-gray-500 text-xs text-center"
                              >
                                {social.description}
                              </Typography>
                            </Link>
                          </motion.div>
                        )
                      })}
                    </Box>
                  </Paper>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setShowSuccess(false)}
            severity="success"
            icon={<CheckCircle />}
            sx={{ width: '100%' }}
          >
            Message sent successfully! I&apos;ll get back to you soon.
          </Alert>
        </Snackbar>

        {/* Error Snackbar */}
        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={() => setShowError(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setShowError(false)}
            severity="error"
            icon={<ErrorIcon />}
            sx={{ width: '100%' }}
          >
            Please fill in all required fields correctly.
          </Alert>
        </Snackbar>
      </Container>
    </section>
  )
}
