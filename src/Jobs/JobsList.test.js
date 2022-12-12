import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react"
import UserContext from "../userContext";
import {Router} from 'react-router-dom';
import JobsList from "./JobsList";
import { createMemoryHistory } from "history";

it("anon user is shown login / sign up option instead of jobs", function(){
  const user = {username: ""};
  const history = createMemoryHistory();

  const jobs = []
  const {getByText} = render(<Router history={history}><UserContext.Provider value={{ user }}><JobsList jobs={jobs}/></UserContext.Provider></Router>)

  expect(getByText("You must be logged in to view jobs on Jobly!")).toBeInTheDocument();
})

it("links to login/sign up work for anon user", function(){
  const user = {username: ""};
  const jobs = []
  const history = createMemoryHistory();
  const {getByText} = render(<Router history={history}><UserContext.Provider value={{ user }}><JobsList jobs={jobs}/></UserContext.Provider></Router>)
  
  // click login link
  fireEvent.click(getByText("Log In"))
  expect(history.location.pathname).toBe("/login");

  // click sign up link
  fireEvent.click(getByText("Sign Up"));
  expect(history.location.pathname).toBe("/signup");
})


it("displays job detail from list", function(){
  const user = {username: "username"};
  const jobs = [{title: "testTitle", salary: "testSalary", equity: "testEquity", id: "testId"}];
  const jobsList = jobs.map(c => <div>{c.title}</div>)

  const history = createMemoryHistory();

  const {getByText} = render(<Router history={history}><UserContext.Provider value={{ user }}><JobsList jobs={jobs}/></UserContext.Provider></Router>)

  expect(getByText("testTitle")).toBeInTheDocument();
})
