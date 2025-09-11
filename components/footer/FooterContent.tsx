"use client"

import { motion } from 'framer-motion'
import FooterLogo from './FooterLogo'
import FooterLinks from './FooterLinks'
import SocialLinks from './SocialLinks'
import Newsletter from './Newsletter'

const FooterContent = () => {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          <FooterLogo />
          <p className="text-green-100 mb-6 text-sm leading-relaxed">
            Empowering businesses with innovative solutions. Building the future, one project at a time.
          </p>
          <SocialLinks />
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FooterLinks
            title="Quick Links"
            links={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Pricing", path: "/pricing" },
              { name: "Contact", path: "/contact" },
            ]}
          />
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Newsletter />
        </motion.div>
      </div>
    </div>
  )
}

export default FooterContent

