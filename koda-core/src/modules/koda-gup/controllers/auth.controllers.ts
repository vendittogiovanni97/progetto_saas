import { Elysia, t } from 'elysia';
import { AuthenticationService } from '../services/auth.services';

const iamService = new AuthenticationService();

export const iamRoutes = new Elysia()
    .post('/register', async ({ body, set }) => {
        try {
            const user = await iamService.register(body);
            set.status = 201;
            return { success: true, data: user };
        } catch (e: any) {
            set.status = 400;
            return { success: false, error: e.message };
        }
    }, {
        body: t.Object({
            name: t.String(),
            email: t.String({ format: 'email' }),
            password: t.String({ minLength: 6 })
        })
    })

    .post('/login', async ({ body, set }) => {
        const user = await iamService.login(body);
        
        if (!user) {
            set.status = 401;
            return { success: false, error: 'Credenziali non valide' };
        }

        return { success: true, user };
    }, {
        body: t.Object({
            email: t.String({ format: 'email' }),
            password: t.String()
        })
    });