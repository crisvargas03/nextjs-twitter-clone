import style from "../../styles/HomePage.module.css";
import Avatar from "../../components/Avatar";
import useTimeAgo from "../../hooks/useTimeAgo";

export default function Devit({ avatar, id, userName, content, createdAt }) {
  const timeAgo = useTimeAgo(createdAt);

  return (
    <>
      <article className={style.article} key={id}>
        <div className={style.div}>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <span className={style.date}>{timeAgo}</span>
          </header>
          <p className={style.p}>{content}</p>
        </section>
      </article>
    </>
  );
}
