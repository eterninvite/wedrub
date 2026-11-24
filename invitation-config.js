(function (global) {
  "use strict";

  /**
   * Configurația invitației de nuntă.
   * Editează acest obiect pentru a modifica textele, programul, locația, media și secțiunile vizibile.
   */
  var C = {
    slug: "ruby-hour",
    lang: "ro",
    themeColor: "#1a0207",
    couple: {
      bride: "Aurelia",
      groom: "Sebastian",
      initials: "A & S",
    },
    event: {
      start: "2027-06-12T16:00:00",
      end: "2027-06-12T20:00:00",
      title: "Aurelia & Sebastian · 12 Iunie 2027",
      dateShort: "12 06 2027",
      dateLong: "Sâmbătă, 12 Iunie 2027",
      dateNote: "întâmpinarea invitaților de la 17:30",
      namesAt: 2.2,
    },
    venue: {
      name: "Premium Park",
      address: "Premium Park",
      mapQuery: "Premium Park",
      image: "./assets/table-red.jpg",
      imageAlt: "O masă festivă luminată de lumânări",
      directionsLabel: "Obține indicații",
      how: [
        { title: "Cu mașina", text: "Parcare disponibilă la intrarea principală pe tot parcursul serii." },
        { title: "Cazare", text: "Avem camere rezervate pentru invitații noștri în apropiere." },
      ],
    },
    intro: {
      forText: "O invitație se ascunde sub sclipici",
      tapText: "Atinge sclipiciul",
      orText: "apasă de 3 ori pentru a deschide",
      together: "Împreună cu familiile lor",
      inviteLine: "vă invită să sărbătoriți nunta lor",
      video: "./assets/film-ruby2.mp4",
      decodeJson: "./assets/film-ruby2.json",
      firstFrame: "./assets/film-ruby-first.jpg",
      lastFrame: "./assets/film-ruby-last.jpg",
    },
    letter: {
      greeting: "Dragă familie și prieteni",
      message: "Ne-ar face o deosebită bucurie să sărbătorim această zi alături de voi.",
    },
    calendar: {
      heading: "Salvează data",
      subtitle: "Întoarce paginile până la ziua noastră",
      addLabel: "Adaugă în calendar",
    },
    programme: {
      heading: "Programul serii",
      subtitle: "Cum se va desfășura petrecerea",
      items: [
        { time: "16:00", title: "Întâmpinarea", detail: "Ne bucurăm să vă primim alături de noi" },
        { time: "19:30", title: "Cina festivă", detail: "O seară de neuitat împreună" },
      ],
    },
    dress: {
      heading: "Cod vestimentar",
      detail: "Ținută de seară",
      showFabrics: false,
      showPalette: false,
      fabrics: [
        { src: "./assets/silk.jpg", alt: "Satin bordeaux", caption: "Satin" },
        { src: "./assets/velvet.jpg", alt: "Catifea roșie", caption: "Catifea" },
        { src: "./assets/fabric-sequins.jpg", alt: "Paiete rubinii", caption: "Paiete" },
        { src: "./assets/fabric-pearls.jpg", alt: "Mătase ivoire cu perle", caption: "Perle" },
      ],
      palette: [
        { color: "#16060b", name: "Noapte" },
        { color: "#5a0814", name: "Bordeaux" },
        { color: "#a3172d", name: "Rubin" },
        { color: "#cfa56d", name: "Șampanie" },
        { color: "#e2bdb5", name: "Roz pudrat" },
      ],
    },
    wishes: {
      heading: "Câteva detalii",
      items: [
        { title: "Cadouri", text: "Prezența voastră este cel mai frumos cadou." },
        { title: "Copii", text: "Vă rugăm să ne anunțați dacă veniți însoțiți de cei mici." },
        { title: "Fotografii", text: "Fotografiile sunt binevenite pe tot parcursul evenimentului." },
        { title: "Contact", text: "Pentru orice detalii, ne puteți contacta oricând." },
      ],
    },
    faq: {
      heading: "Întrebări frecvente",
      items: [{ q: "Unde are loc evenimentul?", a: "Evenimentul are loc la Premium Park. Găsiți harta și indicațiile mai sus." }],
    },
    closing: {
      heading: "Până ne revedem",
      love: "Cu drag,",
    },
    rsvp: {
      enabled: false,
      demoOnly: true,
      heading: "Ne vei fi alături?",
      demoNote: "Răspunsul tău este salvat pe acest dispozitiv.",
    },
    sections: {
      letter: true,
      calendar: true,
      programme: true,
      venue: true,
      venueHow: false,
      dress: true,
      wishes: true,
      rsvp: false,
      faq: true,
      closing: true,
      dock: false,
    },
    music: {
      enabled: true,
      src: "./assets/demo-music.mp3",
      volume: 0.5,
    },
    ogImage: "./assets/film-ruby-first.jpg",
  };

  global.InvitationConfig = C;
})(window);
