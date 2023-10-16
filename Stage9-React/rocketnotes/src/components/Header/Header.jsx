import { RiShutDownLine } from 'react-icons/ri';
import { Container, Profile, Logout } from "./Header";
import { useAuth } from '../../hooks/auth'; 

export function Header() {
    const { signOut } = useAuth();
    return (
        <Container>
            <Profile to="/profile">
                <img
                    src="https://github.com/Cesar-Rieg.png"
                    alt="Foto do usuário"/>
                <div>
                    <span>Bem-vindo</span>
                    <strong>César Rieg</strong>
                </div>
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine/>
            </Logout>
        </Container>
    );
}
