export type Locale = 'en' | 'el'

export type Messages = {
  meta: {
    title: string
  }
  nav: {
    menu: string
    gallery: string
    visit: string
    contact: string
  }
  language: {
    label: string
    en: string
    el: string
  }
  loading: {
    refreshingRestaurantData: string
  }
  status: {
    usingFallbackContent: string
    apiSectionsUnavailable: string
    backendDataNotConfigured: string
    sections: Record<'restaurant' | 'menu' | 'gallery', string>
  }
  hero: {
    name: string
    location: string
    eyebrow: string
    title: (name: string) => string
    fallbackDescription: string
    callToBook: string
    openMap: string
    cardTitle: string
    cardDescription: string
  }
  highlights: {
    eyebrow: string
    title: string
    items: Array<{
      title: string
      text: string
    }>
  }
  story: {
    eyebrow: string
    title: string
    paragraphs: string[]
    infoTitle: string
    bullets: string[]
  }
  menu: {
    eyebrow: string
    title: string
    description: string
    seasonalSelection: string
    categories: Array<{
      id: string
      name: string
      slug: string
      items: Array<{
        id: string
        name: string
        description: string
        price: string
        featured: boolean
      }>
    }>
  }
  gallery: {
    eyebrow: string
    title: string
    defaultAlt: string
    defaultCaption: string
    items: Array<{
      id: string
      src: string
      alt: string
      caption: string
    }>
  }
  visit: {
    eyebrow: string
    title: string
    description: string
    contactTitle: string
    openingHoursTitle: string
  }
  contactForm: {
    eyebrow: string
    title: string
    fields: {
      name: string
      email: string
      message: string
    }
    placeholders: {
      name: string
      email: string
      message: string
    }
    actions: {
      send: string
      sending: string
      success: string
      genericError: string
    }
    validation: {
      nameTooShort: string
      invalidEmail: string
      messageTooShort: string
      messageTooLong: string
    }
  }
  hours: {
    days: Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', string>
    closed: string
    unavailable: string
  }
  fallback: {
    hero: {
      address: string
      mapQuery: string
      phone: string
    }
  }
}

const sharedGallerySources = [
  'https://images.pexels.com/photos/23466870/pexels-photo-23466870.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/34026509/pexels-photo-34026509.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/30167762/pexels-photo-30167762.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/18774938/pexels-photo-18774938.jpeg?auto=compress&cs=tinysrgb&w=1200',
] as const

export const messagesByLocale: Record<Locale, Messages> = {
  en: {
    meta: {
      title: 'To Kati Allo | Antissa, Lesvos',
    },
    nav: {
      menu: 'Menu',
      gallery: 'Gallery',
      visit: 'Visit',
      contact: 'Contact',
    },
    language: {
      label: 'Language',
      en: 'EN',
      el: 'EL',
    },
    loading: {
      refreshingRestaurantData: 'Refreshing restaurant data...',
    },
    status: {
      usingFallbackContent: 'Using fallback content.',
      apiSectionsUnavailable: 'API sections unavailable',
      backendDataNotConfigured: 'Backend data is not fully configured yet.',
      sections: {
        restaurant: 'restaurant',
        menu: 'menu',
        gallery: 'gallery',
      },
    },
    hero: {
      name: "To Kati Allo",
      location: 'Antissa, Lesvos',
      eyebrow: 'Restaurant and cafe in the main square',
      title: (name) => `${name} in Antissa, Lesvos`,
      fallbackDescription:
        'To Kati Allo brings together grilled meats, meze, daily cooked food, and a relaxed village rhythm in western Lesvos.',
      callToBook: 'Call to book',
      openMap: 'Open map',
      cardTitle: 'House profile',
      cardDescription:
        'Greek and Mediterranean food with village-square pacing and a western Lesvos setting.',
    },
    highlights: {
      eyebrow: 'Why come here',
      title: 'A real restaurant front, not a starter template with restaurant copy pasted on top.',
      items: [
        {
          title: 'Main square setting',
          text: 'In Antissa, the terrace belongs to the rhythm of the village rather than to a tourist script.',
        },
        {
          title: 'Greek food that makes sense here',
          text: 'Meze, grilled meats, daily pots, and generous portions fit the place better than trendy reinvention.',
        },
        {
          title: 'Useful stop in western Lesvos',
          text: 'The restaurant works equally well after the coast, between villages, or as a late dinner stop.',
        },
      ],
    },
    story: {
      eyebrow: 'The setting',
      title: 'Antissa stays grounded in local life, and the restaurant should feel the same way.',
      paragraphs: [
        'The village square is one of the strongest reasons to stop in western Lesvos: plane trees, slower evenings, and a terrace culture that still feels local.',
        'This frontend uses that context properly instead of shipping another empty starter page. It renders backend content when available, but keeps the site complete when data has not been seeded yet.',
      ],
      infoTitle: 'Good to know',
      bullets: [
        'Mediterranean and Greek cuisine',
        'Breakfast, lunch, and dinner service',
        'Vegetarian-friendly small plates and sides',
        'Useful stop for exploring western Lesvos villages',
      ],
    },
    menu: {
      eyebrow: 'Menu',
      title: 'Structured menu data, rendered as categories instead of hardcoded static cards.',
      description:
        'If the backend menu exists, this section uses it. Otherwise the site falls back to curated sample dishes.',
      seasonalSelection: 'Seasonal house selection.',
      categories: [
        {
          id: 'meze',
          name: 'Meze to Share',
          slug: 'meze',
          items: [
            {
              id: 'meze-board',
              name: 'Antissa meze board',
              description:
                'Tzatziki, feta, olives, roasted peppers, village bread, and seasonal small plates.',
              price: '14.00',
              featured: true,
            },
            {
              id: 'vine-leaves',
              name: 'Stuffed vine leaves',
              description: 'Hand-rolled dolmadakia with lemon and herbs.',
              price: '7.00',
              featured: false,
            },
            {
              id: 'saganaki',
              name: 'Fried saganaki',
              description: 'Golden cheese with thyme honey and sesame.',
              price: '8.00',
              featured: false,
            },
          ],
        },
        {
          id: 'grill',
          name: 'From the Grill',
          slug: 'grill',
          items: [
            {
              id: 'paidakia',
              name: 'Paidakia',
              description: 'Char-grilled lamb chops with lemon, oregano, and hand-cut potatoes.',
              price: '17.00',
              featured: true,
            },
            {
              id: 'pork-souvlaki',
              name: 'Village pork souvlaki',
              description: 'Skewers with tomato, onion, pita, and mustard sauce.',
              price: '13.00',
              featured: false,
            },
            {
              id: 'mixed-grill',
              name: 'Mixed grill for two',
              description: 'Lamb, pork, sausage, chicken, fries, and grilled vegetables.',
              price: '28.00',
              featured: true,
            },
          ],
        },
        {
          id: 'daily',
          name: 'Cooked Daily',
          slug: 'daily',
          items: [
            {
              id: 'moussaka',
              name: 'Moussaka',
              description: 'Slow-baked layers of aubergine, potato, minced meat, and bechamel.',
              price: '12.00',
              featured: false,
            },
            {
              id: 'giouvetsi',
              name: 'Giouvetsi',
              description: 'Braised beef with orzo, tomato, and kefalotyri.',
              price: '14.00',
              featured: false,
            },
            {
              id: 'briam',
              name: 'Vegetable briam',
              description: 'Oven-roasted summer vegetables with Lesvos olive oil.',
              price: '10.00',
              featured: false,
            },
          ],
        },
      ],
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'Visuals are handled as data too, with backend images preferred when present.',
      defaultAlt: 'To Kati Allo gallery image',
      defaultCaption: 'From the restaurant gallery.',
      items: [
        {
          id: 'gallery-1',
          src: sharedGallerySources[0],
          alt: 'Blue tables outside a Greek taverna by the sea',
          caption: 'Bright island colors and a relaxed taverna setting.',
        },
        {
          id: 'gallery-2',
          src: sharedGallerySources[1],
          alt: 'Greek meze platter with pita, dips, and salad',
          caption: 'Meze built for sharing with bread, dips, and fresh salad.',
        },
        {
          id: 'gallery-3',
          src: sharedGallerySources[2],
          alt: 'Outdoor Greek cafe with white tables and flowers',
          caption: 'A courtyard feel that fits a village meal in Lesvos.',
        },
        {
          id: 'gallery-4',
          src: sharedGallerySources[3],
          alt: 'White waterfront Greek taverna near fishing boats',
          caption: 'Aegean light, white walls, and tables that keep you sitting.',
        },
      ],
    },
    visit: {
      eyebrow: 'Plan your stop',
      title: 'Visit To Kati Allo in the center of Antissa.',
      description:
        'Contact links are real interactive elements, opening hours are structured data, and the section is usable on mobile instead of being decorative filler.',
      contactTitle: 'Contact',
      openingHoursTitle: 'Opening hours',
    },
    contactForm: {
      eyebrow: 'Contact form',
      title: 'This form actually validates input and posts to the backend contact endpoint.',
      fields: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
      },
      placeholders: {
        name: 'Your name',
        email: 'you@example.com',
        message: 'Ask about reservations, timings, or group dining.',
      },
      actions: {
        send: 'Send message',
        sending: 'Sending...',
        success: 'Message sent successfully.',
        genericError: 'Something went wrong while sending the message.',
      },
      validation: {
        nameTooShort: 'Name is too short.',
        invalidEmail: 'Enter a valid email address.',
        messageTooShort: 'Message must be at least 10 characters.',
        messageTooLong: 'Message is too long.',
      },
    },
    hours: {
      days: {
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday',
      },
      closed: 'Closed',
      unavailable: 'Hours unavailable',
    },
    fallback: {
      hero: {
        address: 'ΤΟ ΚΑΤΙ ΑΛΛΟ, Άντισσα 811 03',
        mapQuery: 'ΤΟ ΚΑΤΙ ΑΛΛΟ, Άντισσα 811 03',
        phone: '+30 22530 56636',
      },
    },
  },
  el: {
    meta: {
      title: 'Το Κάτι Άλλο | Άντισσα, Λέσβος',
    },
    nav: {
      menu: 'Μενού',
      gallery: 'Φωτογραφίες',
      visit: 'Επίσκεψη',
      contact: 'Επικοινωνία',
    },
    language: {
      label: 'Γλώσσα',
      en: 'EN',
      el: 'EL',
    },
    loading: {
      refreshingRestaurantData: 'Ανανέωση στοιχείων εστιατορίου...',
    },
    status: {
      usingFallbackContent: 'Χρησιμοποιείται εφεδρικό περιεχόμενο.',
      apiSectionsUnavailable: 'Μη διαθέσιμες ενότητες API',
      backendDataNotConfigured: 'Τα δεδομένα του backend δεν έχουν ρυθμιστεί πλήρως ακόμη.',
      sections: {
        restaurant: 'εστιατόριο',
        menu: 'μενού',
        gallery: 'φωτογραφίες',
      },
    },
    hero: {
      name: "Το Κάτι Άλλο",
      location: 'Άντισσα, Λέσβος',
      eyebrow: 'Εστιατόριο και καφέ στην κεντρική πλατεία',
      title: (name) => `${name} στην Άντισσα, Λέσβος`,
      fallbackDescription:
        'Το Κάτι Άλλο συνδυάζει κρεατικά στη σχάρα, μεζέδες, μαγειρευτά ημέρας και τον χαλαρό ρυθμό του δυτικού τμήματος της Λέσβου.',
      callToBook: 'Καλέστε για κράτηση',
      openMap: 'Άνοιγμα χάρτη',
      cardTitle: 'Προφίλ χώρου',
      cardDescription:
        'Ελληνική και μεσογειακή κουζίνα με ρυθμό πλατείας χωριού και ατμόσφαιρα δυτικής Λέσβου.',
    },
    highlights: {
      eyebrow: 'Γιατί να έρθετε',
      title: 'Ένα αληθινό restaurant frontend, όχι ένα starter template με πρόχειρο κείμενο.',
      items: [
        {
          title: 'Σκηνικό πλατείας',
          text: 'Στην Άντισσα, η βεράντα ανήκει στον ρυθμό του χωριού και όχι σε ένα τουριστικό στερεότυπο.',
        },
        {
          title: 'Φαγητό που ταιριάζει στον τόπο',
          text: 'Μεζέδες, σχάρα, μαγειρευτά και γενναιόδωρες μερίδες ταιριάζουν περισσότερο εδώ από μια δήθεν μοντέρνα προσέγγιση.',
        },
        {
          title: 'Χρήσιμη στάση στη δυτική Λέσβο',
          text: 'Το εστιατόριο λειτουργεί το ίδιο καλά μετά την παραλία, ανάμεσα σε χωριά ή για βραδινό αργότερα.',
        },
      ],
    },
    story: {
      eyebrow: 'Το μέρος',
      title: 'Η Άντισσα παραμένει δεμένη με την τοπική ζωή και το εστιατόριο πρέπει να το αποτυπώνει.',
      paragraphs: [
        'Η πλατεία του χωριού είναι ένας από τους καλύτερους λόγους για στάση στη δυτική Λέσβο: πλατάνια, πιο αργοί ρυθμοί και μια κουλτούρα τραπεζιού που παραμένει τοπική.',
        'Αυτό το frontend αξιοποιεί σωστά αυτό το πλαίσιο αντί να παραδίδει άλλη μία άδεια αρχική εφαρμογή. Όταν υπάρχουν δεδομένα από το backend τα εμφανίζει, και όταν δεν υπάρχουν κρατά τον ιστότοπο ολοκληρωμένο.',
      ],
      infoTitle: 'Χρήσιμες πληροφορίες',
      bullets: [
        'Μεσογειακή και ελληνική κουζίνα',
        'Σέρβις για πρωινό, μεσημεριανό και βραδινό',
        'Επιλογές μεζέδων και συνοδευτικών για χορτοφάγους',
        'Καλή στάση για εξερεύνηση των χωριών της δυτικής Λέσβου',
      ],
    },
    menu: {
      eyebrow: 'Μενού',
      title: 'Δομημένα δεδομένα μενού, αποδοσμένα ως κατηγορίες αντί για στατικές hardcoded κάρτες.',
      description:
        'Αν υπάρχει μενού στο backend, αυτή η ενότητα το χρησιμοποιεί. Διαφορετικά η σελίδα πέφτει σε επιλεγμένα δείγματα πιάτων.',
      seasonalSelection: 'Επιλογή κουζίνας ανάλογα με την εποχή.',
      categories: [
        {
          id: 'meze',
          name: 'Μεζέδες για Μοίρασμα',
          slug: 'meze',
          items: [
            {
              id: 'meze-board',
              name: 'Ποικιλία μεζέ Άντισσας',
              description:
                'Τζατζίκι, φέτα, ελιές, ψητές πιπεριές, χωριάτικο ψωμί και εποχιακά μικρά πιάτα.',
              price: '14.00',
              featured: true,
            },
            {
              id: 'vine-leaves',
              name: 'Ντολμαδάκια',
              description: 'Χειροποίητα ντολμαδάκια με λεμόνι και μυρωδικά.',
              price: '7.00',
              featured: false,
            },
            {
              id: 'saganaki',
              name: 'Σαγανάκι',
              description: 'Χρυσαφένιο τυρί με θυμαρίσιο μέλι και σουσάμι.',
              price: '8.00',
              featured: false,
            },
          ],
        },
        {
          id: 'grill',
          name: 'Στη Σχάρα',
          slug: 'grill',
          items: [
            {
              id: 'paidakia',
              name: 'Παϊδάκια',
              description: 'Αρνίσια παϊδάκια στη σχάρα με λεμόνι, ρίγανη και χειροποίητες πατάτες.',
              price: '17.00',
              featured: true,
            },
            {
              id: 'pork-souvlaki',
              name: 'Χωριάτικο χοιρινό σουβλάκι',
              description: 'Σουβλάκια με ντομάτα, κρεμμύδι, πίτα και σάλτσα μουστάρδας.',
              price: '13.00',
              featured: false,
            },
            {
              id: 'mixed-grill',
              name: 'Ποικιλία σχάρας για δύο',
              description: 'Αρνί, χοιρινό, λουκάνικο, κοτόπουλο, πατάτες και ψητά λαχανικά.',
              price: '28.00',
              featured: true,
            },
          ],
        },
        {
          id: 'daily',
          name: 'Μαγειρευτά Ημέρας',
          slug: 'daily',
          items: [
            {
              id: 'moussaka',
              name: 'Μουσακάς',
              description: 'Αργοψημένα στρώματα μελιτζάνας, πατάτας, κιμά και μπεσαμέλ.',
              price: '12.00',
              featured: false,
            },
            {
              id: 'giouvetsi',
              name: 'Γιουβέτσι',
              description: 'Μοσχάρι κοκκινιστό με κριθαράκι, ντομάτα και κεφαλοτύρι.',
              price: '14.00',
              featured: false,
            },
            {
              id: 'briam',
              name: 'Μπριάμ λαχανικών',
              description: 'Λαχανικά φούρνου με ελαιόλαδο Λέσβου.',
              price: '10.00',
              featured: false,
            },
          ],
        },
      ],
    },
    gallery: {
      eyebrow: 'Φωτογραφίες',
      title: 'Οι εικόνες αντιμετωπίζονται επίσης ως δεδομένα, με προτεραιότητα στις εικόνες του backend όταν υπάρχουν.',
      defaultAlt: 'Εικόνα γκαλερί του Το Κάτι Άλλο',
      defaultCaption: 'Από τη γκαλερί του εστιατορίου.',
      items: [
        {
          id: 'gallery-1',
          src: sharedGallerySources[0],
          alt: 'Μπλε τραπέζια έξω από ελληνική ταβέρνα δίπλα στη θάλασσα',
          caption: 'Νησιώτικα χρώματα και χαλαρή ατμόσφαιρα ταβέρνας.',
        },
        {
          id: 'gallery-2',
          src: sharedGallerySources[1],
          alt: 'Ποικιλία ελληνικών μεζέδων με πίτα, ντιπ και σαλάτα',
          caption: 'Μεζέδες για μοίρασμα με ψωμί, ντιπ και φρέσκια σαλάτα.',
        },
        {
          id: 'gallery-3',
          src: sharedGallerySources[2],
          alt: 'Υπαίθριο ελληνικό καφέ με λευκά τραπέζια και λουλούδια',
          caption: 'Αίσθηση αυλής που ταιριάζει σε γεύμα χωριού στη Λέσβο.',
        },
        {
          id: 'gallery-4',
          src: sharedGallerySources[3],
          alt: 'Λευκή παραθαλάσσια ελληνική ταβέρνα δίπλα σε ψαρόβαρκες',
          caption: 'Αιγαιοπελαγίτικο φως, λευκοί τοίχοι και τραπέζια που σε κρατούν.',
        },
      ],
    },
    visit: {
      eyebrow: 'Οργανώστε τη στάση σας',
      title: 'Επισκεφθείτε το Το Κάτι Άλλο στο κέντρο της Άντισσας.',
      description:
        'Οι σύνδεσμοι επικοινωνίας είναι πραγματικά διαδραστικοί, το ωράριο είναι δομημένα δεδομένα και η ενότητα είναι χρήσιμη στο κινητό αντί να είναι διακοσμητική.',
      contactTitle: 'Επικοινωνία',
      openingHoursTitle: 'Ώρες λειτουργίας',
    },
    contactForm: {
      eyebrow: 'Φόρμα επικοινωνίας',
      title: 'Αυτή η φόρμα κάνει πραγματικό έλεγχο και στέλνει δεδομένα στο contact endpoint του backend.',
      fields: {
        name: 'Όνομα',
        email: 'Email',
        message: 'Μήνυμα',
      },
      placeholders: {
        name: 'Το όνομά σας',
        email: 'you@example.com',
        message: 'Ρωτήστε για κρατήσεις, ώρες ή γεύματα για παρέες.',
      },
      actions: {
        send: 'Αποστολή μηνύματος',
        sending: 'Αποστολή...',
        success: 'Το μήνυμα στάλθηκε με επιτυχία.',
        genericError: 'Κάτι πήγε στραβά κατά την αποστολή του μηνύματος.',
      },
      validation: {
        nameTooShort: 'Το όνομα είναι πολύ μικρό.',
        invalidEmail: 'Δώστε έγκυρη διεύθυνση email.',
        messageTooShort: 'Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες.',
        messageTooLong: 'Το μήνυμα είναι πολύ μεγάλο.',
      },
    },
    hours: {
      days: {
        mon: 'Δευτέρα',
        tue: 'Τρίτη',
        wed: 'Τετάρτη',
        thu: 'Πέμπτη',
        fri: 'Παρασκευή',
        sat: 'Σάββατο',
        sun: 'Κυριακή',
      },
      closed: 'Κλειστά',
      unavailable: 'Μη διαθέσιμο ωράριο',
    },
    fallback: {
      hero: {
        address: 'ΤΟ ΚΑΤΙ ΑΛΛΟ, Άντισσα 811 03',
        mapQuery: 'ΤΟ ΚΑΤΙ ΑΛΛΟ, Άντισσα 811 03',
        phone: '+30 22530 56636',
      },
    },
  },
}
