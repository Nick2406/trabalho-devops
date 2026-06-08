# Startup ByteStore - Sistema de Pedidos de Hardware (DevOps)

## Correções Realizadas (Diagnóstico SRE)
1. **Containers iniciando fora de ordem:** Resolvido usando `depends_on` e `healthcheck` no banco de dados.
2. **Banco perdendo dados:** Resolvido criando `volumes` persistentes no PostgreSQL.
3. **Senhas expostas:** Resolvido implementando `.env` e utilizando Secrets no GitHub Actions.
4. **Falta de testes e build quebrado:** Resolvido criando testes com Jest/Supertest integrados na pipeline CI.
5. **Atualização manual:** Resolvido implementando a imagem do `Watchtower` para CD (Continuous Deployment).
6. **Rollback inexistente:** Resolvido versionando as imagens no Docker Hub com o SHA do commit no GitHub Actions.

## Como Executar o Projeto

1. Clone este repositório.
2. Na raiz do projeto, crie um arquivo `.env` com a variável `DB_PASSWORD=sua_senha`.
3. Para subir toda a infraestrutura, execute o comando:
   ```bash
   docker compose up --build -d