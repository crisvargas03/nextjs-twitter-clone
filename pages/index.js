import Button from "../components/Button";
import GitHub from "../components/Icons/Github";
import MainLayout from "../components/MainLayout";
import { colors } from "../styles/themes";
import { loginWithGitHub } from "../firebase/client";
import { useEffect } from "react";
import Logo from "../components/Icons/Logo";
import { useRouter } from "next/router";
import useUser, { USER_STATE } from "../hooks/useUser";

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace("/home");
  }, [user]);

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <MainLayout>
        <section>
          <Logo width="100" />
          <h1>Devtweet</h1>
          <h2>talk about bugs, code and coffe!</h2>
          <div>
            {user === USER_STATE.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub width={24} height={24} fill="#fff" />
                Login with Github
              </Button>
            )}
            {user === USER_STATE.NOT_KNOWN && (
              <img src="/spiner.gif" alt="loading..." />
            )}
          </div>
        </section>
      </MainLayout>

      <style jsx>{`
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        img {
          width: 180px;
        }

        h1 {
          color: ${colors.primary};
          font-Weight: : 800;
          font-size: 32px;
          margin-Bottom: 0
        }

        h2 {
          color: ${colors.secondary};
          font-size: 18px;
          margin: 0
        }

        div {
          margin-top: 16px 
        }
      `}</style>
    </>
  );
}
