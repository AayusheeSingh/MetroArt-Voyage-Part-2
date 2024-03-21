import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap'; 
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store'; 

const MainNav = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false); 
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); 

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchField = e.target.search.value;
    const queryString = `title=true&q=${searchField}`;
    setSearchHistory((current) => [...current, queryString]); 
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false); 
  };

  const collapseNavbar = () => setIsExpanded(false); 

  return (
    <>
      <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-primary" onToggle={() => setIsExpanded(!isExpanded)}>
        <Container>
          <Navbar.Brand>Aayushee Singh</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior><a className="nav-link" onClick={collapseNavbar}>Home</a></Link>
              <Link href="/search" passHref legacyBehavior><a className="nav-link" onClick={collapseNavbar}>Advanced Search</a></Link>
            </Nav>
            &nbsp;
            <Form onSubmit={handleSearchSubmit} className="d-flex">
              <FormControl type="text" name="search" placeholder="Search" className="mr-2" />
              <Button type="submit" variant="outline-light">Search</Button>
            </Form>
            &nbsp;
            <Nav>
              <NavDropdown title="User Name" id="nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <a className="dropdown-item" onClick={collapseNavbar}>Favourites</a>
                </Link>
                <NavDropdown.Divider />
                <Link href="/history" passHref legacyBehavior>
                  <a className="dropdown-item" onClick={collapseNavbar}>Search History</a>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
