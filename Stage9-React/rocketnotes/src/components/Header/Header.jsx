import { RiShutDownLine } from 'react-icons/ri';
import { Container, Profile, Logout } from "./Header";
import { useAuth } from '../../hooks/auth'; 
import { api } from '../../services/ApiServices';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const { signOut, user } = useAuth();
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const navigate = useNavigate();
    
    function handleSignOut() {
        navigate("/");
        signOut();
    }

    return (
        <Container>
            <Profile to="/profile">
                <img
                    src={avatarUrl}
                    alt={`Foto do usuário ${user.name}`}/>
                <div>
                    <span>Bem-vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>

            <Logout onClick={handleSignOut}>
                <RiShutDownLine/>
            </Logout>
        </Container>
    );
}
