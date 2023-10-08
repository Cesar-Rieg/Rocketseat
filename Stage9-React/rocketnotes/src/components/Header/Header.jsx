import { RiShutDownLine } from 'react-icons/ri';
import { Container, Profile, Logout } from "./Header";

export function Header() {
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

            <Logout>
                <RiShutDownLine/>
            </Logout>
        </Container>
    );
}
