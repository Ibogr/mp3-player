class MusicPlayer {
    constructor(musicList) {
        this.musicList = musicList;
        this.index = 0;
    }
    getMusic() {
        return this.musicList[this.index];
    }
    next() {
        if (this.index + 1 < this.musicList.length) {
            console.log(this.index);
            this.index++;
        } else {
            console.log(this.index);

            this.index = 0;
        }
    }
    previous() {
        if (this.index != 0) {
            this.index--;
            console.log(this.index);

        } else {
            console.log(this.index);
            this.index = this.musicList.length - 1;
        }

    }
    // this.index--;
}
