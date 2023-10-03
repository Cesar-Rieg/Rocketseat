import { Container, Links, Content } from './Details.js';
import { Button } from '../../components/Button/Button.jsx';
import { ButtonText } from '../../components/ButtonText/ButtonText.jsx';
import { Header } from '../../components/Header/Header.jsx';
import { Section } from '../../components/Section/Section.jsx';
import { Tag } from '../../components/Tag/Tag.jsx';

export default function Details(){
  return (
    <Container>
        <Header/>

        <main>
          <Content>

            <ButtonText tittle="Excluir nota"/>

            <h1>
              Introdução ao React
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In sit tempora cumque neque, itaque fuga error totam ut suscipit praesentium! Impedit earum, nostrum voluptate voluptates repellat totam veritatis quos itaque!
            </p>
            
            <Section tittle="Links úteis">
              <Links>
                <li>
                  <a href="javascript:">https://www.rocketseat.com.br</a>
                </li>
                <li>
                  <a href="javascript:">https://www.rocketseat.com.br</a>
                </li>
              </Links>
            </Section>

            <Section tittle="Marcadores">
              <Tag tittle="Express"/>
              <Tag tittle="Node"/>
            </Section>

            <Button tittle="Voltar"/>
          </Content>
        </main>
    </Container>
  )
}