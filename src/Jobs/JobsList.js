import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../userContext";
import JobCard from "./JobCard";

function JobsList({jobs, applyToJob}) {
  const {user} = useContext(UserContext);
  const history = useHistory();
  const [jobsList, setJobsList] = useState([])
  const [isVisible, setIsVisible] = useState("false")

  useEffect(() => {
    if (user.username) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [user, history])

  useEffect(() => {
    setJobsList(jobs.map(job => <JobCard job={job} applyToJob={applyToJob} key={job.id}/>))
  }, [jobs, applyToJob])

  const redirectUnauth = (path) => {
    history.push(path);
  }

  return (<div>
    <h1>Jobs</h1>
    {isVisible? jobsList : 
      <div>
        <p>You must be logged in to view jobs on Jobly!</p>
        <button onClick={evt => redirectUnauth("/login")}>Log In</button>
        <button onClick={evt => redirectUnauth("/signup")}>Sign Up</button>
      </div>}
  </div>)
}

export default JobsList