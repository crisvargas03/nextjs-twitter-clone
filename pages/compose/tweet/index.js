import style from "../../../styles/ComposeTweet.module.css";
import MainLayout from "../../../components/MainLayout";
import Button from "../../../components/Button";
import useUser from "../../../hooks/useUser";
import { useState } from "react";
import { addDevit } from "../../../firebase/client";
import { useRouter } from "next/router";

const COMPOSE_STATE = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function ComposeTweet() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATE.USER_NOT_KNOWN);
  const user = useUser();
  const router = useRouter();

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATE.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userID: user.uid,
      userName: user.userName,
    })
      .then(() => router.push("/home"))
      .catch((err) => {
        console.log(err);
        setStatus(COMPOSE_STATE.ERROR);
      });
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATE.LOADING;

  return (
    <>
      <MainLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            className={style.textarea}
            onChange={handleChange}
            placeholder="What's happenig?"
            value={message}
          ></textarea>
          <div className={style.div}>
            <Button disabled={isButtonDisabled}>Devtear</Button>
          </div>
        </form>
      </MainLayout>
    </>
  );
}
