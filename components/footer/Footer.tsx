// components/footer/Footer.tsx
import FooterContent from './FooterContent'
import FooterBottom from './FooterBottom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-700 text-white">
      <FooterContent />
      <FooterBottom />
    </footer>
  )
}

export default Footer

