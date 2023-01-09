import Button from "../components/Button";
import GitHub from "../components/Icons/Github";
import MainLayout from "../components/MainLayout";
import { colors } from "../styles/themes";
import { loginWithGitHub, onAuthStateChanged } from "../firebase/client";
import { useEffect, useState } from "react";
import Avatar from "../components/Avatar/Index";
import Logo from "../components/Icons/Logo";

export default function Home() {
  const [userE, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        setUser(user);
        console.log(userE);
      })
      .catch((err) => {
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
            {userE === null && (
              <Button onClick={handleClick}>
                <GitHub width={24} height={24} fill="#fff" />
                Login with Github
              </Button>
            )}
            {userE && userE.avatar && (
              <div>
                <Avatar
                  src={userE.avatar}
                  alt={userE.userName}
                  text={userE.userName}
                />
              </div>
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
