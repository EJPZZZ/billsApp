import axios from "../utils/axios";
import { getToken, setToken } from "./TokenService";

export async function login(credentials) {
  await axios
    .post("/sanctum/login", credentials, {
      timeout: 10000,
    })
    .then(async (response) => {
      await setToken(response.data);
    });
}

export async function register(credentials) {
  await axios
    .post("/sanctum/register", credentials, {
      timeout: 10000,
      headers: {
        "Content-Type": "application/vnd.api+json",
      },
    })
    .then(async (response) => {
      await setToken(response.data.access_token);
    });
}

export async function loadUser() {
  // const token = await getToken();
  const token = '8|VA6gfSvsetDQmCSYGNjBOlQD1oWcrXinylxYhrIA97fdda0e';

  const { data: user } = await axios.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return user;
}

export async function logout() {
  const token = getToken()._j;

  await axios
    .post(
      "/sanctum/logout",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(async () => {
      await setToken(null);
    })
    .catch((error) => {
      console.log("Error on logout -", error);
    });
}