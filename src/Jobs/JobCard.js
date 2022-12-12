import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../userContext";

function JobCard({ job, applyToJob}) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    if (!user.username) {
      history.push("/login")
    } 
  }, [user, history])

  useEffect(() => {
    if (user.applications) {
      if (user.applications.filter(j => j === job.id).length > 0) {
        setHasApplied(true)
      }
    }
  }, [user, job.id])

  const handleClick = () => {
    try {
      applyToJob(job.id)
      setHasApplied(true);
    }
    catch (err) { 
      console.error(err) 
    }
  }
 
  return (<div>
    <div>
      <h3>{job.title}</h3>
      <Link to={`/companies/${job.companyHandle}`} ><i>{job.companyName}</i></Link>
      <p>Salary: ${job.salary}</p>
      <p>Equity: {job.equity}</p><br />
    </div>
        {hasApplied ? (
          <p>Applied!</p>
        ) : (
          <button onClick={handleClick}>Apply</button>
        )}
  </div>)
}

export default JobCard