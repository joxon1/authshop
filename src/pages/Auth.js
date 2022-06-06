import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  Row
} from "react-bootstrap";
import { NavLink, useLocation,useHistory } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { lOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utilts/consts";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === lOGIN_ROUTE;
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try{
      let data;
      if (isLogin) {
        data = await login(number, name, password);
      } else {
        data = await registration(number, name, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      history.push(SHOP_ROUTE);
    } catch(e){
      alert(e.responce.data.message);
    }
    
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 680 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <FormControl
            className="mt-3"
            placeholder="Введите ваш номер..."
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <FormControl
            className="mt-3"
            placeholder="Введите ваш имя..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl
            className="mt-3"
            placeholder="Введите ваш парол..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 ">
            {isLogin ? (
              <div>
                Нет аккаунта ?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Зарегитрируйте!</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунта ? <NavLink to={lOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            )}
            <Button variant={"outline-success"} onClick={() => click()}>
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
