/**
 * @file types.ts
 *
 * @brief TypeScript interfaces for user-related data structures.
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

/**
 * @interface IUserData
 * @brief Represents a user in the system.
 * @details Contains basic user information, including optional fields for password and request status.
 */
export interface IUserData {
    /** The user's first name. */
    first_name: string;

    /** The user's last name. */
    last_name: string;

    /** The user's email address. */
    email: string;

    /** The user's username. */
    username: string;

    /** The user's password (optional). */
    password?: string;

    /** Indicates if a request has been sent by this user (optional). */
    request_sent?: boolean;
}

/**
 * @interface IRequestData
 * @brief Represents a friend request between users.
 * @details Includes details about the request, such as the sender, receiver, and request status.
 */
export interface IRequestData {
    /** The unique identifier for the request. */
    id: number;

    /** The user who sent the request. */
    request_from: IUserData;

    /** The user who received the request. */
    request_to: IUserData;

    /** The current status of the request. */
    status: "pending" | "accept" | "reject";
}

/**
 * @interface IChatData
 * @brief Represents a chat between two users.
 * @details Contains information about the participants in the chat.
 */
export interface IChatData {
    /** A short identifier for the chat. */
    short_id: string;

    /** The user who initiated the chat. */
    initiator: IUserData;

    /** The user who accepted the chat. */
    acceptor: IUserData;
}

/**
 * @interface IMessageData
 * @brief Represents a message sent in a chat.
 * @details Contains the content of the message, the sender, and the creation time.
 */
export interface IMessageData {
    /** The unique identifier for the message. */
    id: number;

    /** The text content of the message. */
    text: string;

    /** The timestamp when the message was created. */
    created_at: string;

    /** The user who sent the message. */
    sender: IUserData;
}
