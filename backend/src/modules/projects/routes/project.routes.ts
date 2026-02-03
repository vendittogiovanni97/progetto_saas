import { Router } from 'express';
import { 
  createProject,
  getUserProjects, 
  getProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller';

const router = Router();

/* PROJECT ROUTES
 * TODO: Aggiungere middleware di autenticazione a tutte le rotte
 * TODO: Aggiungere middleware di validazione dei dati
 * TODO: Aggiungere middleware di autorizzazione (user ownership check)
 */

// PROJECT ROUTES - Gestione completa dei progetti (CRUD)
router.post('/', createProject);     // POST /projects - Crea un nuovo progetto
router.get('/', getUserProjects);    // GET /projects - Prendi tutti i progetti di un utente (usa ?accountId=123)
router.get('/:id', getProject);      // GET /projects/:id - Prendi un progetto specifico con le sue relazioni
router.put('/:id', updateProject);   // PUT /projects/:id - Aggiorna un progetto
router.delete('/:id', deleteProject); // DELETE /projects/:id - Elimina un progetto e tutte le sue relazioni

export default router;
