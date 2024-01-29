import React from 'react'
import Header from '../components/Header'
import { Container } from 'react-bootstrap'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  )
}

export default Layout
