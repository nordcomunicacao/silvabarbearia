# Remover o endereço duplicado do rodapé

O endereço já aparece na seção "Onde Estamos" (junto ao mapa e aos horários). No rodapé ele se repete, com o mesmo ícone de localização.

## O que muda

- Remover do rodapé o bloco com o ícone de pin e o texto "Av. Saturnino Rangel Mauro - Praia de Itaparica / Vila Velha - ES, 29102-035".
- Manter no rodapé: o divisor decorativo, telefone, Instagram e a assinatura da Nord Comunicação.
- Ajustar o espaçamento do rodapé para não sobrar um vazio onde estava o endereço.

## Detalhes técnicos

- Arquivo: `src/components/SilvaBarbearia.tsx`, dentro do `<footer>` (bloco do `MapPin` + parágrafo do endereço).
- Remover também o import do ícone `MapPin` caso ele deixe de ser usado — ele continua em uso na seção "Onde Estamos", então o import permanece.
