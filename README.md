# google-smart-home

## Projeto
https://console.firebase.google.com/project/jib-smart-home-d1e79

## Deploy do Código
Para usar funções, você precisa instalar as ferramentas de linha de comando do Firebase com npm.
```
npm install -g firebase-tools
```

Depois na pasta do projeto:
```
firebase deploy
```

## service-account-key.json
O arquivo functions/service-account-key.json deve ser obtido da seguinte forma: 
https://cloud.google.com/iam/docs/creating-managing-service-account-keys?hl=pt-br

1. Abra a página IAM e Admin no Console do GCP.
2. Selecione o projeto e clique em Continuar.
3. Na navegação à esquerda, clique em Contas de serviço.
4. Procure a conta de serviço em que você quer criar a chave, clique no botão Mais more_vert na linha correspondente e selecione Criar chave.
5. Selecione um Tipo de chave e clique em Criar.

## Tutorial
https://medium.com/google-developers/authenticating-smart-home-actions-for-the-google-assistant-with-auth0-b6fda3d2ee3d
