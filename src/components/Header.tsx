import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import logo from '../logo.svg'

const Header: React.FC = () => {
  return (
    <header>
      <Navbar className="bg-body-tertiary mb-2">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Money Forward - Coding Test
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
