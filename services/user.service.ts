import http from "./http";
import User from "../entities/user.entity";

const endpoint = "/user";

const UserService = {
  getAll,
};

async function getAll(): Promise<User[]> {
  return await http
    .get<User[]>(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export default UserService;
