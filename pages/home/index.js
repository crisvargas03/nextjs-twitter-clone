import style from "../../styles/HomePage.module.css";
import MainLayout from "../../components/MainLayout";
import { useEffect, useState } from "react";
import Devit from "../../components/Devit";
import useUser from "../../hooks/useUser";
import { fetchLatestDevits } from "../../firebase/client";

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
        <section className={style.section}>
          <header className={style.header}>
            <h2 className={style.h2}>Home</h2>
          </header>
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
          <nav className={style.nav}></nav>
        </section>
      </MainLayout>
    </>
  );
}
