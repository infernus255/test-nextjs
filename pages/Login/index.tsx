import type { NextPage } from "next";
import Link from "next/link";
import {
  Button,
  Card,
  Col,
  Container,
  FormElement,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import React from "react";
import UserLogin from "../../entities/userLogin.entity";
import loginService from "../../services/login.service";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [userLogin, setUserLogin] = React.useState({} as UserLogin);
  const [cookie, setCookie] = useCookies(["user"]);

  const router = useRouter();

  const handleUserChange = (e: React.ChangeEvent<FormElement>) =>
    setUserLogin({ ...userLogin, TxtUser: e.target.value });
  const handlePasswordChange = (e: React.ChangeEvent<FormElement>) => {
    setUserLogin({ ...userLogin, TxtPassword: e.target.value });
  };
  const onLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await loginService.login(userLogin);
      if (response) {
        setCookie("user", JSON.stringify(response), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={3}>
          <Card cover css={{ w: "100%" }} color="gradient">
            <Card.Header>
              <Col>
                <Text
                  size={12}
                  weight="bold"
                  transform="uppercase"
                  color="#ffffffAA"
                >
                  User
                </Text>
                <Text h3 color="black">
                  Login
                </Text>
              </Col>
            </Card.Header>
            <Card.Body css={{ height: 400, width: "100%" }}>
              <Container css={{ paddingTop: 50 }} fluid>
                <Input
                  clearable
                  labelPlaceholder="User"
                  onChange={handleUserChange}
                  initialValue=""
                />
                <Spacer y={2.5} />
                <Input.Password
                  labelPlaceholder="Password"
                  onChange={handlePasswordChange}
                  initialValue=""
                />
              </Container>
            </Card.Body>
            <Card.Footer
              blur
              css={{
                position: "absolute",
                bgBlur: "#ffffff",
                borderTop:
                  "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <Row>
                <Col>
                  <Row justify="flex-end">
                    <Button
                      flat
                      auto
                      rounded
                      color="secondary"
                      onClick={onLoginClick}
                    >
                      <Text
                        css={{ color: "inherit" }}
                        size={12}
                        weight="bold"
                        transform="uppercase"
                      >
                        Login
                      </Text>
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Login;
