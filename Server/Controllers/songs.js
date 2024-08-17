"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSong = exports.UpdateSong = exports.AddSong = exports.DisplaySongById = exports.DisplaySongsList = void 0;
const song_1 = __importDefault(require("../Models/song"));
const Util_1 = require("../Util");
function DisplaySongsList(req, res, next) {
    song_1.default.find({})
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
exports.DisplaySongsList = DisplaySongsList;
function DisplaySongById(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({
            success: false,
            msg: "A valid ID is required to retrive a song",
            data: "",
        });
    }
    else {
        song_1.default.findById({ _id: id })
            .then((data) => {
            if (data) {
                res.status(200).json({
                    success: true,
                    msg: "Song returned successfully",
                    data: data,
                });
            }
            else {
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
exports.DisplaySongById = DisplaySongById;
function AddSong(req, res, next) {
    let composer = req.body.composer
        ? (0, Util_1.SanitizeArray)(req.body.composer)
        : (0, Util_1.SanitizeArray)("");
    let song = new song_1.default({
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
    song_1.default.create(song)
        .then(() => {
        res.status(200).json({ success: true, msg: "Song added", data: song });
    })
        .catch((err) => {
        console.error(err);
    });
}
exports.AddSong = AddSong;
function UpdateSong(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({
            success: false,
            msg: "A valid ID is required to update a song",
            data: "",
        });
    }
    else {
        let composer = req.body.composer
            ? (0, Util_1.SanitizeArray)(req.body.composer)
            : (0, Util_1.SanitizeArray)("");
        let updateSongDetails = new song_1.default({
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
        song_1.default.updateOne({ _id: id }, updateSongDetails)
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
exports.UpdateSong = UpdateSong;
function DeleteSong(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({
            success: false,
            msg: "A valid ID is required to delete a song",
            data: "",
        });
    }
    else {
        song_1.default.deleteOne({ _id: id })
            .then(() => {
            res.status(200).json({ success: true, msg: "Song deleted", data: id });
        })
            .catch((err) => {
            console.error(err);
        });
    }
}
exports.DeleteSong = DeleteSong;
//# sourceMappingURL=songs.js.map