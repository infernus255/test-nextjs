import http from "./http";
import UserLogin from "../entities/userLogin.entity";

const endpoint = "/token";

const UserService = {
  login,
};

async function login(login: UserLogin): Promise<string> {
  return await http
    .post<string>(endpoint, login)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return "";
    });
}

export default UserService;
