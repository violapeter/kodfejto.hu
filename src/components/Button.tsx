import styled from "@emotion/styled"
import { HTMLAttributes, ReactNode } from "react"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  theme?: "primary" | "secondary" | "ternary"
}

const StyledButton = styled.button<{ theme: ButtonProps["theme"] }>(
  {
    fontFamily: "var(--font-base)",
    fontSize: "18px",
    border: "none",
    height: "44px",
    lineHeight: "44px",
    padding: "0 48px",
    textAlign: "center",
    transition: "all 0.2s ease",
    cursor: "default",
    userSelect: "none",
    outline: "0",

    ":active": {
      transform: "translateY(1px)",
    },
  },
  ({ theme }) =>
    theme === "primary" && {
      background: "#9b59b6",
      color: "white",
      borderRadius: "22px",

      ":hover": {
        background: "#a16db5",
      },
    },

  ({ theme }) =>
    theme === "secondary" && {
      background: "rgba(255, 255, 255, 0.6)",
      color: "#ad6126",
      borderRadius: "22px",

      ":hover": {
        background: "white",
      },
    },

  ({ theme }) =>
    theme === "ternary" && {
      background: "none",
      color: "#c17235",
      borderRadius: "22px",
      fontSize: "14px",
      border: "2px solid #c17235",
      margin: "0 0 0 10px",

      ":hover": {
        background: "rgba(255, 255, 255, 0.5)",
      },
    }
)

export const Button = ({
  children,
  theme = "secondary",
  ...props
}: ButtonProps): JSX.Element => (
  <StyledButton theme={theme} {...props}>
    {children}
  </StyledButton>
)
