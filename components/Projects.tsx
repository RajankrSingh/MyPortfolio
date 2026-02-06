'use client'

import { useState } from 'react'
import { Box, Typography, Container, Grid, Paper, Button, Chip, Tabs, Tab } from '@mui/material'
import { Launch, GitHub, Code, TrendingUp, Visibility, Star } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Project {
  name: string
  description: string
  longDescription?: string
  techStack: string[]
  liveLink?: string
  githubLink?: string
  image?: string
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile'
  featured?: boolean
  status?: 'completed' | 'in-progress' | 'archived'
  highlights?: string[]
}

const projects: Project[] = [
  {
    name: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with user authentication, product management, shopping cart, and payment integration.',
    longDescription: 'Built a comprehensive e-commerce platform from scratch with advanced features including real-time inventory management, multi-payment gateway integration, and admin dashboard. Implemented secure authentication, order tracking, and customer reviews.',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/example',
    category: 'fullstack',
    featured: true,
    status: 'completed',
    highlights: ['40% performance improvement', '1000+ active users', '99.9% uptime'],
  },
  {
    name: 'School Students Data Management Platform',
    description: 'A comprehensive platform for managing student data with separate login portals for distributors and schools. Features secure authentication, data management, and dashboard access.',
    longDescription: 'Developed a full-stack student data management system with role-based access control. Includes distributor dashboard for file and data management, and school dashboard for viewing and managing student information. Built with modern technologies for scalability and security.',
    techStack: ['Next.js 14', 'React 18', 'Supabase', 'Tailwind CSS'],
    liveLink: 'https://studentsdata-flax.vercel.app/',
    githubLink: 'https://github.com/RajankrSingh/studentsdata',
    category: 'fullstack',
    featured: true,
    status: 'completed',
    highlights: ['Role-based access', 'Secure authentication', 'Real-time data management'],
  },
  {
    name: 'Analytics Dashboard',
    description: 'A comprehensive analytics dashboard for tracking business metrics with interactive charts, data visualization, and export capabilities.',
    longDescription: 'Created an advanced analytics platform with custom data visualization, real-time metrics tracking, and comprehensive reporting. Includes data export, scheduled reports, and custom dashboard creation.',
    techStack: ['Next.js', 'TypeScript', 'Chart.js', 'Tailwind CSS', 'REST API'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/example',
    category: 'frontend',
    status: 'completed',
    highlights: ['10+ chart types', 'Real-time updates', 'Export to PDF/CSV'],
  },
  {
    name: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing projects and skills. Built with Next.js and optimized for performance and SEO.',
    longDescription: 'Designed and developed a high-performance portfolio website with smooth animations, SEO optimization, and accessibility features. Achieved 100/100 Lighthouse score.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/example',
    category: 'frontend',
    status: 'completed',
    highlights: ['100 Lighthouse score', 'SEO optimized', 'Accessible'],
  },
  {
    name: 'Social Media App',
    description: 'A social media platform with user profiles, posts, comments, likes, and real-time notifications. Features include image upload and feed algorithms.',
    longDescription: 'Built a scalable social media application with real-time messaging, image/video uploads, advanced feed algorithms, and comprehensive privacy controls. Handles millions of interactions daily.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Material-UI'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/example',
    category: 'fullstack',
    status: 'in-progress',
    highlights: ['Real-time messaging', 'Image optimization', 'Advanced algorithms'],
  },
  {
    name: 'Daily News',
    description: 'A modern news application delivering the latest headlines, articles, and breaking news. Features real-time updates, category filtering, and responsive design for seamless reading experience.',
    longDescription: 'Developed a comprehensive news platform with real-time news updates, category-based filtering, and article search functionality. Features include responsive design, fast loading times, and intuitive user interface for browsing latest news and articles.',
    techStack: ['Next.js', 'TypeScript', 'News API', 'Tailwind CSS'],
    liveLink: 'https://nextjs-buzzdaily.vercel.app/',
    githubLink: 'https://github.com/example',
    category: 'frontend',
    status: 'completed',
    highlights: ['Real-time news updates', 'Category filtering', 'Responsive design', 'Weather alerts'],
  },
]

const categories = ['all', 'fullstack', 'frontend', 'backend', 'mobile'] as const

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  const featuredProjects = projects.filter((p) => p.featured)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-300'
      default:
        return 'bg-primary-100 text-primary-700 border-primary-300'
    }
  }

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      case 'archived':
        return 'Archived'
      default:
        return 'Active'
    }
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
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
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <Box className="bg-gradient-to-br from-primary-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Code className="text-white text-4xl" />
            </Box>
          </motion.div>
          <Typography
            variant="h2"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            component="h2"
          >
            Featured Projects
          </Typography>
          
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Box className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'contained' : 'outlined'}
                  className={`capitalize ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'border-primary-300 text-gray-700 hover:border-primary-500'
                  }`}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    fontWeight: selectedCategory === category ? 600 : 500,
                  }}
                >
                  {category === 'all' ? 'All Projects' : category}
                </Button>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            exit="hidden"
          >
            <Grid container spacing={4}>
              {filteredProjects.map((project, index) => {
                const isExpanded = expandedIndex === index
                return (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <motion.div
                      variants={itemVariants}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                    >
                      <motion.div
                        whileHover={{ y: -8, scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Paper
                          elevation={hoveredIndex === index ? 12 : 4}
                          className="h-full flex flex-col relative overflow-hidden group cursor-pointer"
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          sx={{
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                            border: '2px solid',
                            borderColor:
                              hoveredIndex === index
                                ? 'rgba(14, 165, 233, 0.4)'
                                : 'rgba(14, 165, 233, 0.1)',
                            borderRadius: '24px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              boxShadow: '0 25px 50px rgba(14, 165, 233, 0.2)',
                            },
                          }}
                        >
                          {/* Project Image Placeholder with Gradient */}
                          <Box
                            className="h-48 w-full relative overflow-hidden"
                            sx={{
                              background: `linear-gradient(135deg, ${
                                index % 3 === 0
                                  ? '#0ea5e9, #8b5cf6'
                                  : index % 3 === 1
                                  ? '#ec4899, #f59e0b'
                                  : '#10b981, #3b82f6'
                              })`,
                            }}
                          >
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center"
                              animate={{
                                scale: hoveredIndex === index ? [1, 1.1, 1] : 1,
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              <Code className="text-white text-6xl opacity-30" />
                            </motion.div>
                            {project.featured && (
                              <Box className="absolute top-4 right-4">
                                <Chip
                                  icon={<Star className="text-yellow-400" />}
                                  label="Featured"
                                  size="small"
                                  className="bg-yellow-400/20 text-yellow-700 border border-yellow-300 backdrop-blur-sm"
                                  sx={{ fontWeight: 600 }}
                                />
                              </Box>
                            )}
                            {project.status && (
                              <Box className="absolute top-4 left-4">
                                <Chip
                                  label={getStatusLabel(project.status)}
                                  size="small"
                                  className={`${getStatusColor(project.status)} border backdrop-blur-sm`}
                                  sx={{ fontWeight: 600 }}
                                />
                              </Box>
                            )}
                          </Box>

                          {/* Content */}
                          <Box className="p-6 flex-1 flex flex-col">
                            <Box className="mb-3">
                              <Typography
                                variant="h5"
                                className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors"
                              >
                                {project.name}
                              </Typography>
                              <Chip
                                label={project.category}
                                size="small"
                                className="bg-primary-50 text-primary-700 border border-primary-200 capitalize"
                                sx={{ fontWeight: 500 }}
                              />
                            </Box>

                            <Typography
                              variant="body2"
                              className="text-gray-600 mb-4 flex-grow line-clamp-3"
                            >
                              {project.description}
                            </Typography>

                            {/* Tech Stack */}
                            <Box className="mb-4">
                              <Typography variant="caption" className="text-gray-500 mb-2 block">
                                Technologies:
                              </Typography>
                              <Box className="flex flex-wrap gap-1.5">
                                {project.techStack.slice(0, 4).map((tech, techIndex) => (
                                  <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{
                                      delay: index * 0.1 + techIndex * 0.05 + 0.3,
                                    }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                  >
                                    <Chip
                                      label={tech}
                                      size="small"
                                      className="bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors text-xs"
                                    />
                                  </motion.div>
                                ))}
                                {project.techStack.length > 4 && (
                                  <Chip
                                    label={`+${project.techStack.length - 4}`}
                                    size="small"
                                    className="bg-gray-100 text-gray-500 border border-gray-200 text-xs"
                                  />
                                )}
                              </Box>
                            </Box>

                            {/* Highlights */}
                            {project.highlights && project.highlights.length > 0 && (
                              <motion.div
                                initial={false}
                                animate={{
                                  height: isExpanded ? 'auto' : 0,
                                  opacity: isExpanded ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mb-4"
                              >
                                <Box className="pt-3 border-t border-gray-200">
                                  <Typography variant="caption" className="text-gray-500 mb-2 block font-semibold">
                                    Highlights:
                                  </Typography>
                                  {project.highlights.map((highlight, idx) => (
                                    <Box key={idx} className="flex items-center gap-2 mb-1">
                                      <TrendingUp className="text-primary-600 text-sm" />
                                      <Typography variant="caption" className="text-gray-600">
                                        {highlight}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              </motion.div>
                            )}

                            {/* Action Buttons */}
                            <Box className="flex gap-2 mt-auto pt-4">
                              {project.liveLink && (
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<Launch />}
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1"
                                    sx={{
                                      textTransform: 'none',
                                      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                                      borderRadius: '10px',
                                      '&:hover': {
                                        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                        boxShadow: '0 5px 15px rgba(14, 165, 233, 0.4)',
                                      },
                                    }}
                                  >
                                    Live Demo
                                  </Button>
                                </motion.div>
                              )}
                              {project.githubLink && (
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<GitHub />}
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1"
                                    sx={{
                                      textTransform: 'none',
                                      borderRadius: '10px',
                                      borderColor: '#0ea5e9',
                                      color: '#0ea5e9',
                                      '&:hover': {
                                        borderWidth: '2px',
                                        borderColor: '#0284c7',
                                        backgroundColor: 'rgba(14, 165, 233, 0.05)',
                                        boxShadow: '0 3px 10px rgba(14, 165, 233, 0.2)',
                                      },
                                    }}
                                  >
                                    Code
                                  </Button>
                                </motion.div>
                              )}
                            </Box>

                            {/* Expand indicator */}
                            {project.highlights && (
                              <motion.div
                                className="mt-2 text-center"
                                animate={{ y: isExpanded ? 0 : [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Typography variant="caption" className="text-primary-600 font-medium">
                                  {isExpanded ? 'Show Less' : 'View Details'}
                                </Typography>
                              </motion.div>
                            )}
                          </Box>
                        </Paper>
                      </motion.div>
                    </motion.div>
                  </Grid>
                )
              })}
            </Grid>
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Typography variant="h6" className="text-gray-500 mb-2">
              No projects found in this category
            </Typography>
            <Button
              onClick={() => setSelectedCategory('all')}
              variant="outlined"
              sx={{ textTransform: 'none' }}
            >
              View All Projects
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
