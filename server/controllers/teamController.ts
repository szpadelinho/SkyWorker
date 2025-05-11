import { Request, Response } from 'express'
import * as teamService from '../services/teamService'

export const createTeamHandler = async (req: Request, res: Response) => {
    try {
        const newTeam = await teamService.createTeam(req.body)
        res.status(201).json(newTeam)
    } catch (err) {
        res.status(500).json(err)
    }
};

export const getAllTeamsHandler = async (req: Request<{id: string}>, res: Response) => {
    try{
        const teams = await teamService.getAllTeams()
        res.status(200).json(teams)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getTeamByIdHandler = async (req: Request<{id: string}>, res: Response) => {
    try{
        const team = await teamService.getTeamById(req.params.id)
        if(!team){
            res.status(404).json("No such team ID")
            return
        }
        res.status(200).json(team)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const updateTeamHandler = async (req: Request<{id: string}>, res: Response) => {
    try{
        const updatedTeam = await teamService.updateTeam(req.params.id, req.body)
        if(!updatedTeam){
            res.status(404).json("No such team ID")
            return
        }
        res.status(200).json(updatedTeam)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const deleteTeamHandler = async (req: Request<{id: string}>, res: Response) => {
    try{
        const deletedTeam = await teamService.deleteTeam(req.params.id)
        if(!deletedTeam){
            res.status(404).json("No such team ID")
            return
        }
        res.status(200).json(deletedTeam)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const addMemberHandler = async (req:  Request<{ teamId: string; userId: string }>, res: Response) => {
    try{
        const team = await teamService.addMember(req.params.teamId, req.params.userId)
        if(!req.params.teamId){
            res.status(404).json("No such team ID")
            return
        }
        else if(!req.params.userId){
            res.status(404).json("No such member ID")
            return
        }
        res.status(200).json(team)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const removeMemberHandler = async (req:  Request<{ teamId: string; userId: string }>, res: Response) => {
    try{
        const team = await teamService.removeMember(req.params.teamId, req.params.userId)
        if(!req.params.teamId){
            res.status(404).json("No such team ID")
            return
        }
        else if(!req.params.userId){
            res.status(404).json("No such member ID")
            return
        }
        res.status(200).json(team)
    }
    catch(err){
        res.status(500).json(err)
    }
}