import express from 'express';
const router = express.Router();
import passport from 'passport';

import { DisplaySongsList, DisplaySongById, AddSong, UpdateSong, DeleteSong } from '../Controllers/songs';


/* List of Movie Routes (endpoints) */

/* GET Movie List - fallback in case /list is not used */
router.get('/', (req, res, next) => {  DisplaySongsList(req, res, next); });

/* GET Movie List. */
router.get('/list', (req, res, next) => {  DisplaySongsList(req, res, next); });

/* GET Movie by ID. */
router.get('/find/:id', (req, res, next) => {  DisplaySongById(req, res, next); });

/* Add Movie */
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => {  AddSong(req, res, next); });

/* Update Movie */
router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {  UpdateSong(req, res, next); });

/* Delete Movie */
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {  DeleteSong(req, res, next); });


export default router;
