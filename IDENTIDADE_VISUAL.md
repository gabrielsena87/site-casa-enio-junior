# Identidade Visual & Direção de Arte — v0.1

> **Status do Projeto:** Protótipo Visual v0.1 (pré-briefing definitivo)  
> **Cliente:** Enio Junior  
> **Foco desta entrega:** Identidade Visual, Atmosfera Editorial, Curadoria Fotográfica Real (27 ativos otimizados) e Arquitetura de Seções.

---

## 1. Nome Provisório & Posicionamento

| Campo | Valor v0.1 | Observação |
| :--- | :--- | :--- |
| **Nome da Casa** | **Refúgio Terracota & Jardim** | Nome editorial provisório — `[A definir no briefing]` |
| **Subtítulo Institucional** | **Casa Enio Junior · Conceito v0.1** | Identificação de apresentação para aprovação visual |
| **Slogan Editorial** | *Vidro, jardim, fogo de chão e hidro sob o pergolado.* | Baseado nos diferenciais reais observados nas fotos |
| **Capacidade / Hóspedes** | `[A definir no briefing]` | Ex.: número máximo de hóspedes e configuração de camas |
| **Tarifas / Diárias** | `[A definir no briefing]` | Valor base, finais de semana, feriados e taxa de limpeza |
| **Endereço / Localização** | `[A definir no briefing]` | Cidade, bairro/condomínio, mapa e distância de pontos-chave |
| **Contato / Reservas** | `[A definir no briefing]` | WhatsApp oficial, e-mail, política de check-in/out e regras |

### Conceito Visual
A propriedade tem uma leitura arquitetônica muito clara nas 27 fotografias reais: uma casa de temporada acolhedora onde **paredes de vidro trazem o jardim florido para dentro da sala**, **poltronas e sofá em tom terracota** aquecem os interiores, e a vida externa acontece entre a **piscina cercada de verde**, o **fogo de chão com mesa externa**, o **pergolado iluminado com hidromassagem em deck elevado** e uma **área gourmet completa com sinuca, bar, cervejeira e churrasqueira**.

A direção de arte combina duas referências complementares:
1. **Referência *Casa Pitanga* (Estética & Ritmo Editorial):** fundo claro em marfim quente (`#F6F2EA`), tipografia serifada expressiva em títulos (`Cormorant Garamond`) pareada com sans-serif limpa e legível (`Plus Jakarta Sans`), respiros generosos e uma **faixa escura dramática em verde-oliva profundo (`#1F2B1E`)** dedicada à Área Externa, evocando o entardecer ao redor da hidro iluminada e do fogo de chão.
2. **Referência *Casa Tabatinga 2* (Clareza Comercial & Navegação):** hierarquia objetiva de espaços, cards de resumo rápido (preparados para receber os dados do briefing), e uma **galeria filtrável por ambiente com lightbox** exibindo todo o acervo real com legendas claras e respeito à orientação original de cada foto.

---

## 2. Paleta de Cores & Tokens (Ligação Direta com as Fotos Reais)

| Token CSS | Hex | Papel na Interface | Justificativa Fotográfica (Ativos Reais) |
| :--- | :--- | :--- | :--- |
| `--bg-ivory` | `#F6F2EA` | Fundo principal da página, seções claras ("A Casa", "Gourmet", "Quartos", "Galeria") | Remete à luz natural da varanda (`photo-01`, `photo-02`), às cortinas claras dos quartos (`photo-22`) e ao frescor diurno do jardim. |
| `--surface-linen` | `#EFE9DD` | Cards sutis, fundos de badges, blocos de placeholders `[A definir no briefing]` | Suporte tonal orgânico que separa módulos sem criar contraste artificial ou frieza clínica. |
| `--olive-deep` | `#1F2B1E` | Texto principal, header sobre fundos claros e **faixa escura da Área Externa** | Extraído diretamente da folhagem densa do corredor arborizado (`photo-01`), do verde que cerca a piscina (`photo-11`) e do contraste noturno no deck da hidro (`photo-05`, `photo-08`). |
| `--olive-muted` | `#465443` | Textos secundários, subtítulos, legendas e metadados | Tom intermediário botânico para manter leitura confortável (AA+) sobre `#F6F2EA`. |
| `--terracotta` | `#B04A2F` | Cor de destaque primária, CTAs, estado ativo dos filtros e acentos editoriais | Cor-assinatura da casa: aparece literalmente nas **poltronas terracota** da sala envidraçada (`photo-12`, `photo-13`) e no **sofá terracota** da sala de TV (`photo-14`). |
| `--terracotta-hover` | `#943B24` | Hover/pressed de botões primários e links ativos | Garante feedback tátil mantendo riqueza terrosa. |
| `--sand-wood` | `#C79B5E` | Acentos sobre a faixa escura (`#1F2B1E`), filetes, ícones e detalhes quentes | Reflete o **deck elevado de madeira** (`photo-06`, `photo-07`), a **bancada rústica do lavabo** (`photo-26`), o revestimento amadeirado do banheiro (`photo-25`) e a **luz quente da lanterna e do fogo de chão** (`photo-27`). |
| `--border-hairline` | `rgba(31, 43, 30, 0.14)` | Divisórias editoriais e contornos leves de cards | Linhas finas inspiradas na serralheria escura dos janelões de vidro (`photo-04`, `photo-12`) e do box preto (`photo-25`). |
| `--text-on-dark` | `#F6F2EA` | Títulos e corpo de texto na seção escura Área Externa e no footer | Máxima legibilidade e coerência térmica sobre `#1F2B1E`. |

---

## 3. Tipografia & Escala Editorial

- **Display / Títulos (`--font-serif`):** `Cormorant Garamond` (pesos `400`, `500`, `600`, incluindo *italic* `400/500` para palavras-chave poéticas como *jardim*, *fogo de chão*, *refúgio*).
  - **H1 (Hero):** `clamp(2.5rem, 5vw, 4.5rem)`, `line-height: 1.04`, `letter-spacing: -0.02em`.
  - **H2 (Seções):** `clamp(2rem, 3.6vw, 3.125rem)`, `line-height: 1.08`.
  - **H3 (Subseções / Cards):** `clamp(1.375rem, 2vw, 1.75rem)`, `line-height: 1.2`.
- **UI / Corpo / Filtros (`--font-sans`):** `Plus Jakarta Sans` (pesos `400`, `500`, `600`).
  - **Corpo padrão:** `1rem` (`16px`) a `1.0625rem` (`17px`), `line-height: 1.65`.
  - **Eyebrows / Labels / Pills de Filtro:** `0.75rem` (`12px`), `font-weight: 600`, `letter-spacing: 0.12em`, `text-transform: uppercase`.
  - **Legendas de foto / Lightbox:** `0.875rem` (`14px`), `line-height: 1.5`.

---

## 4. Curadoria & Tratamento de Orientação Fotográfica (`landscape` vs `portrait` vs `square`)

O manifesto contém **27 fotos reais** com forte predominância vertical (ideal para composições editoriais e mobile-first), exigindo tratamento intencional por orientação — **nunca forçar um `portrait` 9:16 dentro de um slot `16:9` com corte agressivo**:

| Orientação no Manifesto | Quantidade & Exemplos | Regras de Layout & Enquadramento |
| :--- | :--- | :--- |
| **`landscape` (`1600×900` e `1280×1080`)** | **7 fotos** (`photo-01`, `02`, `06`, `09`, `10`, `14`, `17`, `18` — total 8 paisagem) | • **Hero Full-Bleed:** `photo-01` (`1600×900`, `is_hero: true`) ocupa a abertura com gradiente escuro inferior suave (`linear-gradient` de `rgba(31,43,30,0.68)` a transparente) para legibilidade do H1.<br>• **Banners & Destaques Horizontais:** `aspect-[16/9]` ou `aspect-[16/10]` nas seções Área Externa (`photo-06`, `09`, `10`, `02`), Gourmet (`photo-17`, `18`) e A Casa (`photo-14`). |
| **`portrait` (`675×1200`, `780×1040`, `900×1200`)** | **18 fotos** (salas envidraçadas, hidro iluminada, piscina, quartos, banheiros e mesa posta noturna) | • **Cards Editoriais Verticais:** usar containers `aspect-[3/4]` (para `900×1200` / `780×1040`) e `aspect-[9/14]` ou `aspect-[3/4]` com `object-cover object-center` (para `675×1200`), preservando altura arquitetônica (pé-direito, janelões de vidro, pergolado iluminado e cama/box).<br>• **Assimetria Casa Pitanga:** parear 1 foto `landscape` larga (8 colunas) com 1 foto `portrait` alta (4 colunas) nas seções editoriais.<br>• **Carrossel / Grid de Quartos & Banheiros:** todas as 7 fotos são `portrait`; adotar grade uniforme `aspect-[3/4]` (3–4 colunas no desktop, scroll horizontal ou 2 colunas no mobile). |
| **`square` (`1200×1200`)** | **1 foto** (`photo-04`, fachada com janelões de vidro e pedras) | • **Galeria & Mosaico:** funciona em `aspect-square` (`1/1`) ou adapta-se sem perda crítica a `aspect-[4/3]` / `aspect-[3/4]` na galeria masonry/filtrável. |
| **Galeria Filtrável + Lightbox** | **Todas as 27 fotos** | • **Grid Masonry / Bento Responsivo:** respeita o `aspect-ratio` natural de cada item (`landscape` em `col-span-2` ou `aspect-[16/10]`, `portrait` em `aspect-[3/4]`, `square` em `aspect-square`) para evitar distorção ou cortes indesejados.<br>• **Lightbox:** exibe a imagem inteira com `object-contain` em viewport escuro `#1F2B1E` (`95%` opacidade), legenda `caption_pt`, categoria e navegação por teclado (`←`, `→`, `Esc`). |

---

## 5. Arquitetura Editorial da Página (v0.1)

1. **Header Transparente → Sólido (`#F6F2EA`) ao Rolar:** logo tipográfico provisório (*Refúgio Terracota & Jardim*), âncoras (`A Casa`, `Área Externa`, `Área Gourmet`, `Quartos`, `Galeria`, `Reservas`) e botão CTA em terracota (`Consultar Datas`).
2. **Hero Imersivo (`photo-01`):** fachada arborizada com varanda, badge discreto `Conceito Visual v0.1 · Enio Junior`, título serifado e resumo rápido com chips transparentes sobre o que já está confirmado pelas fotos (Hidro & Pergolado · Piscina · Fogo de Chão · Área Gourmet com Sinuca) + nota `[Capacidade e localização a definir no briefing]`.
3. **Seção "A Casa" (Fundo Marfim `#F6F2EA`):** narrativa sobre a integração entre os ambientes internos e o jardim através dos janelões de vidro, com destaque para as poltronas terracota (`photo-12`, `photo-13`), a sala de TV (`photo-14`) e a atmosfera noturna acolhedora (`photo-27`).
4. **Seção "Área Externa & Lazer" (Faixa Escura Verde-Oliva `#1F2B1E`):** seção de alto contraste inspirada na *Casa Pitanga*, destacando em areia/madeira (`#C79B5E`) a hidromassagem iluminada no deck elevado (`photo-05`, `photo-06`), o fogo de chão cercado pelo jardim (`photo-09`, `photo-10`), a piscina ampla (`photo-11`) e o acesso florido (`photo-02`).
5. **Seção "Área Gourmet & Convivência" (Fundo Marfim `#F6F2EA`):** foco na amplitude do espaço (`photo-16`, `photo-17`, `photo-18`, `photo-19`) com churrasqueira, cervejeira, balcão com banquetas, TV e mesa de sinuca.
6. **Seção "Quartos, Suítes & Banheiros" (Fundo Linho `#EFE9DD`):** grid editorial vertical uniforme exibindo todas as 5 fotos de quartos/suítes climatizados (`photo-20` a `photo-24`) e os 2 banheiros/lavabo (`photo-25`, `photo-26`), acompanhado de um bloco honesto `[A definir no briefing: número total de suítes, camas e enxoval]`.
7. **Galeria Completa Filtrável + Lightbox (Referência *Casa Tabatinga 2*):** 7 botões de filtro (`Todas (27)`, `Jardim & Fachada`, `Hidro & Pergolado`, `Lazer & Fogo de Chão`, `Sala & Detalhes`, `Área Gourmet`, `Quartos & Banheiros`), grid com todas as 27 fotos reais e lightbox acessível.
8. **Faixa Comercial / Briefing Pendente & Footer (`#1F2B1E`):** painel claro de próximos passos com placeholders explícitos `[A definir no briefing]` para nome definitivo, diárias, capacidade de hóspedes, endereço e canal de reserva direta.
