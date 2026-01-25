# Test Dashboard

Dashboard di test creata con Material UI e i componenti custom già esistenti nel progetto.

## Struttura

```
test-dashboard/
├── page.tsx                    # Pagina principale
└── components/
    ├── DashboardSidebar.tsx    # Sidebar con navigazione
    ├── DashboardContent.tsx    # Area contenuto principale
    ├── DashboardHeader.tsx     # Header con tabs e search
    ├── StatsCards.tsx          # Card statistiche
    └── ProductsTable.tsx       # Tabella prodotti
```

## Componenti MUI Utilizzati

- **UiCard** - Card per stats e tabella
- **UiTable** - Tabella prodotti
- **UiButton** (potenziale uso futuro)
- Material UI components base (Box, Grid, Chip, Avatar, etc.)

## Colori (Inline)

Tutti i colori sono definiti inline come richiesto:

- **Background principale**: `#0f1419`
- **Background sidebar/card**: `#1a1f2e`
- **Bordi**: `#2d3748`
- **Blu primario**: `#0066ff`
- **Testo primario**: `#ffffff`
- **Testo secondario**: `#94a3b8`
- **Verde (successo)**: `#10b981`
- **Giallo (warning)**: `#f59e0b`
- **Viola**: `#7c3aed`
- **Arancione**: `#f97316`

## Come visualizzare

Avvia il server di sviluppo e vai su:
```
http://localhost:3000/test-dashboard
```

## Note

Questa è una versione di test. Il tema verrà configurato successivamente.
