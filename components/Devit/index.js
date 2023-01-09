import style from "../../styles/HomePage.module.css";
import Avatar from "../../components/Avatar";

export default function Devit({ avatar, id, username, message }) {
  return (
    <>
      <article className={style.article} key={id}>
        <Avatar alt={username} src={avatar} />
        <div className={style.div}>
          <section>
            <strong>{username}</strong>
            <p className={style.p}>{message}</p>
          </section>
        </div>
      </article>
    </>
  );
}
