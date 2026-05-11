# Atendimento-Humanizado

Aplicacao web estatica em HTML/CSS/JS que demonstra o modelo de atendimento
humanizado com Gemeo Digital, alinhado a PNH. A interface esta organizada
em quatro telas: Dashboard do Profissional, Registro de Atendimento Clinico,
Gestao de Saude Populacional e Relatorio do Paciente.

## Como executar

1. Abra o arquivo public/index.html no navegador.
2. Use o menu superior para alternar entre as telas.
3. (Opcional) Clique em "Modo demo" para iniciar o tour automatico.

## Estrutura do projeto

- public/index.html: layout das telas e componentes principais.
- src/styles.css: sistema de design Empathetic Care (cores, tipografia, formas).
- src/app.js: interacoes basicas, carregamento de dados e modo demonstracao.
- src/data/patients.json: dados editaveis para preencher as telas.

## Principais funcionalidades

- Dashboard do Profissional: score global, linha do tempo clinica e alertas.
- Registro de Atendimento Clinico: campos de escuta ativa e sugestoes da IA.
- Gestao de Saude Populacional: estratificacao de risco e alertas coletivos.
- Relatorio do Paciente: linguagem simples com plano de acao e dicas.
- Modo demonstracao: tour automatico destacando pontos principais.
- Dados dinamicos: toda a UI e populada pelo arquivo JSON.

## Dados dinamicos

Edite o arquivo src/data/patients.json para alterar pacientes, scores, alertas e
conteudo das telas. Se o navegador bloquear a leitura local do JSON, o app usa
um conjunto de dados de fallback embutido no app.js.

## Responsividade

O layout ajusta automaticamente para tablet e celular, reorganizando a barra
superior, a sidebar e os grids para manter a leitura clara.

## Design system (Empathetic Care)

- Paleta: azul e verde como base, com acentos em laranja e vermelho.
- Tipografia: Manrope (titulos) e Atkinson Hyperlegible (corpo).
- Componentes: cards arredondados, sombras suaves e estados de alerta claros.