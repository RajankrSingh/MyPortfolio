'use client'

import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Menu } from '@mui/icons-material'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const scrollToSection = (href: string) => {
    const id = href.substring(1)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => scrollToSection(item.href)}
              sx={{
                textAlign: 'center',
                color: activeSection === item.href.substring(1) ? '#0ea5e9' : 'inherit',
                fontWeight: activeSection === item.href.substring(1) ? 600 : 400,
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <AppBar
      position="fixed"
      component={motion.div}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
        boxShadow: scrolled ? 2 : 0,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar className="max-w-7xl mx-auto w-full px-4">
        <Box className="flex-1">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#home"
              onClick={() => scrollToSection('#home')}
              className="text-xl font-bold text-gray-900 no-underline bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
            >
              Portfolio
            </Link>
          </motion.div>
        </Box>
        <Box className="hidden md:flex gap-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => scrollToSection(item.href)}
                className={`transition-colors relative ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
                sx={{
                  textTransform: 'none',
                  fontWeight: activeSection === item.href.substring(1) ? 600 : 500,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: activeSection === item.href.substring(1) ? '80%' : '0%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #0ea5e9, #0284c7)',
                    transition: 'width 0.3s ease',
                  },
                }}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
        </Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className="md:hidden text-gray-900"
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu />
        </IconButton>
      </Toolbar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}
