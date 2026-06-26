class chordSorter {

    //songs array of song items, chordsknown a set of chords
    constructor(songs, chordsKnown){
        this.chordsKnown = chordsKnown;
        this.songs = songs;
        this.sharedChords = new Set();
        this.unknownChords = new Set();
    }


    //add chord to chords known
    addChordKnown(chord){
        this.chordsKnown.add(chord);
    }

    //remove chord from chords known
    removeChordKnown(chordToRemove){
        this.chordsKnown.delete(chordToRemove);
    }


    // returns song item given song title
    findSongByTitle(songName) {
        return this.songs.find(function(song) {
            return song.title.toLowerCase() === songName.toLowerCase();
        });
    }

    // returns array of all song items from an artist
    listSongsByArtist(artistName){
        return this.songs.filter(song =>
            song.artist.toLowerCase() === artistName.toLowerCase());
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


    // given an artist, list songs where all chords are known
    // each song as a list [SongTitle, chordsKnown, Chords Unknown]
    knownByArtist(artistName){
        const artistArray = listSongsByArtist(artistName);
        const songsKnown = []
        // loop through all songs by an artist
        for (let i = 0; i < listSongsByArtist.length; i++){
            const hasAllChords = true;
            // loop through choreds of each song
            for (let j = 0; j < artistArray[i].chords.length; j++){
                // mark false if any chords don't match
                if (!chordsKnown.has(artistArray[i].chords[j])){
                    hasAllChords = false;
                }
                if (hasAllChords = true){
                    songsKnown.push([]);
                    // new song slot
                    const songSlot = songsKnown[songsKnown.length-1];
                    //title
                    songSlot.push(artistArray[i].title);
                    //chords known
                    songSlot.push([artistArray[i].chords]);
                    //chords unknown
                    songSlot.push([]);
                
                }
            }
        }
        return songsKnown;
    }

    // given an artist, list songs in order of chords known
    // each song as a list [SongTitle, chordsKnown, Chords Unknown]
    orderedByArtist(artistName){}

}

const chordsKnown = new  Set(["A", "C", "D", "Am", "G"]);

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


