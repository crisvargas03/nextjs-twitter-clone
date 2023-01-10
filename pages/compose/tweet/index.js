import style from "../../../styles/ComposeTweet.module.css";
import MainLayout from "../../../components/MainLayout";
import Button from "../../../components/Button";
import useUser from "../../../hooks/useUser";
import Head from "next/head";
import { useEffect, useState } from "react";
import { addDevit, uploadImage } from "../../../firebase/client";
import { useRouter } from "next/router";

const COMPOSE_STATE = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATE.USER_NOT_KNOWN);

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (task) {
      let onProgress = () => {};
      let onError = () => {};
      let onComplete = () => {
        console.log("onComplete");
      };

      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

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

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);

    const file = e.dataTransfer.files[0];
    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATE.LOADING;

  return (
    <>
      <MainLayout>
        <Head>
          <title>Write some</title>
        </Head>
        <form className={style.form} onSubmit={handleSubmit}>
          <textarea
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
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

      <style jsx>
        {`
          textarea {
            border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? "3px dashed #09f"
              : "3px solid transparent"};
          }
        `}
      </style>
    </>
  );
}
