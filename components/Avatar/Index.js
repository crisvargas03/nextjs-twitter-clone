import style from "../../styles/Avatar.module.css";

export default function Avatar({ alt, src, text }) {
  return (
    <div className={style.container}>
      <img className={style.avatar} src={src} alt={alt} title={alt} />
      {text && <strong>{text}</strong>}
    </div>
  );
}
