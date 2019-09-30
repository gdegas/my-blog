import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

import Toggle from "./Toggle"
import moon from "../assets/moon.png"
import sun from "../assets/sun.png"

class ThemeToggle extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label>
            <Toggle
              icons={{
                checked: (
                  <img
                    src={moon}
                    width="16"
                    height="16"
                    role="presentation"
                    style={{ pointerEvents: "none" }}
                  />
                ),
                unchecked: (
                  <img
                    src={sun}
                    width="16"
                    height="16"
                    role="presentation"
                    style={{ pointerEvents: "none" }}
                  />
                ),
              }}
              checked={theme === "light"}
              onChange={e => toggleTheme(e.target.checked ? "light" : "dark")}
            />
          </label>
        )}
      </ThemeToggler>
    )
  }
}

export default ThemeToggle
