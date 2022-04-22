import type { NextPage } from "next";
import Link from "next/link";
import { Button, Grid, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import User from "../../entities/user.entity";
import UserService from "../../services/user.service";
import { parseJwt } from "../../helpers";
import { useCookies } from "react-cookie";

const Users: NextPage = () => {
  const [users, setUsers] = React.useState([] as User[]);
  const [fetched, setFetched] = React.useState(false);

  const [cookie, setCookie] = useCookies(["user"]);
  const [userRole, setUserRole] = useState(0);

  async function init() {
    const responseUsers: User[] = await UserService.getAll();
    setUsers(responseUsers);
    setFetched(true);
  }
  //for initialize
  useEffect(() => {
    const token = cookie.user["token"];
    if (token) {
      const user = parseJwt(token);
      setUserRole(
        user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
    init();
    return () => {};
  }, [fetched]);

  const User = ({ user }: { user: User }) => {
    return (
      <div>
        <Text h6 size={15} style={{ margin: 0 }}>
          {user.TxtName}
        </Text>
      </div>
    );
  };

  return (
    <div>
      <Link href={"/"}>
        <a>
          <Button>Go to Home</Button>
        </a>
      </Link>
      <Grid.Container gap={2} justify="center">
        {users.map((user) => (
          <Grid xs={6} key={user.IdentityCardNum}>
            <User user={user} />
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
};

export default Users;
