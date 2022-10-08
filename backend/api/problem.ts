import { Request, Response, Router } from "express";
import authHandler from "../middleware/auth-handler";
import { ProblemService } from "../services/problem";

const ProblemRouter=Router();

ProblemRouter.get('/',async (request:Request,response:Response)=>{
    const result=await ProblemService.getAll();
    response.json(result);
});

ProblemRouter.get('/:id',async (request:Request,response:Response)=>{
    const result=await ProblemService.get(request.params.id);
    response.json(result);
});

ProblemRouter.get('/me',authHandler,async (request:Request,response:Response)=>{
    const result=await ProblemService.getMyProblems();
    response.json(result);
});

ProblemRouter.post('/me',authHandler,async (request:Request,response:Response)=>{
    const result=await ProblemService.createMyproblem(request.body);
    response.json(result);
});

ProblemRouter.put('/me',authHandler,async (request:Request,response:Response)=>{
    const result=await ProblemService.updateMyproblem(request.body);
    response.json(result);
});

ProblemRouter.delete('/me',authHandler,async (request:Request,response:Response)=>{
    const result=await ProblemService.removeMyProblem();
    response.json(result);
});

export default ProblemRouter;
