import React from 'react';
import { Link } from "react-router-dom";

function SideBarLink({ label, to, activeOnlyWhenExact }) {
    return (
          <div >
          <Link to={to}  className="subjects list-group-item list-group-item-action">{label}</Link>
          </div>
    
    );
  }

export default SideBarLink;