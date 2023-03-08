const pool = require("../database/index");

const comprasController = {
  // ESSA É A ROTA PARA CRIAR A COMPRA
  criarCompra: async (req, res) => {
    const { id_cliente, compra, total, dataHora } = req.body;
    if (!id_cliente || !compra || !total || !dataHora) {
      return res.status(400).json({ errorCode: 400, message: "Faltam dados" })
    }
    try {
      const queryInsereCompra = "INSERT INTO compras (id_cliente, compra, total, dataHora) VALUES (?, ?, ?, ?)"
      const resultado = await pool.query(queryInsereCompra, [id_cliente, compra, total, dataHora]);
      res.status(200).json({ message: "Compra criada com sucesso!" });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ errorCode: 500, message: "Erro do servidor" });
    }
  },

  // Alterar a comprar que foi comprada
  alterarCompra: async (req, res) => {
    const { id } = req.params;
    const { compra, total, dataHora } = req.body;
    if (!compra || !total || !dataHora) {
      return res.status(400).json({ errorCode: 400, message: "Faltam dados" })
    }
    try {
      const queryalterarCompra = "UPDATE compras SET compra=?, total=?, dataHora=? WHERE id=?";
      const resultado = await pool.query(queryalterarCompra, [compra, total, dataHora, id]);
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ errorCode: 404, message: "Compra não encontrada" });
      }
      return res.status(200).json({ message: "Compra atualizada com sucesso!" });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ errorCode: 500, message: "Erro do servidor" });
    }
  },

  // Excluir a compra pelo ID
  excluirCompra: async (req, res) => {
    const { id } = req.params;
    try {
      const queryexcluirCompra = "DELETE FROM compras WHERE id=?";
      const resultado = await pool.query(queryexcluirCompra, [id]);
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ errorCode: 404, message: "Compra não encontrada" });
      }
      return res.status(200).json({ message: "Compra excluída com sucesso!" });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ errorCode: 500, message: "Erro do servidor" });
    }
  },

  // Rota de pegar todas as compras
  listarCompras: async (req, res) => {
    try {
      const queryListarCompras = "SELECT * FROM compras";
      const resultado = await pool.query(queryListarCompras);
      res.status(200).json(resultado);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ errorCode: 500, message: "Erro do servidor" });
    }
  },

  // Rota de pegar todas as compras de um usuário específico
  listarComprasPorUsuario: async (req, res) => {
    const { id_cliente } = req.params;
    try {
      const queryListarComprasPorUsuario = "SELECT * FROM compras WHERE id_cliente = ?";
      const resultado = await pool.query(queryListarComprasPorUsuario, [id_cliente]);
      res.status(200).json(resultado);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ errorCode: 500, message: "Erro ao pegar todas as compras" });
    }
  },
};

module.exports = comprasController;
