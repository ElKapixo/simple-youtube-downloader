const express = require("express");
const ytdl = require("ytdl-core");
const fs = require("fs");

const server = express();
server.use(express.json());

server.post(("/getVideo"), async (req, res) => {
    console.log(req.body.url);
    const info = await ytdl.getInfo(req.body.url);
    const audios = [];
    const videos = [];
    info.formats.forEach(format => {
        if (format.hasAudio) {
            if (!audios.includes(format.bitrate)) {
                audios.push(format.bitrate);
            }
        } else if (format.hasVideo) {
            if (!videos.includes(format.qualityLabel)) {
                videos.push(format.qualityLabel);
            }
        } else {
            console.log("Empty format found.");
        }
    });
    res.send({
        audios: audios,
        videos: videos
    })
});

server.listen(3030, () => {
    console.log("Server is up on port 3030.");
});