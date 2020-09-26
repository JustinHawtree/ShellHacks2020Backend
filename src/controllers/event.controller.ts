import express, { Request, Response } from "express";
import * as EventService from "../services/event.service";
import { Event } from "../data/event.interface";


export const eventRouter = express.Router();


eventRouter.get("/volunteer/:id", async (req: Request, res: Response) => {
  if (!req.params.id) return res.sendStatus(400);

  const id: number = parseInt(req.params.id);
  
  try {
    const event: Event = await EventService.find_event_with_volunteer_code(id);

    res.status(200).send(event);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400);
  }
});


eventRouter.get("/coordinator/:id", async (req: Request, res: Response) => {
  if (!req.params.id) return res.sendStatus(400);

  const id: number = parseInt(req.params.id);

  try {
    const event: Event = await EventService.find_event_with_coordinator_code(id);
  
    res.status(200).send(event);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400);
  }
});


eventRouter.post("/", async (req: Request, res: Response) => {
  try {
    const event: Event = req.body;

    await EventService.create(event);
    res.sendStatus(201);
  
  } catch (error) {
    res.status(400).send(error.message);
  }
});


eventRouter.put("/", async (req: Request, res: Response) => {
  try {
    const event: Event = req.body;

    await EventService.update(event);

    res.sendStatus(200);
  
  } catch (error) {
    res.status(500).send(error.message);
  }
})


eventRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);

    await EventService.remove(id);

    res.sendStatus(200);
  
  } catch (error) {
    res.status(500).send(error.message);
  }
})