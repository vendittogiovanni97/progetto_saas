'use client'

import { Container, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

export default function PageNotFound() {
    const pathname = usePathname(); // Ottieni il percorso attuale
    return (
        <Container fixed sx={{ mt: 8, textAlign: "center" }} >
            <Typography variant="h2">Pagina non disponibile!</Typography>
            <Typography variant="h6">Non esiste nessuna pagina per l&apos;indirizzo {pathname}!.</Typography>
        </Container>
    );
}