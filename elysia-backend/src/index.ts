import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { db } from './config/db'

const app = new Elysia()
  .use(cors()) // Abilita le chiamate da altri domini (es. il tuo frontend)
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
  
  .listen(5001)

console.log(`🦊 Backend pronto: http://localhost:5001`)

// Esportiamo il tipo per Eden (la magia per Next.js)
export type App = typeof app