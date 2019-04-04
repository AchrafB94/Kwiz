import React from 'react';
import { Route, Link } from "react-router-dom";

function SideBarLink({ label, to, activeOnlyWhenExact }) {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
          <div id={match ? "current" : ""}>
          <Link to={to}  className="list-group-item list-group-item-action bg-light">{label}</Link>
          </div>
        )}
      />
    );
  }

  export default SideBarLink;