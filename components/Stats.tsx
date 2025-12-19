'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Container, Grid, Paper } from '@mui/material'
import { Code, Work, Star, TrendingUp } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Stat {
  icon: typeof Code
  value: number
  label: string
  suffix?: string
  color: string
}

const stats: Stat[] = [
  { icon: Code, value: 12, label: 'Projects Completed', suffix: '+', color: 'from-blue-500 to-cyan-500' },
  { icon: Work, value: 4, label: 'Years Experience', suffix: '+', color: 'from-purple-500 to-pink-500' },
  { icon: Star, value: 8, label: 'Happy Clients', suffix: '+', color: 'from-orange-500 to-red-500' },
  { icon: TrendingUp, value: 50, label: 'Code Commits', suffix: '+', color: 'from-green-500 to-emerald-500' },
]

export default function Stats() {
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  const [countedValues, setCountedValues] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      const timers: NodeJS.Timeout[] = []
      stats.forEach((stat, index) => {
        let current = 0
        const increment = stat.value / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.value) {
            current = stat.value
            clearInterval(timer)
          }
          setCountedValues((prev) => {
            const newValues = [...prev]
            newValues[index] = Math.floor(current)
            return newValues
          })
        }, 30)
        timers.push(timer)
      })
      return () => {
        timers.forEach(timer => clearInterval(timer))
      }
    }
  }, [isInView])

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      <Container maxWidth="lg" ref={ref}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <Paper
                    elevation={0}
                    className="p-6 text-center bg-white/10 backdrop-blur-sm border border-white/20"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <motion.div
                      className={`bg-gradient-to-br ${stat.color} p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="text-white text-3xl" />
                    </motion.div>
                    <Typography
                      variant="h3"
                      className="text-white font-bold mb-2"
                      component="div"
                    >
                      {countedValues[index]}
                      {stat.suffix}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-white/90 font-medium"
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </section>
  )
}

