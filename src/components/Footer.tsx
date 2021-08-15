import styled from "@emotion/styled"

const StyledFooter = styled.footer({
  boxSizing: "border-box",
  padding: "8px",
  fontSize: "12px",
  color: "#ad6126",
  a: { color: "#ad6126", textDecoration: "none" },
  "a:hover": { color: "#ad6126", textDecoration: "underline" },
})

export const Footer = (): JSX.Element => (
  <StyledFooter>
    © Copyright {new Date().getFullYear()},{" "}
    <a href="https://violapeter.hu">Viola Péter</a>
  </StyledFooter>
)
