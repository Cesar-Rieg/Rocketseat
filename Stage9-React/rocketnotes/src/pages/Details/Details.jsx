import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Links, Content } from './Details.js';
import { Button } from '../../components/Button/Button.jsx';
import { ButtonText } from '../../components/ButtonText/ButtonText.jsx';
import { Header } from '../../components/Header/Header.jsx';
import { Section } from '../../components/Section/Section.jsx';
import { Tag } from '../../components/Tag/Tag.jsx';
import { api } from '../../services/ApiServices.js';

export function Details(){
  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  function handleBackToPreviousPage() {
    navigate(-1);
  }

  function handleNavigateToHomePage() {
    navigate("/");
  }

  async function handleRemoveNote() {
    const confirm = window.confirm("Você deseja realmente excluir esta nota?");

    if (confirm) {
      try {
        await api.delete(`/notes/${params.id}`);
        handleNavigateToHomePage();
      }
      catch (ex) {
        if (ex.response){
          let exMessage = ex.response.data.DatabaseError  
                    ? ex.response.data.DatabaseError
                    : ex.response.data.Message;
          return alert(exMessage);
        }
        return alert("Ocorreu um erro desconhecido ao excluir a nota.");
      }
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const noteId = params.id;
      const response = await api.get(`/notes/${noteId}`);
      setData(response.data);
    }

    fetchNote();
  }, []);

  return (
    <Container>
        <Header/>

        {
          data &&
          <main>
            <Content>

              <ButtonText 
                tittle="Excluir nota"
                onClick={handleRemoveNote}
              />

              <h1>
                {data.tittle}
              </h1>
              <p>
                {data.description}
              </p>

              {
                data.links &&
                <Section tittle="Links úteis">
                  <Links>
                    {
                      data.links.map(link => (
                        <li key={String(link.id)}>
                          <a href={link.url} target='_blank' rel="noreferrer">
                            {link.url}
                          </a>
                        </li> 
                      ))
                    }
                  </Links>
                </Section>
              }

              { data.tags &&
                <Section tittle="Marcadores">
                  {
                    data.tags.map(tag => (
                      <Tag key={String(tag.id)} tittle={tag.name}/>
                    ))
                  }
                </Section>
              }

              <Button 
                tittle="Voltar"
                onClick={handleBackToPreviousPage}
              />
            </Content>
          </main>
        }
    </Container>
  )
}
