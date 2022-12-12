import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react"
import UserContext from "../userContext";
import JobCard from "./JobCard";
import reactRouterDom, {Router, Link} from 'react-router-dom';
import { createMemoryHistory } from "history";

it("redirects anon user to login page", function() {
  const user = { username: "" };
  const history = createMemoryHistory();
  const job = {title: "testTitle", salary: "testSalary", equity: "testEquity", id: "testId"}
  render(<Router history={history}><UserContext.Provider value={{ user }}><JobCard job={job}/></UserContext.Provider></Router>)

  expect(history.location.pathname).toBe("/login");
})

it("displays job card", function(){
  const user = {username: "username"};
  const job = {title: "testTitle", salary: "testSalary", equity: "testEquity", id: "testId"}
  const history = createMemoryHistory();

  const {getByText} = render(<Router history={history}><UserContext.Provider value={{ user }}><JobCard job={job}/></UserContext.Provider></Router>)

  expect(getByText("testTitle")).toBeInTheDocument();

})