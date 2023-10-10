/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/ApiServices";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [ state, setState ] = useState({});
    
    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", {email, password});
            const { user, token } = response.data;

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
            localStorage.setItem("@rocketnotes:token", token);

            api.defaults.headers.authorization = `Bearer ${token}`;
            setState({ user, token });
        }
        catch (ex) {
            if (ex.response) {
                return alert(ex.response.data.Message);
            }
            return alert("Não foi possível realizar o login.")
        }
    }

    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem("@rocketnotes:user");
        const tokenFromLocalStorage = localStorage.getItem("@rocketnotes:token");

        if (userFromLocalStorage && tokenFromLocalStorage){
            api.defaults.headers.authorization = `Bearer ${tokenFromLocalStorage}`;
            setState({
                tokenFromLocalStorage,
                user: JSON.parse(userFromLocalStorage)
            })
        }
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, user: state.user }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };