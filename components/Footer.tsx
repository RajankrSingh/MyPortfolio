import { Box, Typography, Link } from '@mui/material'
import { LinkedIn, GitHub, Email } from '@mui/icons-material'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: LinkedIn, href: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
    { icon: GitHub, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Email, href: 'mailto:rajanksingh2009@gmail.com', label: 'Email' },
  ]

  return (
    <footer className="bg-gray-900 text-white py-8">
      <Box className="max-w-7xl mx-auto px-4">
        <Box className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography variant="body2" className="text-gray-400">
            © {currentYear} Web Developer. All rights reserved.
          </Typography>
          <Box className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <Icon />
                </Link>
              )
            })}
          </Box>
        </Box>
      </Box>
    </footer>
  )
}

