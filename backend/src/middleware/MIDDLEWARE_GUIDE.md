╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║                  MIDDLEWARE REQUIRED FOR CHATBOTS MODULE                  ║
║                          Priority & Implementation Guide                   ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝


🚨 CRITICAL - MUST HAVE (Fai subito)
═════════════════════════════════════════════════════════════════════════════

1️⃣  AUTHENTICATION MIDDLEWARE (Auth Check)
   Purpose: Verifica JWT token ed estrae userId
   Status:  ❌ NON FATTO
   Dependency: Richiede JWT secret nel .env
   
   Cosa fa:
   ├─ Verifica header Authorization: Bearer <token>
   ├─ Valida il JWT token
   ├─ Estrae userId dal token
   ├─ Attacca req.user = { id, email, role }
   └─ Passa al prossimo middleware se OK
   
   Dove usarlo:
   ├─ Tutte le rotte /api/chatbots (tranne public widget)
   ├─ Tutte le rotte /api/conversations
   └─ Tutte le rotte /api/messages
   
   Tempo implementazione: 15-20 minuti
   Complessità: Media
   Blocca: Ownership check middleware

   File da creare:
   └─ backend/src/middleware/auth.middleware.ts


2️⃣  OWNERSHIP CHECK MIDDLEWARE (User Authorization)
   Purpose: Verifica che l'utente possieda la risorsa
   Status:  ❌ NON FATTO
   Dependency: Auth middleware deve girare prima
   
   Cosa fa:
   ├─ Prende l'id del chatbot/conversation/message da req.params
   ├─ Recupera la risorsa dal DB
   ├─ Verifica che userId === req.user.id
   ├─ Blocca se non proprietario (403)
   └─ Continua se OK
   
   Dove usarlo:
   ├─ PUT /api/chatbots/:id
   ├─ DELETE /api/chatbots/:id
   ├─ GET /api/chatbots/:id (opzionale)
   └─ Ecc per conversations/messages
   
   Tempo implementazione: 20-25 minuti
   Complessità: Media
   Dipende da: Auth middleware

   File da creare:
   └─ backend/src/middleware/ownership.middleware.ts


3️⃣  INPUT VALIDATION MIDDLEWARE (Data Validation)
   Purpose: Valida i dati in input prima di processarli
   Status:  ❌ NON FATTO
   Dependency: Nessuna
   Opzione: Usa Joi o Zod (scegli quale)
   
   Cosa fa:
   ├─ Valida body/params/query secondo schema
   ├─ Controlla tipi dati
   ├─ Controlla lunghezze stringhe
   ├─ Controlla valori obbligatori
   ├─ Ritorna errori 400 se validation fails
   └─ Continua se OK
   
   Dove usarlo:
   ├─ POST /api/chatbots (valida name, systemPrompt, etc)
   ├─ PUT /api/chatbots/:id (valida update data)
   ├─ POST /api/conversations/:id/messages (valida role, content)
   └─ Ecc
   
   Tempo implementazione: 25-30 minuti
   Complessità: Media-Alta
   Raccomandazione: Joi (più semplice) o Zod (più type-safe)

   File da creare:
   ├─ backend/src/middleware/validation.middleware.ts
   └─ backend/src/validators/chatbot.validator.ts (schemas)


═════════════════════════════════════════════════════════════════════════════

🟡 IMPORTANT - HIGHLY RECOMMENDED (Fai questa settimana)
═════════════════════════════════════════════════════════════════════════════

4️⃣  ERROR HANDLING MIDDLEWARE (Centralized Error Handler)
   Purpose: Cattura e formatta tutti gli errori in modo consistente
   Status:  ❌ NON FATTO
   Dependency: Nessuna (usa al fine di tutti i middleware)
   
   Cosa fa:
   ├─ Cattura errori da middleware precedenti
   ├─ Cattura errori da route handlers
   ├─ Formatta errore in response JSON standard
   ├─ Imposta HTTP status code appropriato (400, 403, 500, etc)
   └─ Logga errore (se logger configurato)
   
   Dove usarlo:
   └─ Ultimo middleware nel gateway (after all routes)
   
   Benefici:
   ├─ Risposta consistente per tutti gli errori
   ├─ Meno duplicazione di codice
   ├─ Tracking errori centralizzato
   └─ Facile da debuggare
   
   Tempo implementazione: 15-20 minuti
   Complessità: Bassa
   Priorità: Alta (anche se implementabile dopo)

   File da creare:
   └─ backend/src/middleware/error.middleware.ts


5️⃣  RATE LIMITING MIDDLEWARE (Anti-Abuse)
   Purpose: Limita numero richieste per IP/utente
   Status:  ❌ NON FATTO
   Dependency: Package express-rate-limit
   
   Cosa fa:
   ├─ Traccia numero richieste per IP
   ├─ Blocca se troppi tentativi (429)
   ├─ Reset contatore dopo finestra temporale
   └─ Permette white list (es: admin)
   
   Dove usarlo:
   ├─ POST /api/chatbots (1 al minuto per preventare spam)
   ├─ POST /api/conversations/*/messages (5 al minuto)
   └─ Ecc
   
   Tempo implementazione: 10-15 minuti
   Complessità: Bassa
   Necessità: Consigliata per production

   File da creare:
   └─ backend/src/middleware/rateLimiter.middleware.ts


6️⃣  ASYNC ERROR WRAPPER (Helper per try-catch)
   Purpose: Wrapper per evitare try-catch in ogni handler
   Status:  ❌ NON FATTO
   Dependency: Nessuna
   
   Cosa fa:
   ├─ Wrappa un async handler
   ├─ Cattura errori automaticamente
   ├─ Passa errore al next() per error handler
   └─ Elimina necessità di try-catch ripetuti
   
   Dove usarlo:
   └─ In tutti i controller handlers
   
   Pattern:
   const asyncHandler = (fn) => (req, res, next) =>
     Promise.resolve(fn(req, res, next)).catch(next);
   
   Tempo implementazione: 5 minuti
   Complessità: Bassissima
   Priorità: Alta (utility helper)

   File da creare:
   └─ backend/src/utils/asyncHandler.ts


═════════════════════════════════════════════════════════════════════════════

🟢 RECOMMENDED - NICE TO HAVE (Fai se c'è tempo)
═════════════════════════════════════════════════════════════════════════════

7️⃣  LOGGING MIDDLEWARE (Request/Response Logging)
   Purpose: Log tutte le richieste (method, path, status, time)
   Status:  ❌ NON FATTO
   Dependency: morgan (o custom)
   
   Cosa fa:
   ├─ Loga metodo HTTP (GET, POST, etc)
   ├─ Loga path richiesto
   ├─ Loga status code risposta
   ├─ Loga tempo di elaborazione
   └─ Loga timestamp
   
   Dove usarlo:
   └─ Primo middleware (prima di auth)
   
   Tempo implementazione: 5-10 minuti
   Complessità: Bassissima
   Consigliata per: Development & debugging

   File da creare:
   └─ backend/src/middleware/logger.middleware.ts (o usa morgan)


8️⃣  REQUEST SIZE LIMIT MIDDLEWARE (Security)
   Purpose: Limita grandezza payload (preventare DoS)
   Status:  ❌ NON FATTO
   Dependency: express.json({ limit: '1mb' })
   
   Cosa fa:
   ├─ Imposta max size per body JSON (es: 1MB)
   ├─ Ritorna 413 se payload troppo grande
   └─ Previene memory exhaustion attacks
   
   Tempo implementazione: 2 minuti
   Complessità: Bassissima

   Implementazione:
   app.use(express.json({ limit: '1mb' }));


9️⃣  CORS MIDDLEWARE (Cross-Origin)
   Purpose: Configura CORS per frontend
   Status:  ✅ GIÀ ESISTE
   File:    backend/src/middleware/cors.middleware.ts
   
   Già implementato! Perfetto.


🔟  COMPRESSION MIDDLEWARE (Performance)
   Purpose: Comprime response (gzip)
   Status:  ❌ NON FATTO
   Dependency: compression package
   
   Cosa fa:
   ├─ Comprime JSON responses (gzip)
   ├─ Riduce bandwidth
   ├─ Migliora velocità (per client lento)
   └─ Trasparente per client (auto-decompress)
   
   Tempo implementazione: 2 minuti
   Complessità: Bassissima

   Implementazione:
   import compression from 'compression';
   app.use(compression());


1️⃣1️⃣  CACHE MIDDLEWARE (Performance)
   Purpose: Cache risposte (Redis o memory)
   Status:  ❌ NON FATTO
   Dependency: redis (opzionale)
   
   Cosa fa:
   ├─ Cache GET requests per X minuti
   ├─ Invalidate cache su POST/PUT/DELETE
   ├─ Riduce carico database
   └─ Migliora response time
   
   Dove usarlo:
   ├─ GET /api/chatbots (cache 5 minuti)
   ├─ GET /api/conversations/:id (cache 1 minuto)
   └─ Ecc
   
   Tempo implementazione: 30-45 minuti
   Complessità: Alta
   Priorità: Bassa (fai dopo tests)

   File da creare:
   └─ backend/src/middleware/cache.middleware.ts


1️⃣2️⃣  REQUEST ID MIDDLEWARE (Tracing)
   Purpose: Assegna ID univoco ad ogni richiesta
   Status:  ❌ NON FATTO
   Dependency: uuid
   
   Cosa fa:
   ├─ Genera UUID per ogni richiesta
   ├─ Attacca a req.id
   ├─ Loga in tutte le operazioni
   └─ Facilita tracing nei logs
   
   Tempo implementazione: 5-10 minuti
   Complessità: Bassissima
   Utilità: Molto alta per debugging

   File da creare:
   └─ backend/src/middleware/requestId.middleware.ts


═════════════════════════════════════════════════════════════════════════════

⚪ OPTIONAL - ADVANCED (Se interessato)
═════════════════════════════════════════════════════════════════════════════

1️⃣3️⃣  ROLE-BASED ACCESS CONTROL (RBAC)
   Purpose: Permessi basati su ruolo (ADMIN, USER, etc)
   Status:  ❌ NON FATTO
   Dependency: Logica di ruoli da koda-gup
   
   Cosa fa:
   ├─ Verifica ruolo utente (req.user.role)
   ├─ Blocca se non ha permesso (403)
   └─ Consente solo ruoli specifici
   
   Dove usarlo:
   ├─ DELETE /api/chatbots/:id (solo OWNER)
   ├─ Admin endpoints (solo ADMIN)
   └─ Ecc
   
   Tempo implementazione: 20-30 minuti
   Complessità: Media


1️⃣4️⃣  API KEY MIDDLEWARE (Service-to-Service Auth)
   Purpose: Autenticazione per servizi esterni
   Status:  ❌ NON FATTO
   Dependency: API keys nel DB
   
   Cosa fa:
   ├─ Verifica X-API-Key header
   ├─ Valida API key
   ├─ Blocca se non valida
   └─ Permette servizi di comunicare
   
   Tempo implementazione: 15-20 minuti
   Complessità: Media


1️⃣5️⃣  RATE LIMITING AVANZATO (Per utente)
   Purpose: Rate limit per utente (non solo IP)
   Status:  ❌ NON FATTO
   Dependency: Redis
   
   Cosa fa:
   ├─ Traccia richieste per userId
   ├─ Diversi limiti per piano (free/pro/enterprise)
   └─ Blocca se utente supera quota
   
   Tempo implementazione: 45-60 minuti
   Complessità: Alta


═════════════════════════════════════════════════════════════════════════════

📊 MIDDLEWARE PRIORITY MATRIX
═════════════════════════════════════════════════════════════════════════════

Priorità    Nome                          Tempo   Blocca   Fai?
───────────────────────────────────────────────────────────────────────────
🚨 1        Auth Middleware               20m     ✓        👉 FAI QUESTO
🚨 2        Ownership Check               25m     ✓        👉 POI QUESTO
🚨 3        Input Validation              30m     ✗        👉 POI QUESTO
🟡 4        Error Handling                20m     ✗        📌 QUA SETTIMANA
🟡 5        Rate Limiting                 15m     ✗        📌 QUA SETTIMANA
🟡 6        Async Error Wrapper           5m      ✗        📌 UTILITY
🟢 7        Logging                       10m     ✗        ⏳ SE TEMPO
🟢 8        Request Size Limit            2m      ✗        ⏳ SE TEMPO
🟢 9        Compression                   2m      ✗        ⏳ SE TEMPO
⚪ 10       Cache                         45m     ✗        ⏳ DOPO
⚪ 11       Request ID                    10m     ✗        ⏳ DOPO
⚪ 12       RBAC                          30m     ✗        ⏳ DOPO
⚪ 13       API Key                       20m     ✗        ⏳ DOPO


═════════════════════════════════════════════════════════════════════════════

🎯 RECOMMENDED APPROACH - Fai in questo ordine
═════════════════════════════════════════════════════════════════════════════

SUBITO (Questa ora - 45-60 min totali):
  1. ✅ Auth Middleware                 (20 min)
  2. ✅ Ownership Check Middleware      (25 min)

OGGI POMERIGGIO (2-3 ore):
  3. ✅ Input Validation Middleware     (30 min)
  4. ✅ Error Handling Middleware       (20 min)
  5. ✅ Async Error Wrapper             (5 min)

DOMANI MATTINA:
  6. ✅ Rate Limiting                   (15 min)
  7. ✅ Logging Middleware              (10 min)

OPZIONALE (Quando hai tempo):
  8. Compression                        (2 min)
  9. Request Size Limit                 (2 min)
  10. Request ID                        (10 min)


═════════════════════════════════════════════════════════════════════════════

📝 APPLICAZIONE NEL GATEWAY
═════════════════════════════════════════════════════════════════════════════

Ordine di esecuzione è IMPORTANTE:

app.use(express.json({ limit: '1mb' }));         // Size limit (asap)
app.use(compression());                          // Compression
app.use(requestId());                            // Request ID tracing
app.use(logger());                               // Logging

app.use(cors());                                 // CORS (già esiste)

app.use(rateLimiter());                          // Rate limit globale

// Public routes (nessuna auth)
app.post('/api/public/widget', ...);

app.use('/api', authMiddleware);                 // 👈 Auth check
app.use('/api', ownershipCheck);                 // 👈 Ownership check
app.use('/api', validateInput);                  // 👈 Validation

// Protected routes
app.use('/api', chatbotRoutes);
app.use('/api', kodasupRoutes);

app.use(errorHandler);                           // 👈 Error handling (ultimo!)


═════════════════════════════════════════════════════════════════════════════

🎁 TEMPLATE DI BASE
═════════════════════════════════════════════════════════════════════════════

Auth Middleware:
────────────────
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

Error Handler:
──────────────
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ success: false, message });
};


═════════════════════════════════════════════════════════════════════════════

❓ QUALE FARE ADESSO?
═════════════════════════════════════════════════════════════════════════════

Opzione 1: VELOCE (Solo essenziale - 45 min)
  → Auth Middleware + Ownership Check
  → Rendi sicuro il sistema subito
  
Opzione 2: COMPLETO (Tutto importante - 2-3 ore)
  → Auth + Ownership + Validation + Error Handling + Wrapper
  → Sistema pronto per production

Opzione 3: FULL (Tutto + bonuses - 4-5 ore)
  → Tutte le opzioni 1+2 + Logging + Rate Limit

Quale preferisci? 👀


═════════════════════════════════════════════════════════════════════════════
