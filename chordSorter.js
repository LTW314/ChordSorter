class chordSorter {

    constructor(songs, chordsKnown){
        this.chordsKnown = chordsKnown;
        this.songs = songs;
        this.sharedChords = [];
        this.unknownChords = [];
    }


    //add chord to chords known
    addChordKnown(chord){
        this.chordsKnown.push(chord);
    }

    //remove chord from chords known
    removeChordKnown(chordToRemove){
        this.chordsKnown = this.chordsKnown.filter(function(chord){
            return chord != chordToRemove;
    })}


    // returns song item given song title
    findSongByTitle(songName) {
        return this.songs.find(function(song) {
            return song.title.toLowerCase() === songName.toLowerCase();
        });
    }

    // given a song title, returns array of missing chords
    missingChords(songTitle){
        // finds the dictionary item belonging to songTitle
        const comparisonSong = this.findSongByTitle(songTitle);
        // return null if no songtitle
        if (!comparisonSong) {return null;}
        // gets list of chords from that song
        const songChordList = comparisonSong.chords;
        // list for known and unknown chords
        const unknown = [];
        const shared = [];
        // loop through two lists, add shared chords and unknown chords to lists
        for (let i = 0; i < songChordList.length; i++){
            if (this.chordsKnown.includes(songChordList[i])){
                shared.push(songChordList[i]);
            } else if (!unknown.includes(songChordList[i])){
                unknown.push(songChordList[i])
            }
        }
        // return length of unknown (chords not learned)
        return unknown.length;
    }



    //orderedByArtist(songs, artistName){}

}

const chordsKnown = ["A", "C", "D", "Am", "G"];

const songs = [{
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
    }];


const sorter = new chordSorter(songs, chordsKnown);
console.log(sorter.missingChords("Stick Season"));


