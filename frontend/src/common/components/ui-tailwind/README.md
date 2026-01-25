# UI Tailwind Components

Questa cartella contiene una libreria di componenti UI realizzati interamente con **React** e **Tailwind CSS**, senza dipendenze esterne pesanti (come Material UI o Radix UI). Sono progettati per essere leggeri, personalizzabili e pronti all'uso.

Di seguito il riepilogo di tutti i componenti disponibili:

## Core & Layout

*   **`PageContainer.tsx`**
    *   **PageContainer**: Contenitore wrapper standard per le pagine, assicura margini e padding coerenti.

*   **`Sidebar.tsx`**
    *   **Sidebar**: Barra laterale di navigazione verticale. Include logo, link di navigazione con stati attivi/hover, badge notifiche e profilo utente in basso.

*   **`Header.tsx`**
    *   **Header**: Barra superiore per titoli di pagina. Include titolo, sottotitolo opzionale e una slot per azioni (pulsanti) sulla destra.

*   **`Separator.tsx`**
    *   **Separator**: Linea divisoria estetica. Può essere orizzontale o verticale. Utile per dividere sezioni di contenuto.

## Input & Forms

*   **`Button.tsx`**
    *   **Button**: Pulsante interattivo. Supporta varianti standard (`primary`, `secondary`, `minimal`, `danger`) e diverse dimensioni (`sm`, `md`, `lg`).

*   **`Input.tsx`**
    *   **Input**: Campo di testo standard con label e gestione errori.
    *   **Textarea**: Campo di testo multilinea.
    *   **Select**: Menu a tendina nativo stilizzato.

*   **`Switch.tsx`**
    *   **Switch**: Interruttore toggle (On/Off).
    *   **Checkbox**: Casella di selezione (spuntato/non spuntato).
    *   **SegmentedControl**: Gruppo di pulsanti mutuamente esclusivi (simile a dei tab ma per input), utile per cambiare viste o filtri.

*   **`Slider.tsx`**
    *   **Slider**: Barra di scorrimento per selezionare un valore numerico in un range. Include track colorato e "thumb" trascinabile.

## Data Display

*   **`Card.tsx`**
    *   **Card**: Contenitore generico con sfondo scuro e bordo sottile.
    *   **SectionCard**: Card avanzata con header (titolo/sottotitolo e azioni) e area contenuto separata.
    *   **KPICard**: Card specifica per metriche chiavi (KPI), mostra titolo, valore numerico, percentuale di trend e un mini grafico opzionale.

*   **`Table.tsx`**
    *   **Table**: Tabella dati responsiva. Accetta una configurazione di colonne e un array di dati. Supporta il rendering personalizzato delle celle (es. per badge o azioni).

*   **`Badge.tsx`**
    *   **Badge**: Etichetta colorata per stati (es. "Attivo", "Errore").
    *   **StatusPill**: Variante del badge con un pallino colorato indicatore (dot) e testo, stile "pillola".

*   **`Avatar.tsx`**
    *   **Avatar**: Elemento circolare per immagini profilo utente. Gestisce automaticamente il fallback con le iniziali se l'immagine non è disponibile.

*   **`Chart.tsx`**
    *   **MiniLineChart**: Piccolo grafico a linea (Sparkline) per visualizzare trend rapidi.
    *   **MiniBarChart**: Piccolo grafico a barre per visualizzare distribuzioni o confronti rapidi.

*   **`Pagination.tsx`**
    *   **Pagination**: Navigazione tra pagine numerate. Gestisce automaticamente troncamento (es. 1 ... 5 6 7 ... 10).

*   **`Stepper.tsx`**
    *   **Stepper**: Indicatore di progresso multifase. Visualizza step numerati con stati (completato, corrente, futuro) e etichette.

## Feedback & Overlay

*   **`Modal.tsx`**
    *   **Modal**: Finestra di dialogo classica che si sovrappone al contenuto (backdrop blur). Include header con chiusura e footer opzionale.
    *   **ConfirmModal**: Variante pre-configurata della modale per richieste di conferma (es. "Sei sicuro di voler eliminare?").

*   **`Drawer.tsx`**
    *   **Drawer**: Pannello laterale a scorrimento (off-canvas). Ottimo per menu di dettaglio o configurazioni complesse senza perdere il contesto.

*   **`Alert.tsx`**
    *   **Alert**: Box colorato per messaggi di avviso o feedback (info, successo, pericolo, warning). Include icona automatica in base al tipo.

*   **`Tooltip.tsx`**
    *   **Tooltip**: Piccola etichetta informativa che appare al passaggio del mouse su un elemento. Supporta posizionamento automatico (top, bottom, left, right).

*   **`Skeleton.tsx`**
    *   **Skeleton**: Placeholder grigio pulsante che simula la forma del contenuto mentre i dati vengono caricati (loading state).

*   **`Spinner.tsx`**
    *   **Spinner**: Indicatore di caricamento rotante (loader) SVG animato.

*   **`Progress.tsx`**
    *   **Progress**: Barra di avanzamento orizzontale animata per visualizzare una percentuale di completamento.

## Navigation & Disclosure

*   **`Tabs.tsx`**
    *   **Tabs**: Sistema completo di schede per alternare contenuti. Include `TabsList` (contenitore pulsanti), `TabsTrigger` (il singolo pulsante tab) e `TabsContent` (il pannello che appare). Gestito via React Context interno.

*   **`Accordion.tsx`**
    *   **Accordion**: Lista di pannelli espandibili verticalmente. Cliccando sul titolo si rivela o nasconde il contenuto. Supporta modalità singola o multipla.

*   **`Breadcrumb.tsx`**
    *   **Breadcrumb**: Percorso di navigazione (es. Home > Sezione > Pagina). Aiuta l'utente a capire dove si trova nella gerarchia del sito.

## Typography

*   **`Typography.tsx`**
    *   Include componenti tipografici pre-stilizzati per garantire coerenza: **H1**, **H2**, **H3**, **Text** (paragrafo), **Caption** (testo piccolo).
