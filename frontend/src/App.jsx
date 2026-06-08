import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const [pedidos, setPedidos] = useState([])
  const [novoItem, setNovoItem] = useState('')
  const [quantidade, setQuantidade] = useState(1)

  const carregarPedidos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/pedidos`)
      const data = await response.json()
      if (Array.isArray(data.data)) {
        setPedidos(data.data)
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error)
    }
  }

  const fazerPedido = async (e) => {
    e.preventDefault()
    
    try {
      await fetch(`${API_URL}/api/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: novoItem, quantidade: quantidade })
      })
      
      setNovoItem('')
      setQuantidade(1)
      carregarPedidos()
    } catch (error) {
      console.error("Erro ao salvar pedido:", error)
    }
  }

  useEffect(() => {
    const fetchPedidos = async () => {
      await carregarPedidos()
    }

    fetchPedidos()
  }, [])

  return (
    <div className="container">
      <h1>Peças Eletrônicas -Pedidos</h1>
      
      <div className="card">
        <h2>Fazer Novo Pedido</h2>
        <form onSubmit={fazerPedido}>
          <input 
            type="text" 
            placeholder="Ex: Geforce RTX 4060" 
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
            required 
          />
          <input 
            type="number" 
            min="1" 
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required 
          />
          <button type="submit">Enviar Pedido</button>
        </form>
      </div>

      <div className="card">
        <h2> Pedidos Recentes</h2>
        {pedidos.length === 0 ? (
          <p>Nenhum pedido encontrado.</p>
        ) : (
          <ul>
            {pedidos.map((pedido, index) => (
              <li key={index}>
                <strong>{pedido.quantidade}x</strong> {pedido.item} - <em>{pedido.status || 'Pendente'}</em>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App