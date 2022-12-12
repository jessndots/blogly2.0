import React, {useEffect, useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import CompanyCard from './CompanyCard'
import UserContext from "../userContext";

function CompaniesList({companies, searchCompany}) {
  const {user} = useContext(UserContext);
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user.username) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [user, history])

  const INITIAL_STATE = {name: "", minEmployees: 0, maxEmployees: null};
  const [searchQuery, setSearchQuery] = useState(INITIAL_STATE);
  const [companiesList, setCompaniesList] = useState([])
  
  useEffect(function fetchCompaniesOnMount() {
    setCompaniesList(companies.map(c => <CompanyCard handle={c.handle} name={c.name} description={c.description} key={c.handle}/>))
  }, [companies])

  const handleChange = evt => {
    const {name, value} = evt.target;
    setSearchQuery(sQuery => ({...sQuery, [name]:value}));
  }

  const handleSubmit = evt => {
    evt.preventDefault();  
    if (searchQuery !== INITIAL_STATE) {
      searchCompany(searchQuery);
      setSearchQuery(INITIAL_STATE);
    }
  }

  const redirectUnauth = (path) => {
    history.push(path);
  }

  return <div>
    <h1>Companies</h1>
    {isVisible? 
      <div>
        <form className="searchBar" onSubmit={handleSubmit} data-testid="form">
          <label htmlFor="name">Company Name</label>
          <input name="name" type='text' onChange={handleChange} id="name"></input><br/>
          <label htmlFor="minEmployees">Min # of Employees</label>
          <input name="minEmployees" id="minEmployees" type='number' onChange={handleChange}></input><br/>
          <label htmlFor="maxEmployees">Max # of Employees</label>
          <input name="maxEmployees" id="maxEmployees" type='number' onChange={handleChange}></input><br/>
          <button type="submit">Search Companies</button>
        </form><br/>
        {companiesList} 
      </div> :
      <div>
        <p>You must be logged in to view companies on Jobly!</p>
        <button onClick={evt => redirectUnauth("/login")}>Log In</button>
        <button onClick={evt => redirectUnauth("/signup")}>Sign Up</button>
      </div>}
  </div>
}

export default CompaniesList