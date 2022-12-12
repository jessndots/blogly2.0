import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react"
import UserContext from "../userContext";
import {Router} from 'react-router-dom';
import CompaniesList from "./CompaniesList";
import { createMemoryHistory } from "history";

it("anon user is shown login / sign up option instead of companies", function(){
  const user = {username: ""};
  const history = createMemoryHistory();

  const companies = []
  const {getByText} = render(<Router history={history}><UserContext.Provider value={{ user }}><CompaniesList companies={companies}/></UserContext.Provider></Router>)

  expect(getByText("You must be logged in to view companies on Jobly!")).toBeInTheDocument();
})

it("links to login/sign up work for anon user", function(){
  const user = {username: ""};
  const companies = []
  const history = createMemoryHistory();
  const {getByText} = render(<Router history={history}><UserContext.Provider value={{ user }}><CompaniesList companies={companies}/></UserContext.Provider></Router>)
  
  // click login link
  fireEvent.click(getByText("Log In"))
  expect(history.location.pathname).toBe("/login");

  // click sign up link
  fireEvent.click(getByText("Sign Up"));
  expect(history.location.pathname).toBe("/signup");
})

it("displays search form for logged in user", function() {
  const user = {username: "username"};
  const companies = [{handle: "testHandle", name: "testName", description: "this is a test company description"}];
  const history = createMemoryHistory();

  const {getByText} = render(<Router history={history}><UserContext.Provider value={{ user }}><CompaniesList companies={companies}/></UserContext.Provider></Router>)

  expect(getByText("Search Companies")).toBeInTheDocument();
})

it("displays company detail from list", function(){
  const user = {username: "username"};
  const companies = [{handle: "testHandle", name: "testName", description: "this is a test company description"}];
  const companiesList = companies.map(c => <div>{c.name}</div>)

  const history = createMemoryHistory();

  const {getByText} = render(<Router history={history}><UserContext.Provider value={{ user }}><CompaniesList companies={companies}/></UserContext.Provider></Router>)

  expect(getByText("testName")).toBeInTheDocument();
})

it("search form works", async function(){
  const user = {username: "username"};
  const companies = [{handle: "testHandle1", name: "testName1", description: "this is a test company description"}, {handle: "testHandle2", name: "testName2", description: "test description 2"}];
  const companiesList = companies.map(c => <div>{c.name}</div>)
  const history = createMemoryHistory();

  // mock searchCompany func
  const mockSearchCompany = jest.fn()

  const {getByText, getByLabelText, getByTestId} = render(<Router history={history}><UserContext.Provider value={{ user }}><CompaniesList companies={companies} searchCompany={mockSearchCompany}/></UserContext.Provider></Router>)

  // check for test company 1
  expect(getByText("testName1")).toBeInTheDocument();

  // search for company named "testName2"
  fireEvent.change(getByLabelText("Company Name"), { target: { value: 'testName2' } })

  await waitFor(() => {
    fireEvent.submit(getByTestId("form"));
  })

  // check that mockSearchCompany was called
  expect(mockSearchCompany).toHaveBeenCalledTimes(1);

})