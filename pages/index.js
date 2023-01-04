import Button from "../components/Button";
import GitHub from "../components/Icons/Github";
import MainLayout from "../components/MainLayout";
import { colors } from "../styles/themes";
import { loginWithGitHub } from "../firebase/client";

export default function Home() {
  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <MainLayout>
        <section>
          <img src="/twitter-logo.png" alt="logo" />
          <h1>devTweet</h1>
          <h2>talk about bugs, code and coffe!</h2>
          <div>
            <Button onClick={handleClick}>
              <GitHub width={24} height={24} fill="#fff" />
              Login with Github
            </Button>
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
