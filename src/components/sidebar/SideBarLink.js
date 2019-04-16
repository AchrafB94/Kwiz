import React from 'react';
import { Route } from "react-router-dom";

function SideBarLink({ label, to, activeOnlyWhenExact }) {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
          <div className={match ? "current" : ""}>
          <a href={to}  className="list-group-item list-group-item-action">{label}</a>
          </div>
        )}
      />
    );
  }

export default SideBarLink;