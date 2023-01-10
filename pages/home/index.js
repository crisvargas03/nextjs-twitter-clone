import style from "../../styles/HomePage.module.css";
import MainLayout from "../../components/MainLayout";
import { useEffect, useState } from "react";
import Devit from "../../components/Devit";
import useUser from "../../hooks/useUser";
import { fetchLatestDevits } from "../../firebase/client";
import Link from "next/link";
import Created from "../../components/Icons/Created";
import Home from "../../components/Icons/Home";
import Search from "../../components/Icons/Search";
import Head from "next/head";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline);
    console.log(timeline);
  }, [user]);

  return (
    <>
      <MainLayout>
        <Head>
          <title>Home</title>
        </Head>
        <header className={style.header}>
          <h2 className={style.h2}>Home</h2>
        </header>
        <section className={style.section}>
          {timeline.map(
            ({ id, userName, avatar, content, userID, createdAt }) => (
              <Devit
                avatar={avatar}
                createdAt={createdAt}
                id={id}
                key={id}
                content={content}
                userName={userName}
                userID={userID}
              />
            )
          )}
        </section>
        <nav className={style.nav}>
          <Link className={style.link} href="/home">
            <Home width={32} height={32} stroke="#09f" />
          </Link>
          <Link className={style.link} href="/">
            <Search width={32} height={32} stroke="#09f" />
          </Link>
          <Link className={style.link} href="/compose/tweet">
            <Created width={32} height={32} stroke="#09f" />
          </Link>
        </nav>
      </MainLayout>
    </>
  );
}
