import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card, InputGroup } from "react-bootstrap";
import { BsTag, BsTextareaResize, BsCurrencyDollar, BsBoxSeam, BsCollection } from "react-icons/bs";
import api from "../services/api";

function ProdutoForm({ aoSalvar, produtoParaEditar, cancelarEdicao }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    categoria: "",
  });

  useEffect(() => {
    if (produtoParaEditar) {
      setForm(produtoParaEditar);
    }
  }, [produtoParaEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (produtoParaEditar) {
        await api.put(`/produtos/${produtoParaEditar.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/produtos", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      aoSalvar();
      cancelarEdicao();
      setForm({ nome: "", descricao: "", preco: "", estoque: "", categoria: "" });
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{produtoParaEditar ? "✏️ Editar Produto" : "➕ Novo Produto"}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Nome</Form.Label>
              <InputGroup>
                <InputGroup.Text><BsTag /></InputGroup.Text>
                <Form.Control
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Nome do produto"
                  required
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Form.Label>Descrição</Form.Label>
              <InputGroup>
                <InputGroup.Text><BsTextareaResize /></InputGroup.Text>
                <Form.Control
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  placeholder="Descrição"
                  required
                />
              </InputGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Preço</Form.Label>
              <InputGroup>
                <InputGroup.Text><BsCurrencyDollar /></InputGroup.Text>
                <Form.Control
                  type="number"
                  name="preco"
                  value={form.preco}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Label>Estoque</Form.Label>
              <InputGroup>
                <InputGroup.Text><BsBoxSeam /></InputGroup.Text>
                <Form.Control
                  type="number"
                  name="estoque"
                  value={form.estoque}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Label>Categoria</Form.Label>
              <InputGroup>
                <InputGroup.Text><BsCollection /></InputGroup.Text>
                <Form.Control
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            {produtoParaEditar && (
              <Button variant="secondary" onClick={cancelarEdicao} className="me-2">
                Cancelar
              </Button>
            )}
            <Button type="submit" variant="primary">
              Salvar
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProdutoForm;