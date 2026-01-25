import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

const port = process.env.PORT as string || 5001;

const app = new Elysia()
  .use(cors()) // Abilita le chiamate da altri domini (es. il tuo frontend)
  .get('/', () => ({ message: 'Elysia Backend è attivo e funzionante! 🚀' }))
  
  // Gruppo di API per tenere tutto ordinato
  app.group('/api', (app) => 
    app
      .get('/auth', () => {})
      .get('/chatbots', () => {})
  )

  app.listen(port, () => 
    console.log(`
        🛡️  KODA GATEWAY
        -------------------------
        Status: Online
        Port:   ${port}
        Routes: http://localhost:${port}
      `
    )
  );

// Esportiamo il tipo per Eden (la magia per Next.js)
export type App = typeof app