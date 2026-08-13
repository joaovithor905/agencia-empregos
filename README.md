# Selecta Agência de Empregos

Site multipágina em Next.js, preparado para publicação na Netlify. Inclui páginas públicas, busca de vagas, páginas individuais, cadastro de candidatos e painel administrativo.

## Recursos

- Páginas separadas: Início, Vagas, Candidatos, Empresas, Sobre e Contato.
- Filtro de vagas por palavra-chave, ramo e contratação.
- Página individual para cada vaga com ilustração SVG contextual.
- Painel em `/admin` para criar, editar, encerrar e excluir vagas.
- Recebimento de currículos em PDF, DOC ou DOCX.
- Currículos e vagas salvos de forma persistente com Netlify Blobs.
- Layout responsivo para celular, tablet e computador.

## Publicação na Netlify

Este projeto é dinâmico e usa funções no servidor. Por isso, não deve ser publicado apenas arrastando a pasta de arquivos estáticos. Use um repositório Git conectado à Netlify.

1. Descompacte o projeto e envie os arquivos para um repositório no GitHub.
2. Na Netlify, escolha **Add new project > Import an existing project**.
3. Selecione o repositório. O arquivo `netlify.toml` já informa o comando de build.
4. Em **Project configuration > Environment variables**, crie:
   - `SELECTA_ADMIN_PASSWORD`: senha forte para o painel.
   - `SELECTA_SESSION_SECRET`: sequência aleatória longa, com pelo menos 32 caracteres.
5. Faça o primeiro deploy e acesse `/admin` para publicar as vagas reais.

As variáveis devem ficar somente no painel da Netlify. Nunca coloque a senha real no código ou no GitHub.

## Uso local

```bash
npm install
npm run dev
```

No ambiente local, a senha de demonstração do painel é `selecta-demo`. Ela não é aceita na Netlify: o ambiente publicado exige as duas variáveis de segurança.

## Dados que precisam ser revisados antes de publicar

- Textos institucionais e política de privacidade.
- Vagas de demonstração no arquivo `data/jobs.ts`.
