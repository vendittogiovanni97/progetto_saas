# Sistema API Client

Sistema centralizzato per le chiamate API con gestione automatica di autenticazione, retry logic e gestione errori.

## Struttura

- `client.ts` - Client API principale con retry logic
- `auth.ts` - Gestione token e refresh automatico
- `config.ts` - Configurazione endpoint e costanti
- `errors.ts` - Classi errori personalizzate
- `index.ts` - Export principale

## Utilizzo Base

```typescript
import { apiClient, API_ENDPOINTS } from '@/services/api';

// GET request
const response = await apiClient.get<ProjectData>(API_ENDPOINTS.PROJECTS.BASE);

// POST request
const newProject = await apiClient.post<ProjectData>(
  API_ENDPOINTS.PROJECTS.BASE,
  { name: 'My Project', status: 'active' }
);

// PUT request
const updated = await apiClient.put<ProjectData>(
  API_ENDPOINTS.PROJECTS.BY_ID('123'),
  { name: 'Updated Name' }
);

// DELETE request
await apiClient.delete(API_ENDPOINTS.PROJECTS.BY_ID('123'));
```

## Gestione Autenticazione

Il token viene aggiunto automaticamente agli header. Il refresh avviene in automatico quando necessario:

```typescript
import { authManager } from '@/services/api';

// Login (da implementare nel service auth)
const response = await apiClient.post<AuthTokenResponse>(
  API_ENDPOINTS.AUTH.LOGIN,
  { email, password }
);

authManager.setTokens(
  response.data.accessToken,
  response.data.refreshToken,
  response.data.expiresIn
);

// Logout
authManager.clearTokens();
```

## Gestione Errori

```typescript
import { apiClient, ApiClientError, NetworkError } from '@/services/api';

try {
  const data = await apiClient.get('/projects');
} catch (error) {
  if (error instanceof ApiClientError) {
    console.error('API Error:', error.status, error.message);
    if (error.errors) {
      // Errori di validazione
      console.error('Validation errors:', error.errors);
    }
  } else if (error instanceof NetworkError) {
    console.error('Network error');
  }
}
```

## Configurazione Richieste

```typescript
// Disabilitare retry
await apiClient.get('/endpoint', { retry: 0 });

// Timeout personalizzato (ms)
await apiClient.get('/endpoint', { timeout: 5000 });

// Saltare autenticazione
await apiClient.get('/public-endpoint', { skipAuth: true });

// Headers personalizzati
await apiClient.get('/endpoint', {
  headers: { 'X-Custom-Header': 'value' }
});
```

## Variabili d'Ambiente

Aggiungere in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Retry Logic

Il client implementa retry automatico per:
- Errori 500, 502, 503
- Network errors
- Timeout errors

Configurabile tramite `retry` e `retryDelay` in `ApiRequestConfig`.

## Refresh Token Automatico

Il refresh token viene gestito automaticamente:
- Controllo scadenza con threshold configurabile
- Refresh prima della scadenza
- Prevenzione multiple refresh simultanei

