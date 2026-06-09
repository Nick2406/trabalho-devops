import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const [pedidos, setPedidos] = useState([])
  const [novoItem, setNovoItem] = useState('')
  const [quantidade, setQuantidade] = useState(1)
  const [tipo, setTipo] = useState('Vinil')

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
    
    console.log("--> ENVIANDO PARA O BACKEND:", { item: novoItem, quantidade, tipo });

    try {
      await fetch(`${API_URL}/api/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: novoItem, quantidade: quantidade, tipo: tipo })
      })
      
      setNovoItem('')
      setQuantidade(1)
      setTipo('Vinil') 
      carregarPedidos()
    } catch (error) {
      console.error("Erro ao salvar pedido:", error)
    }
  }

  useEffect(() => {
    const iniciarCarregamento = async () => {
      await carregarPedidos()
    }

    iniciarCarregamento()
  }, [])

  return (
    <div className="container">
      <h1>Vinyl <span style={{color: '#e50914'}}>Store</span></h1>
      
      <div className="card">
        <h2>Encomendar Álbum / Single</h2>
        <form onSubmit={fazerPedido}>
          <input 
            type="text" 
            placeholder="Ex: Pink Floyd - The Dark Side of the Moon" 
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
            required 
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="Vinil">Vinil</option>
            <option value="CD">CD</option>
          </select>

          <input 
            type="number" 
            min="1" 
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required 
          />
          <button type="submit">Encomendar</button>
        </form>
      </div>

      <div className="card">
        <h2>Encomendas Recentes</h2>
        {pedidos.length === 0 ? (
          <p style={{color: '#a0a0a0'}}>Nenhuma encomenda registrada.</p>
        ) : (
          <ul>
            {pedidos.map((pedido, index) => (
              <li key={index}>
                <div className="item-info">
                  <span className="item-qty">{pedido.quantidade}x</span>
                  <span className="item-name">{pedido.item}</span>
                  <span className="item-badge" style={{ backgroundColor: pedido.tipo === 'CD' ? '#404040' : '#e50914' }}>
                    {pedido.tipo || 'Vinil'}
                  </span>
                </div>
                <span className="item-status">{pedido.status || 'Processando'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App