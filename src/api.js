import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company
  }

  /** Get list of companies with details  */
  static async getCompanies(q) {
    if (!q) {
      let res = await this.request('companies');
      return res.companies
    } else {
      // filter out empty keys & map into query string
      const queryString = Object.keys(q).filter(key => q[key]).map(key => (key + '=' + q[key])).join('&');

      let res = await this.request(`companies?${queryString}`)
      return res.companies
    }
  }

  /** Add new company */
  static async addCompany(data) {
    let res = await this.request(`companies`, data, "post")
    return res.company
  }

  /** Edit company by handle */
  static async editCompany(handle, data) {
    let res = await this.request(`companies/${handle}`, data, "patch");
    return res.company
  }

  /** Delete company by handle */
  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, "delete");
    return res
  }



  /** Get detail on job by jobId */
  static async getJob(jobId) {
    let res = await this.request(`jobs/${jobId}`);
    return res.job
  }

  /** Get list of jobs */
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs
  }

  /** Add new job */
  static async addJob(data) {
    let res = await this.request(`jobs`, data, "post");
    return res.job
  }

  /** Edit job by jobId */
  static async editJob(jobId, data) {
    let res = await this.request(`jobs/${jobId}`, data, "patch");
    return res.job
  }

  /** Delete job by jobId */
  static async deleteJob(jobId) {
    let res = await this.request(`jobs/${jobId}`, {}, "delete");
    return res
  }



  /** Get user by username */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get list of users */
  static async getUsers() {
    let res = await this.request(`users`);
    return res.users
  }

  /** Add new user (accessible by admin only) */
  static async addUser(data) {
    let res = await this.request(`users`, data, "post");
    return res.user
  }

  /** Edit user by username */
  static async editUser(oldUsername, newData) {
    let res = await this.request(`users/${oldUsername}`, newData, "patch");
    return res.user
  }

  /** Delete user by username */
  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    return res
  }

  /** Sign up user, returns token */
  static async signUpUser(data) {
    let res = await this.request(`auth/register`, data, "post");
    this.token = res.token
    return res.token
  }

  /** Log in user, returns token */
  static async logInUser(data) {
    let res = await this.request(`auth/token`, data, "post");
    this.token = await res.token
    return await res
  }

  /** Apply to job with username and jobId */
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res
  }
}

export default JoblyApi

