# Startup Vinyl Store - Sistema de Pedidos (DevOps & Manutenção)

## Correções e Melhorias Realizadas (Diagnóstico SRE & Evolutivo)
1. **Containers iniciando fora de ordem:** Resolvido usando `depends_on` com `condition: service_healthy` e `healthcheck` no PostgreSQL.
2. **Banco perdendo dados:** Resolvido mapeando `volumes` persistentes para o banco de dados.
3. **Senhas expostas:** Resolvido implementando variáveis de ambiente (`.env`) no Docker Compose.
4. **Atualização automática local:** Resolvido configurando o bloco `build: ./backend` no Compose para sincronizar o código do VS Code com o container em tempo real.
5. **Manutenção Evolutiva:** Banco de dados, Backend e Frontend atualizados para suportar a seleção dinâmica de produtos entre **"Vinil"** e **"CD"**, com estilização condicional de tags na interface.
6. **CD (Continuous Deployment):** Integrado o container `Watchtower` para atualização automatizada dos serviços.

## Como Executar o Projeto

### Pré-requisitos
* Docker e Docker Compose instalados na máquina.

### Passo a Passo

1. Clone este repositório.
2. Na raiz do projeto, crie um arquivo `.env` contendo a senha do banco:
   ```env
   DB_PASSWORD=senha_secreta

```

3. Suba e construa toda a infraestrutura com o comando:
```bash
docker compose up -d --build

```



### Portas de Acesso

* **Frontend (Aplicação Web):** [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)
* **Backend (API REST):** [http://localhost:3000/pedidos](https://www.google.com/search?q=http://localhost:3000/pedidos)