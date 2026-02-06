'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Container, Grid, Paper, Chip } from '@mui/material'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 75 },
        { name: 'TypeScript', level: 70 },
        { name: 'JavaScript', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Material-UI', level: 85 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'REST APIs', level: 85 },
        { name: 'Supabase', level: 80 },
        // { name: 'Firebase', level: 75 },
        // { name: 'Node.js', level: 70 },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'GitHub', level: 92 },
        { name: 'Postman', level: 85 },
        { name: 'Vercel', level: 88 },
        { name: 'VS Code', level: 95 },
      ],
    },
  ]

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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <Container maxWidth="lg" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            component="h2"
          >
            Skills
          </Typography>
          
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <Grid container spacing={4}>
            {skillCategories.map((category, categoryIndex) => (
              <Grid item xs={12} md={4} key={categoryIndex}>
                <motion.div variants={itemVariants}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Paper
                      elevation={4}
                      className="p-6 h-full hover:shadow-xl transition-all duration-300"
                      sx={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        border: '1px solid rgba(14, 165, 233, 0.1)',
                      }}
                    >
                      <Typography
                        variant="h5"
                        className="font-bold mb-6 text-gray-900 text-center"
                      >
                        {category.title}
                      </Typography>
                      <Box className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <Box key={skillIndex} className="group">
                            <Box className="flex justify-between items-center mb-2">
                              <Typography
                                variant="body2"
                                className="font-medium text-gray-700"
                              >
                                {skill.name}
                              </Typography>
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: skillIndex * 0.1 + 0.3 }}
                                className="text-primary-600 font-semibold"
                              >
                                {skill.level}%
                              </motion.span>
                            </Box>
                            <Box className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 relative overflow-hidden"
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                transition={{
                                  duration: 1,
                                  delay: skillIndex * 0.1 + 0.2,
                                  ease: 'easeOut',
                                }}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                                  animate={{
                                    x: ['-100%', '100%'],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: 'linear',
                                  }}
                                />
                              </motion.div>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Paper>
                  </motion.div>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Typography variant="h6" className="mb-4 text-gray-700">
            Also familiar with:
          </Typography>
          <Box className="flex flex-wrap gap-2 justify-center">
            {['HTML5', 'CSS3', 'SASS', 'Redux', 'Zustand', 'Jest', 'Cypress', 'Docker', 'AWS Basics'].map(
              (skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Chip
                    label={skill}
                    className="bg-white border-2 border-primary-200 text-gray-700 hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer"
                    variant="outlined"
                  />
                </motion.div>
              )
            )}
          </Box>
        </motion.div>
      </Container>
    </section>
  )
}
