import style from "../../styles/HomePage.module.css";
import MainLayout from "../../components/MainLayout";
import { useEffect, useState } from "react";
import Devit from "../../components/Devit";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline);
  }, []);

  return (
    <>
      <MainLayout>
        <section className={style.section}>
          <header className={style.header}>
            <h2 className={style.h2}>Home</h2>
          </header>
          {timeline.map((devit) => (
            <Devit
              key={devit.id}
              avatar={devit.avatar}
              message={devit.message}
              username={devit.username}
              id={devit.id}
            />
          ))}
          <nav className={style.nav}></nav>
        </section>
      </MainLayout>
    </>
  );
}
