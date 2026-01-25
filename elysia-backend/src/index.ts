import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { db } from './config/db'

const port = process.env.PORT as string || 5001;

const app = new Elysia().use(cors()) // Abilita le chiamate da altri domini (es. il tuo frontend)
  .get('/', () => ({ 
    status: 'online', 
    engine: 'Bun + Elysia',
    db: 'Connected 🚀' 
  }))
  
  // Gruppo di API per tenere tutto ordinato
  .group('/api', (app) => 
    app
      .get('/users', () => db.user.findMany())
      .get('/health', () => ({ ok: true }))
  )
  
  .listen(port, () => console.log(`🦊 Backend pronto: http://localhost:${port}`))

// Esportiamo il tipo per Eden (la magia per Next.js)
export type App = typeof app