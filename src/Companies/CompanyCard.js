import React, {useContext, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import UserContext from "../userContext";

function CompanyCard({handle, name, description}) {
  const {user} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user.username) {
      history.push("/login")
    }
  }, [user, history])

  return <div>
    <Link to={`companies/${handle}`}>{name}</Link>
    <p>{description}</p><br/>
  </div>
}

export default CompanyCard