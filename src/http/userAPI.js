import { $authHost, $host } from ".";
import jwtDecode from "jwt-decode";

export const registration = async (number, name, password) => {
  const { data } = await $host.post("api/user/register", {
    number,
    name,
    password
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
export const login = async (number, name, password) => {
  const { data } = await $host.post("api/user/login", {
    number,
    name,
    password
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
export const check = async () => {
  const {data} = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
