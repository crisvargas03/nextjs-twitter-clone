import { colors, fonts, breackpoints } from "../styles/themes";
import { addOpacityToColor } from "../styles/utils";
import css from "styled-jsx/css";

const backgroundColor = addOpacityToColor(colors.primary, 0.3);

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, #fafafa 1px),
      radial-gradient(${backgroundColor} 1px, #fafafa 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: ${fonts.base};
  }
  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }
`;

export default css`
  div {
    display: grid;
    place-items: center;
    height: 100vh;
  }

  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgb(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow-y: auto;
    width: 100%;
  }

  @media (min-width: ${breackpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breackpoints.mobile};
    }
  }
`;
