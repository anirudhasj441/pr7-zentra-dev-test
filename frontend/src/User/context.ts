import { createContext } from "react";
import User from ".";

const userContext = createContext<User>(new User());

export default userContext;
