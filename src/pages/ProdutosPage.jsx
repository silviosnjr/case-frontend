import { useEffect, useState } from "react";
import { Button, Table, Container, Row, Col, Card } from "react-bootstrap";
import ProdutoForm from "../components/ProdutoForm";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowRight, BsPencilSquare, BsTrash } from "react-icons/bs";

function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
  const navigate = useNavigate();

  const carregarProdutos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/produtos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos(response.data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  };

  const removerProduto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/produtos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao remover produto:", err);
    }
  };

  const cancelarEdicao = () => {
    setProdutoEmEdicao(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <Container className="my-4">
      <Row className="align-items-center mb-3">
        <Col xs={12} md={6}>
          <h3>📦 Gerenciador de Produtos</h3>
        </Col>
        <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
          <Button variant="outline-secondary" onClick={logout}>
            <BsBoxArrowRight className="me-2" /> Sair
          </Button>
        </Col>
      </Row>

      <ProdutoForm
        aoSalvar={carregarProdutos}
        produtoParaEditar={produtoEmEdicao}
        cancelarEdicao={cancelarEdicao}
      />

      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">📋 Lista de Produtos</Card.Title>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Categoria</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.descricao}</td>
                    <td>R$ {Number(produto.preco).toFixed(2)}</td>
                    <td>{produto.estoque}</td>
                    <td>{produto.categoria}</td>
                    <td>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => setProdutoEmEdicao(produto)}
                        className="me-2"
                      >
                        <BsPencilSquare />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removerProduto(produto.id)}
                      >
                        <BsTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProdutosPage;