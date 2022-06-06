import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { ADMIN_ROUTE, lOGIN_ROUTE, SHOP_ROUTE } from "../utilts/consts";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

  const logOut = ()=>{
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link style={{ color: "white" }} to={SHOP_ROUTE}>
          -Telshop-{" "}
        </Link>
        {user.isAuth ? (
          <Nav
            className="d-flex justify-content-evenly"
            style={{ color: "white" }}
          >
            <Button
              variant={"outline-light"}
              onClick={() => history.push(ADMIN_ROUTE)}
              className="me-2"
            >
              Админ панель
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav
            className="d-flex justify-content-evenly"
            style={{ color: "white" }}
          >
            <Button
              variant={"outline-light"}
              onClick={() => history.push(lOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
