import React, { useEffect, useState, useContext, useParams } from 'react';
import { Route, Redirect, useHistory } from "react-router-dom";
import './App.css';
import UserContext from './userContext';
import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import CompaniesList from './Companies/CompaniesList';
import Company from './Company/Company';
import JobsList from './Jobs/JobsList';
import Profile from './Profile/Profile';
import LogInForm from './LogInForm/LogInForm';
import SignUpForm from './SignUpForm/SignUpForm';
import JoblyApi from './api';



function App() {
  // eslint-disable-next-line
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const history = useHistory();
  const [signUpErr, setSignUpErr] = useState([]);

  useEffect(function fetchDataOnMount() {
    async function fetchCompanies() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }
    async function fetchJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    fetchCompanies();
    fetchJobs();
  }, [])


  const signUpUser = (formData) => {
    async function signUp(data) {
      try {
        const res = await JoblyApi.signUpUser(data);
        setToken(res);
        setSignUpErr([]);
        return res
      } catch (err) {
        if (err[0] === "Duplicate username: username") {
          setSignUpErr(error => [...error, "That username is already taken. Please enter another."])
        } else {
          setSignUpErr(error => [...error, err]);
        }
      }
    }
    return signUp(formData);
  }

  const logInUser = async (formData) => {
    const res = await JoblyApi.logInUser(formData);
    setToken(res.token);
    return res
  }

  const logOutUser = () => {
    async function logOut() {
      setToken("");
      JoblyApi.token = null;
      history.push("/")
    }
    logOut();
  }


  const searchCompany = (query) => {
    async function search(q) {
      const results = await JoblyApi.getCompanies(q);
      setCompanies(results);
    }
    search(query);
  }


  const editProfile = (oldUsername, newData) => {
    async function edit(u, data) {
      const editedUser = await JoblyApi.editUser(u, data);
      setUser(editedUser)
    }
    edit(oldUsername, newData);
  }

  const applyToJob = (jobId) => {
    async function apply(u, id) {
      try { await JoblyApi.applyToJob(u, id) }
      catch (err) { console.error(err); }
    }
    apply(user.username, jobId)
  }

  
  const getCompany = async (handle) => {
    const comp = await JoblyApi.getCompany(handle);
    return comp
  }


  return (
    <div>
      <NavBar logOut={logOutUser} />
      <Route exact path="/companies"><CompaniesList companies={companies} searchCompany={searchCompany} /></Route>
      <Route exact path="/companies/:handle"><Company applyToJob={applyToJob} getCompany={getCompany}/></Route>
      <Route exact path="/jobs"><JobsList jobs={jobs} applyToJob={applyToJob} /></Route>
      <Route exact path="/profile"><Profile editProfile={editProfile} applyToJob={applyToJob} /></Route>
      <Route exact path="/login"><LogInForm logIn={logInUser} /></Route>
      <Route exact path="/signup"><SignUpForm signUp={signUpUser} error={signUpErr} /></Route>
      <Route exact path="/"><Home /></Route>
      <Redirect to="/" />
    </div>
  );
}

export default App;
