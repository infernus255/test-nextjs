import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Button } from "@nextui-org/react";
import { parseCookies, parseJwt } from "../helpers";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

const Home: NextPage = () => {
  const [cookie, setCookie] = useCookies(["user"]);
  const [userRole, setUserRole] = useState(0);
  useEffect(() => {
    const token = cookie.user["token"];
    if (token) {
      const user = parseJwt(token);
      setUserRole(
        user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
    return () => {};
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Test Crud</title>
        <meta name="description" content="Test Crud" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Test Crud!</h1>
        <div className={styles.description}>
          {userRole == 1 ? (
            <Link href={"/Users"}>
              <a>
                <Button>Go to Users</Button>
              </a>
            </Link>
          ) : null}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;

Home.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);
  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  return {
    data: data && data,
  };
};
