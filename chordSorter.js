class chordSorter {

    //songs array of song items, chordsknown a set of chords
    constructor(songs, chordsKnown){
        this.chordsKnown = chordsKnown;
        this.songs = songs;
        this.sharedChords = new Set();
        this.unknownChords = new Set();
    }


    // add chord to chords known
    addChordKnown(chord){
        this.chordsKnown.add(chord);
    }

    // remove chord from chords known
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

    // compares an array of chords to known set of chords
    // returns # missing
    compareListMissing(givenList, knownSet) {
        let numMissing = 0;
        for (let i = 0; i < givenList.length; i++){
            if (!knownSet.has(givenList[i])){
                numMissing++;
            }
        }
        return numMissing;
    }


    // given a song title, returns num of missing chords
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
            if (this.chordsKnown.has(songChordList[i])){
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
    // equivalent to running unknownByArtist with the value 0
    knownByArtist(artistName){
        
        const artistArray = this.listSongsByArtist(artistName);
        const songsKnown = []
        // loop through all songs by an artist
        for (let i = 0; i < artistArray.length; i++){
            let hasAllChords = true;
            // loop through choreds of each song
            for (let j = 0; j < artistArray[i].chords.length; j++){
                // mark false if any chords don't match
                if (!this.chordsKnown.has(artistArray[i].chords[j])){
                    hasAllChords = false;
                }
            }
            if (hasAllChords === true){
                songsKnown.push([]);
                // new song slot
                const songSlot = songsKnown[songsKnown.length-1];
                //title
                songSlot.push(artistArray[i].title);
                //chords known
                songSlot.push(artistArray[i].chords);
                //chords unknown
                songSlot.push([]);
                
            }
        }
        return songsKnown;
    }


    // given an artist, list songs where xUnknown chords are unknown
    // each song as a list [SongTitle, chordsKnown, Chords Unknown]
    unknownByArtist(artistName, xUnknown){
        
        const artistArray = this.listSongsByArtist(artistName) || [];
        const songsMatch = []

        // loop through all songs by an artist
        for (let i = 0; i < artistArray.length; i++){
            
            let numUnknown = 0;
            const unknownChordsList = [];
            const knownChordsList = [];
            // loop through choreds of each song
            for (let j = 0; j < artistArray[i].chords.length; j++){
                // increase unknown if don't match
                if (!this.chordsKnown.has(artistArray[i].chords[j])){
                    numUnknown += 1;
                    unknownChordsList.push(artistArray[i].chords[j]);
                } else {
                    knownChordsList.push(artistArray[i].chords[j]);
                }
                // check if numUnkown matches X

            }
            if (xUnknown === numUnknown){
                songsMatch.push([]);
                // new song slot
                const songSlot = songsMatch[songsMatch.length-1];
                //title
                songSlot.push(artistArray[i].title);
                //chords known
                songSlot.push(knownChordsList);
                //chords unknown
                songSlot.push(unknownChordsList);
                
            }
        }
        return songsMatch;
    }


    // given an artist string, list all songs in order of # chords unknown
    // each song as a list [SongTitle, chordsKnown, Chords Unknown]
    orderedByArtist(artistName){
        
        // get all songs by artist
        const artistList = this.listSongsByArtist(artistName);
        
        //get maximum number of chords from list
        let maxChords = 0;
        for (let i = 0; i < artistList.length; i++){
            if (maxChords < artistList[i]["chords"].length){
                maxChords = artistList[i]["chords"].length;
            }
        }

        const sortedArtistList = [];

        for (const song of artistList){
            const missing = (this.compareListMissing(song["chords"], this.chordsKnown))
            sortedArtistList[missing] ??= [];
            sortedArtistList[missing].push(song)
        }
        //concatinates, returns
        return sortedArtistList.flat();
    }


    // given a list of songs items, order by 0 to max by chords known
    orderedByPlaylist(givenList){

        //get maximum number of chords from list
        let maxChords = 0;
        for (let i = 0; i < givenList.length; i++){
            if (maxChords < givenList[i]["chords"].length){
                maxChords = givenList[i]["chords"].length;
            }
        }

        const sortedList = [];

        for (const song of givenList){
            const missing = (this.compareListMissing(song["chords"], this.chordsKnown))
            sortedList[missing] ??= [];
            sortedList[missing].push(song)
        }
        //concatinates, returns
        return sortedList.flat();

    }

}

// TESTING

const chordsKnown = new Set(["A","E", "F#m", "A/E", "Em"]);

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
    },

    {
        title: "TestSong",
        artist: "Noah Kahan",
        chords: ["A"]
    }

];



const sorter = new chordSorter(songs, chordsKnown);
//console.log(sorter.missingChords("Stick Season"));
//console.log(sorter.listSongsByArtist("Noah Kahan")[0]["chords"]);
console.log(sorter.orderedByArtist("Noah Kahan"));
//console.log(sorter.unknownByArtist("Noah Kahan", 3));


