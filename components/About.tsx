'use client'

import { useState } from 'react'
import { Box, Typography, Container, Grid, Paper, Chip, Avatar, Button } from '@mui/material'
import { Code, Business, Lightbulb, Person, Favorite, School, Work, LocationOn, Email, Phone } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeTab, setActiveTab] = useState<'overview' | 'values' | 'journey'>('overview')

  const highlights = [
    {
      icon: Code,
      title: '4 Years Experience',
      description: 'Building modern web applications with cutting-edge technologies',
      color: 'from-blue-500 to-cyan-500',
      stat: '4+',
    },
    {
      icon: Business,
      title: 'Multiple Industries',
      description: 'Worked across e-commerce, SaaS, fintech, and healthcare sectors',
      color: 'from-purple-500 to-pink-500',
      stat: '5+',
    },
    {
      icon: Lightbulb,
      title: 'Problem Solver',
      description: 'Transforming complex business requirements into elegant solutions',
      color: 'from-orange-500 to-red-500',
      stat: '50+',
    },
  ]

  const values = [
    {
      title: 'Quality First',
      description: 'I believe in writing clean, maintainable code that stands the test of time.',
      icon: '✨',
    },
    {
      title: 'Continuous Learning',
      description: 'Technology evolves rapidly, and I stay updated with the latest trends and best practices.',
      icon: '📚',
    },
    {
      title: 'User-Centric',
      description: 'Every decision I make is driven by what provides the best experience for end users.',
      icon: '👥',
    },
    {
      title: 'Collaboration',
      description: 'Great products are built by great teams. I thrive in collaborative environments.',
      icon: '🤝',
    },
  ]

  const journey = [
    {
      year: '2020',
      title: 'Started My Journey',
      description: 'Began learning web development with HTML, CSS, and JavaScript. Built my first portfolio website.',
    },
    {
      year: '2021',
      title: 'First Professional Role',
      description: 'Joined as a Web Developer, working on client projects and learning React ecosystem.',
    },
    {
      year: '2022',
      title: 'Senior Developer',
      description: 'Promoted to Senior Web Developer, leading projects and mentoring junior developers.',
    },
    {
      year: '2024',
      title: 'Current',
      description: 'Building scalable applications, contributing to open source, and continuously improving.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <section id="about" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
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
              <Person className="text-white text-4xl" />
            </Box>
          </motion.div>
          <Typography
            variant="h2"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            component="h2"
          >
            About Me
          </Typography>
          <Typography
            variant="body1"
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            A passionate web developer with 4 years of experience creating digital solutions
            that make a difference. I specialize in building responsive, performant, and
            user-friendly web applications.
          </Typography>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Paper
            elevation={4}
            className="p-8 md:p-12 relative overflow-hidden"
            sx={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(14, 165, 233, 0.1)',
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

            <Grid container spacing={4} className="relative z-10">
              <Grid item xs={12} md={4} className="text-center md:text-left">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="inline-block mb-4"
                >
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                      margin: '0 auto',
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)',
                      fontSize: '4rem',
                      fontWeight: 'bold',
                    }}
                  >
                    RK
                  </Avatar>
                </motion.div>
                <Typography variant="h5" className="font-bold text-gray-900 mb-2">
                  Rajan Kumar
                </Typography>
                <Typography variant="body2" className="text-primary-600 mb-4 font-semibold">
                  Senior Web Developer
                </Typography>
                <Box className="flex flex-col gap-2 items-center md:items-start">
                  <Box className="flex items-center gap-2 text-gray-600">
                    <LocationOn className="text-sm" />
                    <Typography variant="body2">Remote / India</Typography>
                  </Box>
                  <Box className="flex items-center gap-2 text-gray-600">
                    <Email className="text-sm" />
                    <Typography variant="body2">your.email@example.com</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" className="font-bold text-gray-900 mb-4">
                  Professional Summary
                </Typography>
                <Typography variant="body1" className="text-gray-700 leading-relaxed mb-4">
                  I&apos;m a passionate web developer with 4 years of experience creating
                  digital solutions that make a difference. I specialize in building
                  responsive, performant, and user-friendly web applications using modern
                  technologies like React, Next.js, and TypeScript.
                </Typography>
                <Typography variant="body1" className="text-gray-700 leading-relaxed mb-6">
                  My expertise lies in frontend development, but I also have experience
                  with backend APIs, database design, and cloud deployment. I work closely
                  with designers, product managers, and stakeholders to understand business
                  needs and translate them into technical solutions.
                </Typography>
                <Box className="flex flex-wrap gap-2">
                  {['Problem Solving', 'Team Leadership', 'Code Quality', 'Agile Methodologies'].map(
                    (skill, idx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        <Chip
                          label={skill}
                          className="bg-primary-50 text-primary-700 border border-primary-200"
                          sx={{ fontWeight: 500 }}
                        />
                      </motion.div>
                    )
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Highlights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <Grid container spacing={4}>
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Paper
                        elevation={4}
                        className="p-6 h-full text-center relative overflow-hidden group"
                        sx={{
                          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                          border: '1px solid rgba(14, 165, 233, 0.1)',
                          borderRadius: '20px',
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(14, 165, 233, 0.15)',
                            borderColor: 'rgba(14, 165, 233, 0.3)',
                          },
                        }}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="relative z-10"
                        >
                          <Box
                            className={`bg-gradient-to-br ${highlight.color} p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg`}
                          >
                            <Icon className="text-white text-4xl" />
                          </Box>
                        </motion.div>
                        <Typography
                          variant="h3"
                          className="font-bold mb-2 text-gray-900 relative z-10"
                        >
                          {highlight.stat}
                        </Typography>
                        <Typography
                          variant="h6"
                          className="font-bold mb-2 text-gray-900 relative z-10"
                        >
                          {highlight.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-gray-600 relative z-10"
                        >
                          {highlight.description}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper
            elevation={4}
            className="p-6 md:p-8 relative overflow-hidden"
            sx={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(14, 165, 233, 0.1)',
            }}
          >
            {/* Tab Buttons */}
            <Box className="flex flex-wrap gap-2 mb-8 justify-center">
              {[
                { id: 'overview', label: 'What I Do', icon: Work },
                { id: 'values', label: 'My Values', icon: Favorite },
                { id: 'journey', label: 'My Journey', icon: School },
              ].map((tab) => {
                const TabIcon = tab.icon
                return (
                  <motion.div
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setActiveTab(tab.id as any)}
                      variant={activeTab === tab.id ? 'contained' : 'outlined'}
                      startIcon={<TabIcon />}
                      className={`capitalize ${
                        activeTab === tab.id
                          ? 'bg-primary-600 text-white'
                          : 'border-primary-300 text-gray-700 hover:border-primary-500'
                      }`}
                      sx={{
                        textTransform: 'none',
                        borderRadius: '12px',
                        px: 3,
                        py: 1.5,
                        fontWeight: activeTab === tab.id ? 600 : 500,
                      }}
                    >
                      {tab.label}
                    </Button>
                  </motion.div>
                )
              })}
            </Box>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <Box>
                  <Typography variant="h5" className="font-bold mb-4 text-gray-900">
                    What I Do
                  </Typography>
                  <Typography variant="body1" className="text-gray-700 leading-relaxed mb-4">
                    As a web developer, I solve complex problems by creating intuitive,
                    scalable, and maintainable web applications. I work closely with
                    designers, product managers, and stakeholders to understand business
                    needs and translate them into technical solutions.
                  </Typography>
                  <Typography variant="body1" className="text-gray-700 leading-relaxed mb-4">
                    My expertise lies in frontend development with React and Next.js, but
                    I also have experience with backend APIs, database design, and cloud
                    deployment. I&apos;m passionate about writing clean code, following
                    best practices, and continuously learning new technologies to stay
                    ahead in this ever-evolving field.
                  </Typography>
                  <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {['Frontend Development', 'Backend Integration', 'UI/UX Design', 'Performance Optimization'].map(
                      (item, idx) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <Paper
                            elevation={2}
                            className="p-4 text-center bg-gradient-to-br from-primary-50 to-purple-50 border border-primary-100"
                            sx={{ borderRadius: '12px' }}
                          >
                            <Typography variant="body2" className="font-semibold text-gray-700">
                              {item}
                            </Typography>
                          </Paper>
                        </motion.div>
                      )
                    )}
                  </Box>
                </Box>
              )}

              {activeTab === 'values' && (
                <Box>
                  <Typography variant="h5" className="font-bold mb-6 text-gray-900">
                    My Core Values
                  </Typography>
                  <Grid container spacing={3}>
                    {values.map((value, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          whileHover={{ x: 5, scale: 1.02 }}
                        >
                          <Paper
                            elevation={2}
                            className="p-5 h-full bg-gradient-to-br from-white to-gray-50 border border-gray-200"
                            sx={{ borderRadius: '16px' }}
                          >
                            <Typography variant="h6" className="font-bold mb-2 text-gray-900 flex items-center gap-2">
                              <span className="text-2xl">{value.icon}</span>
                              {value.title}
                            </Typography>
                            <Typography variant="body2" className="text-gray-600">
                              {value.description}
                            </Typography>
                          </Paper>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {activeTab === 'journey' && (
                <Box>
                  <Typography variant="h5" className="font-bold mb-6 text-gray-900">
                    My Professional Journey
                  </Typography>
                  <Box className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-500 to-primary-300 hidden md:block"></div>
                    {journey.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + idx * 0.15 }}
                        className="relative mb-8 md:pl-12"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-2 md:left-0 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                        <Paper
                          elevation={2}
                          className="p-5 bg-gradient-to-br from-white to-gray-50 border border-gray-200"
                          sx={{ borderRadius: '16px' }}
                        >
                          <Box className="flex items-center gap-3 mb-2">
                            <Chip
                              label={step.year}
                              className="bg-primary-600 text-white font-bold"
                              size="small"
                            />
                            <Typography variant="h6" className="font-bold text-gray-900">
                              {step.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" className="text-gray-600">
                            {step.description}
                          </Typography>
                        </Paper>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              )}
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </section>
  )
}
