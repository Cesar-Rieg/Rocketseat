/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/ApiServices";
import { LOCALSTORAGE_ROCKETNOTES_TOKEN, LOCALSTORAGE_ROCKETNOTES_USER } from "../constants/LocalStorageConstants";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [ state, setState ] = useState({});
    
    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", {email, password});
            const { user, token } = response.data;

            localStorage.setItem(LOCALSTORAGE_ROCKETNOTES_USER, JSON.stringify(user));
            localStorage.setItem(LOCALSTORAGE_ROCKETNOTES_TOKEN, token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setState({ user, token });
        }
        catch (ex) {
            if (ex.response) {
                return alert(getExceptionMessage(ex));
            }
            return alert("Não foi possível realizar o login.")
        }
    }

    function signOut() {
        localStorage.removeItem(LOCALSTORAGE_ROCKETNOTES_USER);
        localStorage.removeItem(LOCALSTORAGE_ROCKETNOTES_TOKEN);

        setState({});
    }

    async function updateProfile({ user, avatarFile }) {
        try {

            if (avatarFile) {
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);

                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;
            }

            const response = await api.put("/users", user);
            localStorage.setItem(LOCALSTORAGE_ROCKETNOTES_USER, JSON.stringify(response.data.userByEmail));
            
            setState({ user, token: state.token });

            alert(response.data.Message);
        }
        catch (ex) {
            if (ex.response) {
                return alert(getExceptionMessage(ex));
            }
            return alert("Não foi possível atualizar o perfil.")
        }
    }

    function getExceptionMessage(ex) {
        let isDatabaseException = ex.response.data.DatabaseError;
        return isDatabaseException
                    ? ex.response.data.DatabaseError
                    : ex.response.data.Message;
    }

    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem(LOCALSTORAGE_ROCKETNOTES_USER);
        const tokenFromLocalStorage = localStorage.getItem(LOCALSTORAGE_ROCKETNOTES_TOKEN);

        if (userFromLocalStorage && tokenFromLocalStorage){
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenFromLocalStorage}`;
            setState({
                tokenFromLocalStorage,
                user: JSON.parse(userFromLocalStorage)
            })
        }
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, signOut, updateProfile, user: state.user }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };