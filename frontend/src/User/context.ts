/**
 * @file context.ts
 *
 * @brief Provides the user context for managing user-related data across the application.
 *
 * @details This file exports a React context for managing a `User` instance. It is used to provide
 *          user-related data and methods throughout the component tree.
 *
 * @module UserContext
 *
 * @example
 * // Importing and using the user context
 * import userContext from './User/context';
 *
 * // In a functional component
 * const user = useContext(userContext);
 *
 * @see {@link User} for the user class definition.
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { createContext } from "react";
import User from ".";

/**
 * @constant userContext
 * @brief React context for managing user data.
 * @details The `userContext` provides access to a `User` instance across the component tree.
 *          It is initialized with a new instance of the `User` class.
 * @type {React.Context<User>}
 *
 * @example
 * // Example usage in a functional component
 * const user = useContext(userContext);
 */
const userContext = createContext<User>(new User());

export default userContext;
