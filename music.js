class Music {
    constructor(title, singer, img, audio) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.audio = audio;

    }
    getName() {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Tiryakinim", "Bayhan", "bayhan-img.jpg", "Bayhan - Tiryakinim.mp3"),
    new Music("Efendim isitmedim", "Bayhan", "bayhan-img.jpg", "Efendim İşitmedim - Bayhan.mp3"),
    new Music("Vurdum En Dibe Kadar", "Baris Akarsu", "baris akarsu.jpg", "Vurdum En Dibe Kadar.mp3"),
    new Music("gel gor beni", "Baris Akarsu", "baris akarsu.jpg", "gel gor beni.mp3"),
    new Music("tepe tepe yaz", "Baris Akarsu", "baris akarsu.jpg", "tepe tepe yaz.mp3")

];
