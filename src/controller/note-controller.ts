import { NextFunction, Request, Response } from 'express';
// import model from '../model/note-model';
import { Note } from '../model/note-model';
export const getAllNotes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var noteInstance: Note = {
    noteId: 1,
    title: 'title',
    content: 'content',
    createdBy: "",
    createdOn: 1,
  };
  res.send(JSON.stringify(noteInstance));
  console.log(JSON.stringify(noteInstance));
};
export const saveNotes = (req: Request, res: Response, next: NextFunction) => {
  var createdBy = "admin";
  var createdOn = Date.now();
  var title = req.body.title;
  var content = req.body.content;
  if (!title || !content) {
    return res.status(501).send({error: "empty"})
  }

  var noteInstance: Note = {
    noteId: 1,
    title: title,
    content: content,
    createdBy: createdBy,
    createdOn: createdOn,
  };
    return res.status(201).send( `good`);
};

export const updateNotes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var createdBy = 'admin';
  var createdOn = Date.now();

  //
  var noteId = req.body.noteId;
  var title = req.body.title;
  var content = req.body.content;


  if (!title || !content) {
    return res.status(501).send({ error: 'empty' });
  }

  var noteInstance: Note = {
    noteId: 1,
    title: title,
    content: content,
    createdBy: createdBy,
    createdOn: createdOn,
  };
  return res.status(200).send(`good`);
};

export const deleteNotes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('delete Notes');
};
