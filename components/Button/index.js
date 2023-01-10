import { colors } from "../../styles/themes";

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        button {
          align-items: center;
          background: ${colors.black};
          border: 0;
          color: #fff;
          cursor: pointer;
          display: flex;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 800;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
          user-select: none;
        }

        button > :global(svg) {
          margin-right: 8px;
        }

        button[disabled] {
          pointer-events: none;
          opacity: 0.2;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  );
}
