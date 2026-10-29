// Contenu par défaut du site. Le dashboard (/admin) enregistre une version modifiée,
// chargée par le site depuis /api/content ; ces valeurs servent si rien n'a été enregistré.
// schedule : 0 = dimanche ; [ouverture, fermeture] en heures, null = fermé.
// closures : fermetures exceptionnelles { date: 'AAAA-MM-JJ', note }.
window.CRISTAL_DEFAULTS = {
  slides: [
    { src: 'images/hero-sauna.webp', alt: 'Le sauna en bois', caption: 'Le sauna' },
    { src: 'images/hero-table.webp', alt: 'La table de gommage préparée avec bougies et serviettes', caption: 'La table de gommage' },
    { src: 'images/hero-bain-vapeur.webp', alt: 'Le bain vapeur en mosaïque bleue', caption: 'Le bain vapeur' },
    { src: 'images/hero-voute.webp', alt: 'Le hammam sous sa voûte, vasques et robinets dorés', caption: 'Sous la voûte' }
  ],
  rituals: [
    { id: 'r1', name: 'Éclat d\'Azur', items: ['Hammam', 'Savon noir', 'Gommage au gant kassa'], price: 38 },
    { id: 'r2', name: 'Le Secret Berbère', items: ['Hammam', 'Gommage Tébrima', 'Huile corps'], price: 40 },
    { id: 'r3', name: 'Détente', items: ['Hammam', 'Gommage savon noir', 'Massage relaxant 30 min'], price: 78 },
    { id: 'r4', name: 'Cristal d\'Azur', items: ['Hammam', 'Gommage savon noir', 'Enveloppement', 'Soin visage', 'Massage 30 min'], price: 138 },
    { id: 'r5', name: 'Hammam à l\'Aaroussa', items: ['Hammam', 'Gommage savon noir', 'Tébrimat Aaroussa', 'Soin visage', 'Massage relaxant 1 h'], price: 150 }
  ],
  tabsData: [
    { id: 'hammam', label: 'Hammam', groups: [
      { title: 'Entrée', note: 'Accès au hammam, au sauna et au bain vapeur', items: [ { n: 'Entrée hammam', d: 'Hammam · Sauna · Bain vapeur', p: '25 €' } ] },
      { title: 'À la carte', note: 'En complément de votre entrée', items: [ { n: 'Savon noir', p: '5 €' }, { n: 'Gommage « Kiassa »', p: '8 €' }, { n: 'Gommage Cristal d\'Azur', d: 'Au choix : café, lavande ou argile', p: '20 €' } ] },
      { title: 'Massage', note: 'En cabine privée', items: [ { n: 'Massage relaxant', d: 'Aux huiles', p: '40 €' } ] }
    ] },
    { id: 'visage', label: 'Visage & épilation', groups: [
      { title: 'Soin du visage', items: [ { n: 'Soin du visage complet', d: 'Gommage, vapeur, extraction des points noirs et modelage', p: '40 €' } ] },
      { title: 'Épilation du visage', note: 'À la cire orientale faite maison ou à la cire d\'institut', items: [ { n: 'Sourcils', p: '10 €' }, { n: 'Lèvres', p: '8 €' }, { n: 'Menton', p: '8 €' }, { n: 'Visage complet', p: '25 €' } ] },
      { title: 'Épilation du corps', note: 'À la cire orientale faite maison ou à la cire d\'institut', items: [ { n: 'Aisselles', p: '10 €' }, { n: 'Avant-bras', p: '10 €' }, { n: 'Bras complets', p: '15 €' }, { n: 'Demi-jambes', p: '15 €' }, { n: 'Jambes complètes', p: '20 €' }, { n: 'Maillot classique', p: '15 €' }, { n: 'Maillot intégral', p: '25 €' }, { n: 'Ventre', p: '10 €' }, { n: 'Bas du dos', p: '10 €' }, { n: 'Dos complet', p: '20 €' } ] }
    ] },
    { id: 'regard', label: 'Regard & sourcils', groups: [
      { title: 'Beauté du regard', items: [ { n: 'Teinture au henné + épilation des sourcils', p: '25 €' }, { n: 'Rehaussement des cils', p: '40 €' }, { n: 'Rehaussement des cils + teinture', p: '45 €' }, { n: 'Brow lift', p: '30 €' }, { n: 'Brow lift + teinture', p: '35 €' } ] },
      { title: 'Sourcils & maquillage semi-permanent', items: [ { n: 'Maquillage semi-permanent', p: '180 €' }, { n: 'Technique électrique', p: '180 €' }, { n: 'Microblading poil à poil', p: '180 €' }, { n: 'Candy lips', p: '180 €' }, { n: 'Retouches de finition', p: '50 €' }, { n: 'Retouche à 3 mois', p: '50 €' } ] }
    ] },
    { id: 'mains', label: 'Onglerie', groups: [
      { title: 'Soins des mains & des pieds', items: [ { n: 'Beauté des mains', d: 'Manucure', p: '15 €' }, { n: 'Beauté des pieds', d: 'Pédicure', p: '20 €' }, { n: 'Callus peeling', d: 'Soin anti-callosités', p: '35 €' } ] },
      { title: 'Vernis', items: [ { n: 'Vernis semi-permanent', p: '25 €' }, { n: 'Dépose de vernis semi-permanent', p: '5 €' } ] }
    ] },
    { id: 'coiffure', label: 'Coiffure', hair: [
      { title: 'Services & coiffage', rows: [ ['Shampooing + soin', '5 €', '5 €', '5 €'], ['Shampooing + brushing', '15 €', '15 €', '15 €'], ['Shampooing + coupe + séchage', '20 €', '20 €', '20 €'], ['Shampooing + coupe + brushing', '35 €', '35 €', '40 €'], ['Coupe enfant + brushing', '10 €', '10 €', '20 €'] ] },
      { title: 'Couleur, balayage & permanente', rows: [ ['Couleur racines + shampooing + brushing', '35 €', '35 €', '40 €', 'Racines de 1,5 à 2 cm'], ['Supplément couleur', '10 €', '10 €', '10 €'], ['Couleur tête entière + shampooing + brushing', '40 €', '50 €', '60 €'], ['Patine / gloss / rinçage', '20 €', '20 €', '30 €'], ['Balayage + shampooing + brushing', '40 €', '60 €', '80 – 150 €'], ['Ombré hair + shampooing + brushing', '40 €', '60 €', '80 – 150 €'], ['Flash balayage + shampooing + brushing', '40 €', '60 €', '80 – 150 €'], ['Permanente + shampooing + coupe + brushing', '60 €', '80 €', '120 €'] ] },
      { title: 'Lissage & botox', rows: [ ['Lissage brésilien, protéines ou indien', '50 €', '80 €', '120 €'], ['Botox capillaire / soin', '35 €', '35 €', '40 €'] ] }
    ] }
  ],
  bookData: [
    { label: 'Hammam', options: [ { id: 'entree', label: 'Entrée hammam · sauna · bain vapeur', price: '25 €' } ] },
    { label: 'Rituels', options: [] },
    { label: 'Massage', options: [ { id: 'massage', label: 'Massage relaxant', price: '40 €' } ] },
    { label: 'Esthétique', options: [ { id: 'visage', label: 'Soin du visage', price: '40 €' }, { id: 'epilation', label: 'Épilation (visage ou corps)', price: 'dès 8 €' }, { id: 'regard', label: 'Beauté du regard', price: 'dès 25 €' }, { id: 'sourcils', label: 'Sourcils & maquillage semi-permanent', price: 'dès 50 €' } ] },
    { label: 'Onglerie', options: [ { id: 'manucure', label: 'Beauté des mains (manucure)', price: '15 €' }, { id: 'pedicure', label: 'Beauté des pieds (pédicure)', price: '20 €' }, { id: 'vernis', label: 'Vernis semi-permanent', price: '25 €' } ] },
    { label: 'Coiffure', options: [ { id: 'coupe', label: 'Coupe & brushing', price: 'dès 15 €' }, { id: 'couleur', label: 'Couleur, balayage, permanente', price: 'dès 20 €' }, { id: 'lissage', label: 'Lissage ou botox capillaire', price: 'dès 35 €' } ] }
  ],
  spaces: [
    { title: 'Massage', img: 'images/massage.webp', alt: 'La cabine de massage et ses outils en bois', desc: 'Massage relaxant aux huiles dans une cabine calme et privée.', from: '40 €', service: 'massage', tab: 'hammam' },
    { title: 'Esthétique', img: 'images/esthetique.webp', alt: 'La cabine d\'esthétique', desc: 'Soin du visage, épilation à la cire orientale maison, regard et sourcils.', from: 'dès 8 €', service: 'visage', tab: 'visage' },
    { title: 'Onglerie', img: 'images/onglerie.webp', alt: 'Le poste d\'onglerie et ses vernis', desc: 'Manucure, pédicure, callus peeling et vernis semi-permanent.', from: 'dès 15 €', service: 'manucure', tab: 'mains' },
    { title: 'Coiffure', img: 'images/coiffure.webp', alt: 'Le salon de coiffure, ses miroirs lumineux et son bar à couleurs', desc: 'Coupe, brushing, couleur, balayage, lissage et botox capillaire.', from: 'dès 5 €', service: 'coupe', tab: 'coiffure' }
  ],
  photos: [
    { src: 'images/hammam-voute.webp', alt: 'Le hammam sous sa voûte, vasques et robinets dorés', cls: 'big' },
    { src: 'images/hammam-arche.webp', alt: 'Vasques en marbre et passage voûté', cls: '' },
    { src: 'images/bain-vapeur.webp', alt: 'Bain vapeur en mosaïque bleue', cls: '' },
    { src: 'images/sauna.webp', alt: 'Sauna en bois', cls: '' },
    { src: 'images/massage-cabine.webp', alt: 'La cabine de massage', cls: '' },
    { src: 'images/onglerie.webp', alt: 'Le poste d\'onglerie', cls: '' },
    { src: 'images/esthetique.webp', alt: 'La cabine d\'esthétique', cls: '' },
    { src: 'images/vestiaire.webp', alt: 'Vestiaires et espace détente', cls: '' },
    { src: 'images/facade.webp', alt: 'La devanture rue Loubon', cls: '' }
  ],
  schedule: [
    { f: [9, 17], h: [18, 23] },
    { f: [9, 17], h: [18, 23] },
    { f: null, h: [10, 23] },
    { f: [9, 17], h: [18, 23] },
    { f: [9, 17], h: [18, 23] },
    { f: [12, 22], h: null },
    { f: [9, 17], h: [18, 23] }
  ],
  closures: []
};
