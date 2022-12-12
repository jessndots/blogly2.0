import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react"
import UserContext from "../userContext";
import CompanyCard from "./CompanyCard";
import reactRouterDom, {Router, Link} from 'react-router-dom';
import { createMemoryHistory } from "history";

it("redirects anon user to login page", function() {
  const user = { username: "" };
  const history = createMemoryHistory();
  render(<Router history={history}><UserContext.Provider value={{ user }}><CompanyCard /></UserContext.Provider></Router>)

  expect(history.location.pathname).toBe("/login");
})

it("displays company card w/ working link to details page", function(){
  const user = {username: "username"};
  const company = {handle: "testHandle", name: "testName", description: "test description"}
  const history = createMemoryHistory();

  const {getByText} = render(<Router history={history}><UserContext.Provider value={{ user }}><CompanyCard handle={company.handle} name={company.name} description={company.description}/></UserContext.Provider></Router>)

  expect(getByText("test description")).toBeInTheDocument();

  fireEvent.click(getByText("testName"));

  expect(history.location.pathname).toBe("companies/testHandle")
})