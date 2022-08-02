import React from "react";
import "./Footer.css";
class Footer extends React.Component {
  render() {
    return (
      <footer className="py-3 border-top border-bottom">
        <center>
          <small>
            {" "}
            <b>Kwiz</b> - Copyright ©2019 - 2022 |{" "}
            <a href="https://github.com/AchrafB94">Achraf Bouanani</a>
          </small>
        </center>
      </footer>
    );
  }
}

export default Footer;
