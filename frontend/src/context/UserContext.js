import React, { useState, useEffect } from "react"

const UserContext = React.createContext(null)

const UserProvider = ({ children }) => {
    const [username, setUser] = useState("")
    const [comment, setComment] = useState("")
    const [userIdLogin, setUserId] = useState("")
    const LoginContext = (username, userId) => {
        setUser(username)
        setUserId(userId)
    }

    const CommentContext = (comment1) => {
        setComment(comment1)
    }

    const LogoutContext = () => {
        setUser("")
    }

    return (
        <UserContext.Provider value={{ comment, username, userIdLogin, LoginContext, LogoutContext, CommentContext }}>
            {children}
        </UserContext.Provider>
    )
}
export { UserContext, UserProvider }