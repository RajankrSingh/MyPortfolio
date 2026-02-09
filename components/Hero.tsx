'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Button, Container, Chip, Avatar, Paper } from '@mui/material'
import { ArrowDownward, Download, Code, TrendingUp, Star } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentRole, setCurrentRole] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const roles = ['Web Developer', 'Frontend Specialist', 'React Expert', 'Next.js Developer']
  const techStack = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js']

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-white pt-16">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient blobs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: mousePosition.x * 0.3,
            y: mousePosition.y * 0.3,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: mousePosition.x * -0.3,
            y: mousePosition.y * -0.3,
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: mousePosition.x * 0.2,
            y: mousePosition.y * 0.2,
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating code elements */}
        {['<React />', '{ Next.js }', 'TypeScript', 'const dev = true'].map((text, idx) => (
          <motion.div
            key={idx}
            className="absolute text-gray-300/20 font-mono text-sm md:text-base"
            initial={{
              opacity: 0.1,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3 + idx,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.5,
            }}
            style={{
              left: `${20 + idx * 25}%`,
              top: `${30 + idx * 15}%`,
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      <Container maxWidth="lg" className="text-center py-20 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Profile Avatar */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-block"
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  border: '4px solid white',
                  boxShadow: '0 10px 40px rgba(14, 165, 233, 0.3)',
                }}
              >
                RK
              </Avatar>
            </motion.div>
          </motion.div>

          {/* Greeting */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h6"
              className="text-lg md:text-xl text-primary-600 font-semibold mb-4"
            >
              👋 Hello, I&apos;m
            </Typography>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 relative"
              component="h1"
            >
              <motion.span
                className="text-primary-600 inline-block relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Rajan Kumar
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-400 via-purple-500 to-primary-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </motion.span>
            </Typography>
          </motion.div>

          {/* Animated Role */}
          <motion.div variants={itemVariants}>
            <Box className="h-16 md:h-20 mb-4 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography
                    variant="h2"
                    className="text-2xl md:text-4xl lg:text-5xl text-gray-700 font-semibold"
                    component="h2"
                  >
                    {roles[currentRole]}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
          </motion.div>


          {/* Tech Stack Badges */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-wrap justify-center gap-2"
          >
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Chip
                  icon={<Code className="text-primary-600" />}
                  label={tech}
                  className="bg-white border border-primary-200 text-gray-700 hover:bg-primary-50 transition-colors"
                  sx={{ fontWeight: 500 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="mb-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {[
              { icon: Code, value: '4+', label: 'Years Experience' },
              { icon: TrendingUp, value: '12+', label: 'Projects' },
              { icon: Star, value: '8+', label: 'Happy Clients' },
            ].map((stat, idx) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Paper
                    elevation={2}
                    className="p-4 bg-white/80 backdrop-blur-sm border border-primary-100"
                    sx={{ borderRadius: '16px' }}
                  >
                    <Icon className="text-primary-600 mb-2 mx-auto" />
                    <Typography variant="h5" className="font-bold text-gray-900 mb-1">
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" className="text-gray-600">
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants}>
            <Box className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Code />}
                  onClick={() => scrollToSection('projects')}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                    boxShadow: '0 10px 30px rgba(14, 165, 233, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                      boxShadow: '0 15px 40px rgba(14, 165, 233, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  View My Work
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Download />}
                  onClick={() => {
                    // You can add download resume functionality here
                    window.open('/resume.pdf', '_blank')
                  }}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    borderWidth: '2px',
                    borderColor: '#0ea5e9',
                    color: '#0ea5e9',
                    '&:hover': {
                      borderWidth: '2px',
                      borderColor: '#0284c7',
                      backgroundColor: 'rgba(14, 165, 233, 0.05)',
                      boxShadow: '0 10px 25px rgba(14, 165, 233, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Download Resume
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollToSection('contact')}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    borderWidth: '2px',
                    borderColor: '#8b5cf6',
                    color: '#8b5cf6',
                    '&:hover': {
                      borderWidth: '2px',
                      borderColor: '#7c3aed',
                      backgroundColor: 'rgba(139, 92, 246, 0.05)',
                      boxShadow: '0 10px 25px rgba(139, 92, 246, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Get In Touch
                </Button>
              </motion.div>
            </Box>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center gap-2 cursor-pointer group"
              whileHover={{ scale: 1.1 }}
            >
              <Typography variant="caption" className="text-gray-500 group-hover:text-primary-600 transition-colors">
                Scroll to explore
              </Typography>
              <Button
                className="text-gray-600 hover:text-primary-600 transition-colors"
                sx={{ textTransform: 'none', minWidth: 'auto' }}
              >
                <ArrowDownward />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
