/**
 * FILE NAME - SONG.TS (MODEL)
 * STUDENT NAME - OLUYIPE TOLUWALOPE
 * STUDENT ID - 200586211
 * DATE - 21ST JUNE 2024
 */


import { Collection, Schema, model } from "mongoose";

interface ISong {
  songID: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
  releaseDate: string;
  label: string;
  trackNumber: number;
  isExplicit: string;
  rating: string;
  composer: string[];
  youtubeLink: string;
}

let songSchema = new Schema<ISong>({
  songID: String,
  title: String,
  artist: String,
  album: String,
  genre: String,
  duration: Number,
  releaseDate: String,
  label: String,
  trackNumber: Number,
  isExplicit: String,
  rating: String,
  composer: [String],
  youtubeLink: String,
});

let Song = model<ISong>("Song", songSchema);

export default Song;
