import { Request, Response } from 'express';
import { Properties } from '../../configs/properties';
import axios, { AxiosHeaders } from 'axios';

const property: Properties = new Properties();

export class ProductsMiddleware {

    public checkHeader(req: Request, res: Response, next: () => void){
        console.log('[info]: Verificando header');
        const { authorization } = req.headers;
        if(authorization?.split(' ')[0] === 'Bearer'){
            console.log('[info]: Token encontrado');
            next();
        } else {
            console.log('[error]: Debe ingresar un token valido');
            res.json({ status: false });
        }
    };

    public async checkAdminProfile(req: Request, res: Response, next: () => void){
        console.log('[info]: Verificando estado del token');
        const { authorization } = req.headers;
        const [ validation_url ] = await property.getProperty('Jupiter Verification URL');
        const headers = new AxiosHeaders({
            Authorization: `Bearer ${authorization?.split(' ')[1]}`
        });
        const verify = await axios.post(validation_url.value, null, { headers });
        if(verify.data.status == true){
            console.log('[info]: Token ok');
            console.log('[info]: Verificando perfil');
            const token_body = atob(String(authorization?.split(' ')[1].split('.')[1]));
            const profile = token_body.split(',')[1].split('"')[3];
            if(profile === 'ADMIN'){
                next();
            } else {
                console.log('[error]: Perfil invalido');
                res.redirect('/');
            };
        } else {
            console.log('[error]: Token Invalido');
            res.redirect('/');
        };
    };

}
