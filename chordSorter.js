// users known chords
const chordsKnown = ["A", "C", "D", "Am", "G"];
// collection of all songs in database
const songs = [
    {
        title: "Stick Season", 
        artist: "Noah Kahan",
        chords: ["A","E", "F#m", "A/E"]
    },

    {
        title: "Maine", 
        artist: "Noah Kahan",
        chords: ["A","E", "Amaj7", "C#m", "B"]
    },

    {
        title: "Sailor Song", 
        artist: "Gigi Perez",
        chords: ["C","Em", "G"]
    }
];


// returns song item given song title
function findSongByTitle(songs, songName) {
    return songs.find(function(song) {
        return song.title.toLowerCase() === songName.toLowerCase();
    });
}

// given a song title, returns array of missing chords
function missingChords(songTitle, chordsKnown, songs){
    // finds the dictionary item belonging to songTitle
    const comparisonSong = findSongByTitle(songs, songTitle);
    // return null if no songtitle
    if (!comparisonSong) {return null;}
    // gets list of chords from that song
    const songChordList = comparisonSong.chords;
    // list for known and unknown chords
    const unknown = [];
    const shared = [];
    // loop through two lists, add shared chords and unknown chords to lists
    for (let i = 0; i < songChordList.length; i++){
        if (chordsKnown.includes(songChordList[i])){
            shared.push(songChordList[i]);
        } else if (!unknown.includes(songChordList[i])){
            unknown.push(songChordList[i])
        }
    }
    // return length of unknown (chords not learned)
    return unknown.length;
}

//returns a list of song titles
//function orderedByArtist(songs, artistName){}




console.log(missingChords("Stick Season", chordsKnown));


