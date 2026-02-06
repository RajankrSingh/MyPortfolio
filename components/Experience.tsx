'use client'

import { useState } from 'react'
import { Box, Typography, Container, Paper, Chip } from '@mui/material'
import { Work, CalendarToday, LocationOn, TrendingUp } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ExperienceItem {
  company: string
  role: string
  period: string
  location?: string
  contributions: string[]
  technologies?: string[]
  achievements?: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'ShramIN Connect pvt ltd',
    role: 'Senior Web Developer',
    period: 'June 2022 - Present',
    location: 'Remote',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Supabase'],
    contributions: [
      'Led development of multiple client projects using React and Next.js',
      'Improved application performance by 40% through code optimization',
      'Mentored junior developers and conducted code reviews',
      'Collaborated with cross-functional teams to deliver high-quality products',
    ],
    achievements: [
      'Delivered 10+ production-ready applications',
      'Reduced page load time by 50%',
    ],
  },
  {
    company: 'Blue berry e-services pvt ltd',
    role: 'Web Developer',
    period: 'Feb. 2022 - May 2022',
    location: 'Remote',
    technologies: ['React', 'JavaScript', 'REST APIs', 'Firebase'],
    contributions: [
      'Built responsive web applications for various clients',
      'Integrated third-party APIs and payment gateways',
      'Implemented authentication and authorization systems',
      'Maintained and updated legacy codebases',
    ],
    achievements: [
      'Successfully launched 5 client projects',
      'Improved code quality by 30%',
    ],
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const calculateDuration = (period: string) => {
    const [start, end] = period.split(' - ')
    const startDate = new Date(start)
    const endDate = end === 'Present' ? new Date() : new Date(end)
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    if (years > 0 && remainingMonths > 0) {
      return `${years} yr ${remainingMonths} mo`
    } else if (years > 0) {
      return `${years} yr`
    }
    return `${months} mo`
  }

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <Container maxWidth="lg" ref={ref} className="relative z-10">
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
              <Work className="text-white text-4xl" />
            </Box>
          </motion.div>
          <Typography
            variant="h2"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            component="h2"
          >
            Professional Experience
          </Typography>
          
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-500 to-primary-300 hidden md:block"></div>

          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index
            const duration = calculateDuration(exp.period)
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative mb-8 md:mb-12"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-6 md:left-1/2 w-4 h-4 bg-white border-4 border-primary-500 rounded-full z-10 transform -translate-x-1/2 hidden md:block"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>

                <motion.div
                  className={`md:flex md:items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Date badge - visible on desktop */}
                  <Box className="hidden md:block md:w-1/2 md:pr-8 md:pl-8">
                    <motion.div
                      className={`text-right ${!isEven ? 'md:text-left' : ''}`}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.15 + 0.4 }}
                    >
                      <Paper
                        elevation={2}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-primary-50 to-purple-50 border border-primary-200"
                        sx={{ borderRadius: '12px' }}
                      >
                        <Typography variant="body2" className="text-primary-700 font-semibold">
                          {exp.period}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          {duration}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Box>

                  {/* Experience card */}
                  <Box className={`md:w-1/2 ${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
                    <motion.div
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="cursor-pointer"
                    >
                      <Paper
                        elevation={isExpanded ? 8 : 4}
                        className="p-6 md:p-8 relative overflow-hidden group"
                        sx={{
                          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                          border: '2px solid',
                          borderColor: isExpanded ? 'rgba(14, 165, 233, 0.3)' : 'rgba(14, 165, 233, 0.1)',
                          borderRadius: '20px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(14, 165, 233, 0.15)',
                            borderColor: 'rgba(14, 165, 233, 0.4)',
                          },
                        }}
                      >
                        {/* Gradient overlay */}
                        <motion.div
                          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />

                        {/* Date badge - visible on mobile */}
                        <Box className="md:hidden mb-4">
                          <Paper
                            elevation={1}
                            className="inline-block px-3 py-1 bg-primary-50 border border-primary-200"
                            sx={{ borderRadius: '8px' }}
                          >
                            <Typography variant="caption" className="text-primary-700 font-semibold">
                              {exp.period}
                            </Typography>
                          </Paper>
                        </Box>

                        <Box className="relative z-10">
                          {/* Header */}
                          <Box className="flex items-start gap-4 mb-4">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Box className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
                                <Work className="text-white text-2xl" />
                              </Box>
                            </motion.div>
                            <Box className="flex-1">
                              <Typography
                                variant="h5"
                                className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors"
                              >
                                {exp.role}
                              </Typography>
                              <Typography
                                variant="h6"
                                className="text-primary-600 mb-2 font-semibold"
                              >
                                {exp.company}
                              </Typography>
                              {exp.location && (
                                <Box className="flex items-center gap-1 text-gray-500 mb-3">
                                  <LocationOn className="text-sm" />
                                  <Typography variant="caption">{exp.location}</Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>

                          {/* Technologies */}
                          {exp.technologies && (
                            <Box className="mb-4 flex flex-wrap gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <motion.div
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                                  transition={{ delay: index * 0.15 + techIndex * 0.05 + 0.5 }}
                                  whileHover={{ scale: 1.1, y: -2 }}
                                >
                                  <Chip
                                    label={tech}
                                    size="small"
                                    className="bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 transition-colors"
                                    sx={{ fontWeight: 500 }}
                                  />
                                </motion.div>
                              ))}
                            </Box>
                          )}

                          {/* Contributions */}
                          <Box className="space-y-3">
                            <Typography variant="subtitle2" className="text-gray-700 font-semibold mb-2">
                              Key Contributions:
                            </Typography>
                            {exp.contributions.map((contribution, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: index * 0.15 + idx * 0.1 + 0.6 }}
                                className="flex items-start gap-3 group/item"
                              >
                                <motion.div
                                  className="mt-1.5 flex-shrink-0"
                                  whileHover={{ rotate: 90, scale: 1.2 }}
                                >
                                  <Box className="w-2 h-2 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full"></Box>
                                </motion.div>
                                <Typography
                                  variant="body2"
                                  className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors"
                                >
                                  {contribution}
                                </Typography>
                              </motion.div>
                            ))}
                          </Box>

                          {/* Achievements - Expandable */}
                          {exp.achievements && (
                            <motion.div
                              initial={false}
                              animate={{
                                height: isExpanded ? 'auto' : 0,
                                opacity: isExpanded ? 1 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-4"
                            >
                              <Box className="pt-4 border-t border-gray-200">
                                <Typography variant="subtitle2" className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                                  <TrendingUp className="text-primary-600" />
                                  Notable Achievements:
                                </Typography>
                                {exp.achievements.map((achievement, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-3 mb-2"
                                  >
                                    <Box className="mt-1.5 flex-shrink-0">
                                      <Box className="w-1.5 h-1.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"></Box>
                                    </Box>
                                    <Typography variant="body2" className="text-gray-600 italic">
                                      {achievement}
                                    </Typography>
                                  </motion.div>
                                ))}
                              </Box>
                            </motion.div>
                          )}

                          {/* Expand/Collapse indicator */}
                          {exp.achievements && (
                            <motion.div
                              className="mt-4 text-center"
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                            >
                              <Typography variant="caption" className="text-primary-600 font-medium cursor-pointer">
                                {isExpanded ? 'Show Less' : 'Show Achievements'}
                              </Typography>
                            </motion.div>
                          )}
                        </Box>
                      </Paper>
                    </motion.div>
                  </Box>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
