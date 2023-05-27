import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const LogoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }


  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="md" collapseOnSelect>
        <Container>

          <LinkContainer to='/'>
            <Navbar.Brand >AZ PARA </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />

            <NavDropdown title={'Categorie'} id='username'>
              <LinkContainer to='/'>
                <NavDropdown.Item>Bébé & Enfant</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to='/'>
                <NavDropdown.Item>Santé & Bien-être</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to='/'>
                <NavDropdown.Item>Soins & Beauté du visage</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to='/'>
                <NavDropdown.Item>Shampoo</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <Nav className="ml-auto" >
              <LinkContainer to='/cart'>
                <Nav.Link><i className='fas fa-shopping-cart'></i>PANIER</Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={'Admin'} id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Utilisateurs</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Des produits</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Commandes</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={LogoutHandler}> Se déconnecter </NavDropdown.Item>
                </NavDropdown>

              ) : <LinkContainer to='/login'>
                <Nav.Link ><i className='fas fa-user'></i>S'identifier</Nav.Link>
              </LinkContainer>}

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar >
    </header >
  )
}
<Link></Link>

export default Header
