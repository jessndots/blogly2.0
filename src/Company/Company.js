import React, {useState, useEffect, useContext} from "react";
import { useHistory, useParams } from "react-router-dom";
import JobsList from "../Jobs/JobsList";
import UserContext from "../userContext";


function Company({applyToJob, getCompany}) {
  const {user} = useContext(UserContext);
  const history = useHistory();
  const [jobs, setJobs] = useState([]);
  const {handle} = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    if (!user.username) {
      history.push("/login")
    }
    async function getComp(h) {
      const comp = await getCompany(h);
      setCompany(comp);
    }
    getComp(handle);
  }, [user, history, handle])



  useEffect(function renderJobs() {
    if (company.jobs) {
      setJobs(company.jobs)
    }
  }, [company])

  

  return <div>
    <h1>{company.name}</h1>
    <p>{company.description}</p>
    {company.numEmployees?
      <p>Number of Employees: {company.numEmployees}</p>
    : null}
    <h2>Open Positions</h2>
    <JobsList jobs={jobs} applyToJob={applyToJob}/>
  </div>
}

export default Company