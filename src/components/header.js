import * as React from "react"
import { Link } from "gatsby"

const Header = () => (
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
      boxShadow: `0 2px 4px rgba(0, 0, 0, 0.1)`,
      position: `sticky`,
      top: 0,
      zIndex: 90,
      backgroundColor: `#FFF`,
    }}
  >
    <Link
      to="/"
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
      }}
    >
      SSR Crypto Data with Gatsby
    </Link>
  </header>
)

export default Header
