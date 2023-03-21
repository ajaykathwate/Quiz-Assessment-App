import axios from "axios";
import jwt_decode from "jwt-decode";
import { REACT_APP_SERVER_DOMAIN } from "../../env";

axios.defaults.baseURL = REACT_APP_SERVER_DOMAIN;

/** Make API calls */

/** To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token);
  return decode;
}

/**authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username does not exists!" };
  }
}

/** Get User details */
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    // console.log(data);
    return data;
  } catch (error) {
    return { error: "Password does not match!" };
  }
}

/** registerUser */
export async function registerUser(credentials) {
  try {
    const {
      data: { message },
      status,
    } = await axios.post(`/api/register`, credentials);
    let { username, email } = credentials;
    if (status === 201) {
      await axios.post(`/api/registerMail`, {
        username,
        userEmail: email,
        text: message,
        subject: "Registration successful!",
      });
    }
    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**login */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post(`/api/login`, { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't match...!" });
  }
}

/**Update user */
export async function updateUser(response, id) {
  try {
    const username = getUsername();
    console.log("Username: ", username[0]);
    console.log("response:", response);
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("data: \n", data);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update profile...!" });
  }
}

/**generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get(`/api/generateOTP`, { params: { username } });
    // console.log(username);
    if (status === 201) {
      let {
        user: { email },
      } = await getUser({ username });

      // console.log(email);
      let text = `Your Password Recovery is ${code}. Verify and recover your password.`;
      await axios.post(`/api/registerMail`, {
        username,
        userEmail: email,
        text,
        subject: "Password Recivery OTP!",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**Verify OTP */
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get(`/api/verifyOTP`, {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**Reset Password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put(`/api/resetPassword`, {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
