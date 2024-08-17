/**
 * FILE NAME - SONGS.TS (C0NTROLLER)
 * STUDENT NAME - OLUYIPE TOLUWALOPE
 * STUDENT ID - 200586211
 * DATE - 21ST JUNE 2024
 */


import { Request, Response, NextFunction } from "express";
import Song from "../Models/song";
import { SanitizeArray } from "../Util";

/**
 * This function displays the songs list in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

export function DisplaySongsList(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  Song.find({})
    .then((data) => {
      res.status(200).json({
        success: true,
        msg: "Song List Retrived Successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

/**
 * This function displays a single song by ID in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplaySongById(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // endpoint should be /api/:id
  let id = req.params.id;

  // ensure that the id is valid
  if (id.length != 24) {
    res.status(400).json({
      success: false,
      msg: "A valid ID is required to retrive a song",
      data: "",
    });
  } else {
    Song.findById({ _id: id })
      .then((data) => {
        if (data) {
          res.status(200).json({
            success: true,
            msg: "Song returned successfully",
            data: data,
          });
        } else {
          res
            .status(404)
            .json({ success: false, msg: "Song not found", data: "" });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

/**
 * This function adds a song to the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function AddSong(req: Request, res: Response, next: NextFunction): void {
  let composer = req.body.composer
    ? SanitizeArray(req.body.composer as string)
    : SanitizeArray("");

  let song = new Song({
    songID: req.body.songID,
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre,
    duration: req.body.duration,
    label: req.body.label,
    releaseDate: req.body.releaseDate,
    trackNumber: req.body.trackNumber,
    isExplicit: req.body.isExplicit,
    rating: req.body.rating,
    composer: composer,
    youtubeLink: req.body.youtubeLink,
  });

  Song.create(song)
    .then(() => {
      res.status(200).json({ success: true, msg: "Song added", data: song });
    })
    .catch((err) => {
      console.error(err);
    });
}

/**
 * This function updates a song in the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function UpdateSong(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // endpoint should be /api/update/:id
  let id = req.params.id;

  // ensure that the id is valid
  if (id.length != 24) {
    res.status(400).json({
      success: false,
      msg: "A valid ID is required to update a song",
      data: "",
    });
  } else {
    let composer = req.body.composer
    ? SanitizeArray(req.body.composer as string)
    : SanitizeArray("");

    let updateSongDetails = new Song({
      _id: id,
      songID: req.body.SongID,
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
      duration: req.body.duration,
      label: req.body.label,
      releaseDate: req.body.releaseDate,
      trackNumber: req.body.trackNumber,
      isExplicit: req.body.isExplicit,
      rating: req.body.rating,
      composer: composer,
      youtubeLink: req.body.youtubeLink,
    });

  
    Song.updateOne({ _id: id }, updateSongDetails)
      .then(() => {
        res
          .status(200)
          .json({ success: true, msg: "Song updated", data: updateSongDetails });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

/**
 * This function deletes a song from the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DeleteSong(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // endpoint should be /api/delete/:id
  let id = req.params.id;

  // ensure that the id is valid
  if (id.length != 24) {
    res.status(400).json({
      success: false,
      msg: "A valid ID is required to delete a song",
      data: "",
    });
  } else {
    Song.deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({ success: true, msg: "Song deleted", data: id });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
