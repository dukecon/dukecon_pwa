/* This should be a minimal conference to ease testing.
It could be extended to support different variants with differents sets of test data
(or even a builder) */

const data = {
  id: 'javaland2017',
  name: 'JavaLand 2017',
  url: 'http://javaland.dukecon.org/2017',
  homeUrl: 'http://www.javaland.eu',
  metaData: {
    audiences: [
      {
        id: '1',
        order: 1,
        names: {
          de: 'Anfänger',
          en: 'Beginners'
        },
        icon: 'audience_1.png'
      },
      {
        id: '2',
        order: 2,
        names: {
          de: 'Fortgeschritten',
          en: 'Advanced'
        },
        icon: 'audience_2.png'
      }
    ],
    eventTypes: [
      {
        id: '1',
        order: 1,
        names: {
          de: 'Best Practices',
          en: 'Best practices'
        },
        icon: 'eventType_1.png'
      },
      {
        id: '2',
        order: 2,
        names: {
          de: 'Community-Aktivität',
          en: 'Community Activity'
        },
        icon: 'eventType_2.png'
      },
      {
        id: '3',
        order: 3,
        names: {
          de: 'Neuerscheinung oder Feature',
          en: 'New release or feature'
        },
        icon: 'eventType_3.png'
      },
      {
        id: '4',
        order: 4,
        names: {
          de: 'Newcomer',
          en: 'newcomer'
        },
        icon: 'eventType_4.png'
      },
      {
        id: '5',
        order: 5,
        names: {
          de: 'Projektbericht',
          en: 'Project report'
        },
        icon: 'eventType_5.png'
      },
      {
        id: '6',
        order: 6,
        names: {
          de: 'Schulungstag',
          en: 'Training Day'
        },
        icon: 'eventType_6.png'
      },
      {
        id: '7',
        order: 7,
        names: {
          de: 'Tipps & Tricks',
          en: 'Tips & tricks'
        },
        icon: 'eventType_7.png'
      }
    ],
    languages: [
      {
        id: '1',
        code: 'de',
        order: 1,
        names: {
          de: 'Deutsch',
          en: 'German'
        },
        icon: 'language_de.png'
      },
      {
        id: '2',
        code: 'en',
        order: 2,
        names: {
          de: 'Englisch',
          en: 'English'
        },
        icon: 'language_en.png'
      }
    ],
    defaultLanguage: {
      id: '1',
      code: 'de',
      order: 1,
      names: {
        de: 'Deutsch',
        en: 'German'
      },
      icon: 'language_de.png'
    },
    tracks: [
      {
        id: '1',
        order: 1,
        names: {
          de: 'Enterprise Java & Cloud',
          en: 'Enterprise Java & Cloud'
        },
        icon: 'track_1.png'
      },
      {
        id: '10',
        order: 7,
        names: {
          de: 'Newcomer',
          en: 'Newcomer'
        },
        icon: 'track_7.png'
      }
    ],
    locations: [
      {
        id: '12',
        order: 2,
        names: {
          de: 'Wintergarten',
          en: 'Wintergarten'
        },
        icon: 'location_2.png',
        capacity: 850
      },
      {
        id: '13',
        order: 20,
        names: {
          de: 'Konfuzius (Hotel Ling Bao)',
          en: 'Konfuzius (Hotel Ling Bao)'
        },
        icon: 'location_20.png',
        capacity: 0
      },
      {
        id: '14',
        order: 3,
        names: {
          de: 'Schauspielhaus',
          en: 'Schauspielhaus'
        },
        icon: 'location_3.png',
        capacity: 460
      },
      {
        id: '15',
        order: 4,
        names: {
          de: 'Quantum 1+2',
          en: 'Quantum 1+2'
        },
        icon: 'location_4.png',
        capacity: 250
      },
      {
        id: '19',
        order: 8,
        names: {
          de: 'Quantum UG ',
          en: 'Quantum UG '
        },
        icon: 'location_8.png',
        capacity: 60
      }
    ],
    defaultIcon: 'Unknown.png'
  },
  events: [
    {
      id: '529268',
      htmlId: '529268',
      trackId: '1',
      audienceId: '1',
      typeId: '1',
      locationId: '12',
      startOfSlice: '2017-03-28T14:00:00',
      start: '2017-03-28T14:00:00',
      end: '2017-03-28T14:40:00',
      showInTimetable: true,
      title: 'Fallacies of Distributed Computing: What If Networks Fail?',
      speakerIds: [
        '364675',
        '375158'
      ],
      abstractText: 'Modern Software Architectures increasingly rely on the network for parts of applications to communicate with each other. In the minds of many software developers the network will never fail. But when L Peter Deutsch wrote the "Fallacies of Distributed Computing" paper back in 1994, he was probably never more right than today. \n\nOne of the hardest things when designing and testing for distributed failures is that most issues such as slow networks and lost packets will only be found in production environments. In this talk we will show you how to deal with distributed dependencies. We\'ll discuss setting and dealing with time-outs, connection monitoring, connection pooling, thread pools, queue sizes, and latency. Moreover we\'ll cover a strategy for improving fault tolerance in distributed architectures. \n\nThe topics covered are especially relevant if your application has a lot of dependencies that it communicates with over a network i.e. microservices. It is even more applicable if your application is deployed to an environment which is prone to failure on a regular basis e.g. a "cloud".',
      languageId: '2',
      demo: true,
      simultan: false,
      veryPopular: true,
      fullyBooked: false,
      numberOfFavorites: 0,
      documents: {
        slides: null,
        manuscript: null,
        other: null
      }
    },
    {
      id: '529697',
      trackId: '10',
      audienceId: '2',
      typeId: '4',
      locationId: '19',
      start: '2017-03-28T12:00:00',
      end: '2017-03-28T12:40:00',
      showInTimetable: true,
      title: 'Microservice-Anwendungen mit Docker',
      speakerIds: [
        '364068'
      ],
      abstractText: 'Docker ist ein ideales Werkzeug, den gesamten Entwicklungszyklus zu begleiten und einen weiteren Schritt in Richtung universell einsetzbare und verfügbare Anwendungen zu machen.\n\nVia Live-Demos wird anhand einer Spring-Cloud-Microservice-Anwendung der Einsatz der verschiedenen Docker-Tools in der Entwicklung, Integration und Betrieb gezeigt. Dabei wird auf Anforderungen einer verteilten Microservice-Architektur eingegangen und gezeigt, wie diese mit Docker und dem Spring Cloud/NetflixOSS Stack umgesetzt werden können.',
      languageId: '1',
      demo: true,
      simultan: false,
      veryPopular: true,
      fullyBooked: false,
      numberOfFavorites: 0,
      documents: {
        slides: null,
        manuscript: null,
        other: null
      }
    },
    {
      id: '529516',
      trackId: '2',
      audienceId: '2',
      typeId: '1',
      locationId: '15',
      start: '2017-03-29T12:00:00',
      end: '2017-03-29T12:40:00',
      showInTimetable: true,
      title: 'Everything as code',
      speakerIds: [
        '374893'
      ],
      abstractText: 'Zeitgemäße Entwickler müssen eine Vielzahl an Sprachen sicher beherrschen. Wir definieren unsere Entwicklungsumgebung mit Gradle, wir bauen unsere Software in Java, Kotlin oder sogar JavaScript. Wir verwenden Groovy und Scala, um unsere Software zu testen. Die Build-Pipeline wird per DSL und JSON definiert. Mit YAML und Python beschreiben wir die Infrastruktur und das Deployment unserer Anwendungen. Die Dokumentation unserer Architekturen erledigen wir mit AsciiDoc und JRuby. Willkommen in Babel! Hallo, Softwareindustrialisierung!\n\nUse the right tool for the job! Das ist das Motto dieser Session. Jede Sprache hat Stärken in einer bestimmten Domäne. Diese Stärken gilt es zu nutzen. Aber einfach blind jede gerade angesagte Sprache einzusetzen, ist sicherlich nicht die Lösung. Genau das versuchen wir mit dieser Session zu vermitteln. Stattdessen braucht es eine gut integrierte und abgestimmte Tool-Chain. Wir berichten aus der Praxis: What worked for us and what did not.',
      languageId: '1',
      demo: true,
      simultan: false,
      veryPopular: true,
      fullyBooked: false,
      numberOfFavorites: 0,
      documents: {
        slides: null,
        manuscript: null,
        other: null
      }
    }
  ],
  speakers: [
    {
      id: '364675',
      name: 'Bert Ertman',
      firstname: 'Bert',
      lastname: 'Ertman',
      company: 'Luminis',
      twitter: '@BertErtman',
      bio: 'Bert Ertman is a fellow at Luminis in the Netherlands. In addition to his day job he has served as the leader for NLJUG (4,000 members) for the past decade. A frequent speaker on Java and software architecture all over the world, he is also the author of Building Modular Cloud Applications with OSGi and a serial conference organizer. In 2008, Bert was honored with the coveted title of Java Champion by an international panel of Java leaders and luminaries. Bert Ertman is a JavaOne RockStar speaker and a Duke\'s Choice award winner.',
      eventIds: [
        '529268'
      ]
    },
    {
      id: '375158',
      name: 'Willem Dekker',
      firstname: 'Willem',
      lastname: 'Dekker',
      company: 'Luminis',
      linkedin: 'https://www.linkedin.com/in/willemjdekker/',
      bio: 'Willem is fascinated with computers as long as he can remember. He started coding when he was eight years old and began his professional career as a Full Stack developer in 2000. After 16 years he has built up a tremendous amount of experience in building enterprise systems for large and smaller companies. Willem favourite quote is: "Keep things as simple as possible, but no simpler". As a pragmatist, he is always seeking for the balance between quality, functionality and not to forget: fun!',
      eventIds: [
        '529268'
      ]
    },
    {
      id: '364068',
      name: 'Thomas Bauer',
      firstname: 'Thomas',
      lastname: 'Bauer',
      company: 'Xaidat GmbH',
      website: 'http://www.xaidat.com',
      twitter: 'https://twitter.com/_417',
      xing: 'https://www.xing.com/profile/Thomas_Bauer168',
      linkedin: 'https://www.linkedin.com/in/xaidat/',
      bio: 'Thomas Bauer started to program at the age of 9yrs and since them software development and engineering plays a big part in his life. | He started as a freelancer, worked for Google in CA, founded two software companies, audits and gives advice to companies about software engineering and speaks about technology related to the field.',
      eventIds: [
        '529697'
      ]
    }
  ]
}

export default {
  data
}
