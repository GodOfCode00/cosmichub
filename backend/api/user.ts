import { Request, Response, Router } from "express";
import { UserService } from "../services/user";

const UserRouter=Router();

UserRouter.get('/',async (request:Request,response:Response)=>{
    const result=await UserService.getAll();
    response.json(result);
});

UserRouter.get('/:id',async (request:Request,response:Response)=>{
    const result=await UserService.get(request.params.id);
    response.json(result);
});

UserRouter.get('/me',(request:Request,response:Response)=>{
    const result=UserService.getMe();
    response.json(result);
});

UserRouter.post('/signup',async (request:Request,response:Response)=>{
    const result=await UserService.signup(request.body);
    response.json(result);
});

UserRouter.post('/signin',async (request:Request,response:Response)=>{
    const result=await UserService.signIn(request.body);
    response.json(result);
});

UserRouter.put('/me',async (request:Request,response:Response)=>{
    const result=await UserService.updateMe(request.body);
    response.json(result);
});

UserRouter.delete('/me',async (request:Request,response:Response)=>{
    const result=await UserService.removeMe();
    response.json(result);
});

export default UserRouter;
