import { Container } from './Details.js';
import { Button } from '../../components/Button/Button.jsx';

export default function Details(){
  return (
    <Container>
        <h1>Hello World!</h1>
        <span>César Rieg</span>
        <Button tittle="Entrar" loading/>
        <Button tittle="Cadastrar"/>
        <Button tittle="Voltar"/>
    </Container>
  )
}