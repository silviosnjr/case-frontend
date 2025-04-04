import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col, InputGroup } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const data = await login(email, senha);
      localStorage.setItem("token", data.token);
      navigate("/produtos");
    } catch (err) {
      console.error(err);
      setErro("E-mail ou senha inválidos.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Acesso ao sistema</h3>
              {erro && <p className="text-danger text-center">{erro}</p>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>E-mail</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="formSenha" className="mb-4">
                  <Form.Label>Senha</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Digite sua senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Entrar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;