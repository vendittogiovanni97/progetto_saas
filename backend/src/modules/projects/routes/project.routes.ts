import { Router } from 'express';
import { 
  createProject,
  getUserProjects, 
  getProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller';

const router = Router();

// PROJECT ROUTES - Gestione completa dei progetti (CRUD)
router.post('/', createProject);
router.get('/', getUserProjects);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
