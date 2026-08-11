# Link na Bio — Silva Barbearia

Reformulação completa da página, saindo da clínica Fit In Less para a Silva Barbearia (Vila Velha - ES).

## Identidade visual

- **Cores:** Preto (fundo), Branco (textos), Amarelo #ffdd83 (destaques, títulos e CTAs)
- **Tipografia:** fonte Kamerik 105 (Book para textos, Bold para títulos), enviada nos anexos
- **Logo:** logo Silva Barbearia (convertida do PDF para imagem de alta qualidade)
- **Fundo:** foto da fachada da barbearia com exposição bem reduzida sobre fundo preto
- **Brilhos animados:** os clarões verdes atuais viram halos amarelos suaves e discretos (mantendo o movimento, sem exagero)
- **Botões:** mantêm o formato arredondado com borda amarela; no hover ficam amarelos sólidos com texto preto

## Estrutura da página

1. **Logo** centralizada no topo, com animação de entrada
2. **Botões de link** (4):
   - Agende o seu horário
   - Fale conosco (WhatsApp (27) 99653-0453)
   - Como chegar (Google Maps)
   - Curso
3. **Sobre nós** — título em amarelo maiúsculo + texto institucional da barbearia (escrevo uma versão inicial; você ajusta depois pelo Visual Edits)
4. **Galeria** — mantém a faixa de 3 fotos, por enquanto reaproveitando a foto da fachada (substituímos quando você enviar fotos do espaço)
5. **Rodapé** — endereço, telefone e Instagram
   - Av. Saturnino Rangel Mauro - Praia de Itaparica, Vila Velha - ES, 29102-035
   - (27) 99653-0453
   - instagram.com/silvabarbeariavv
   - Assinatura "Desenvolvido por Nord Comunicação" mantida

**Removido:** seção de vídeo, seção de horários, e-mail e site antigos.

## Detalhes técnicos

- Fontes Kamerik e logo/imagem de fundo publicadas como assets de CDN (`.asset.json`), com `@font-face` no `index.css`
- Novos tokens de cor `--silva-black`, `--silva-yellow`, `--silva-white` no `index.css` e no `tailwind.config.ts`; família `font-kamerik` registrada
- Componente novo `SilvaBarbearia.tsx` substituindo `LinkBioFitInLess` em `Index.tsx`; textos permanecem em JSX estático para edição visual
- `index.html`: título, meta description, Open Graph e favicon atualizados para a Silva Barbearia

## Preciso de você

Os links de **"Agende o seu horário"** e **"Curso"** — enquanto não chegam, esses botões vão apontar para o WhatsApp como destino provisório.
