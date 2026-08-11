# Horários estilo WhatsApp Business

Substituir a lista fixa de horários da seção "Onde Estamos" por um componente que mostra o status em tempo real (Aberta agora / Fechada) e permite expandir para ver a semana inteira.

## Como vai funcionar

- **Linha fechada (padrão):** à esquerda, o status atual — "Aberta agora" em verde ou "Fechada" em vermelho/cinza; à direita, o intervalo de hoje (ex.: 09:00 - 19:00) e uma seta indicando que dá para expandir.
- **Ao tocar:** a lista abre com animação suave, mostrando os 7 dias da semana com seus horários; o dia atual fica em destaque (texto branco/negrito) e os demais em cinza. Domingo aparece como "Fechada".
- **Status inteligente:** calculado pelo horário local de Brasília no momento em que a pessoa abre a página. Se estiver fora do expediente, mostra "Fechada" com a informação de quando abre novamente (ex.: "Abre amanhã às 09:00").
- **Ordem da lista:** começa pelo dia atual e segue os dias seguintes, como no WhatsApp.

## Horários a usar

Preciso confirmar com você: hoje a página mostra Seg-Sex 09:00-19:00, Sáb 08:00-17:00, Dom fechado. A imagem que você enviou mostra outra grade:

- Segunda: 09:00 - 19:00
- Terça a Sexta: 09:00 - 20:00
- Sábado: 08:00 - 16:00
- Domingo: Fechada

Vou usar a grade da imagem, já que parece ser a informação atual do Google. Se estiver errado, é só me dizer que ajusto.

## Visual

Mantém a caixa atual (borda clara, fundo translúcido, fonte Kamerik, ícone de relógio amarelo). O verde de "Aberta agora" entra como um token novo de status no design system, sem alterar a paleta preto/branco/amarelo da marca.

## Detalhes técnicos

- Novo componente `src/components/HorariosFuncionamento.tsx` com a tabela de horários em constante tipada, cálculo de status por minutos desde a meia-noite e fuso `America/Sao_Paulo`.
- Expansão com `AnimatePresence` + `height: auto` (framer-motion, já usado no projeto); botão acessível com `aria-expanded`.
- Tokens `--status-open` / `--status-closed` em `index.css` e no `tailwind.config.ts`.
- `SilvaBarbearia.tsx` passa a renderizar o componente no lugar do bloco estático de horários.
