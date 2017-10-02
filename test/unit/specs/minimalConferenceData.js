/* This should be a minimal conference to ease testing.
It could be extended to support different variants with differents sets of test data
(or even a builder) */

const data = {
  'id': 'javaland2017',
  'name': 'JavaLand 2017',
  'url': 'http://javaland.dukecon.org/2017',
  'homeUrl': 'http://www.javaland.eu',
  'metaData': {
    'audiences': [
      {
        'id': '1',
        'order': 1,
        'names': {
          'de': 'Anfänger',
          'en': 'Beginners'
        },
        'icon': 'audience_1.png'
      },
      {
        'id': '2',
        'order': 2,
        'names': {
          'de': 'Fortgeschritten',
          'en': 'Advanced'
        },
        'icon': 'audience_2.png'
      }
    ],
    'eventTypes': [
      {
        'id': '1',
        'order': 1,
        'names': {
          'de': 'Best Practices',
          'en': 'Best practices'
        },
        'icon': 'eventType_1.png'
      },
      {
        'id': '2',
        'order': 2,
        'names': {
          'de': 'Community-Aktivität',
          'en': 'Community Activity'
        },
        'icon': 'eventType_2.png'
      },
      {
        'id': '3',
        'order': 3,
        'names': {
          'de': 'Neuerscheinung oder Feature',
          'en': 'New release or feature'
        },
        'icon': 'eventType_3.png'
      },
      {
        'id': '4',
        'order': 4,
        'names': {
          'de': 'Newcomer',
          'en': 'newcomer'
        },
        'icon': 'eventType_4.png'
      },
      {
        'id': '5',
        'order': 5,
        'names': {
          'de': 'Projektbericht',
          'en': 'Project report'
        },
        'icon': 'eventType_5.png'
      },
      {
        'id': '6',
        'order': 6,
        'names': {
          'de': 'Schulungstag',
          'en': 'Training Day'
        },
        'icon': 'eventType_6.png'
      },
      {
        'id': '7',
        'order': 7,
        'names': {
          'de': 'Tipps & Tricks',
          'en': 'Tips & tricks'
        },
        'icon': 'eventType_7.png'
      }
    ],
    'languages': [
      {
        'id': '1',
        'code': 'de',
        'order': 1,
        'names': {
          'de': 'Deutsch',
          'en': 'German'
        },
        'icon': 'language_de.png'
      },
      {
        'id': '2',
        'code': 'en',
        'order': 2,
        'names': {
          'de': 'Englisch',
          'en': 'English'
        },
        'icon': 'language_en.png'
      }
    ],
    'defaultLanguage': {
      'id': '1',
      'code': 'de',
      'order': 1,
      'names': {
        'de': 'Deutsch',
        'en': 'German'
      },
      'icon': 'language_de.png'
    },
    'tracks': [
      {
        'id': '1',
        'order': 1,
        'names': {
          'de': 'Enterprise Java & Cloud',
          'en': 'Enterprise Java & Cloud'
        },
        'icon': 'track_1.png'
      },
      {
        'id': '2',
        'order': 1,
        'names': {
          'de': 'Core Java & JVM-Sprachen',
          'en': 'Core Java & JVM-Languages'
        },
        'icon': 'track_1.png'
      },
      {
        'id': '3',
        'order': 1,
        'names': {
          'de': 'Frontend & Mobile Computing ',
          'en': 'Frontend & Mobile Computing '
        },
        'icon': 'track_1.png'
      },
      {
        'id': '4',
        'order': 1,
        'names': {
          'de': 'IDE & Tools',
          'en': 'IDE & Tools'
        },
        'icon': 'track_1.png'
      },
      {
        'id': '5',
        'order': 1,
        'names': {
          'de': 'Container und Microservices',
          'en': 'Container and Microservices'
        },
        'icon': 'track_1.png'
      },
      {
        'id': '6',
        'order': 1,
        'names': {
          'de': 'Architektur & Sicherheit',
          'en': 'architecture & security '
        },
        'icon': 'track_1.png'
      },
      {
        'id': '7',
        'order': 1,
        'names': {
          'de': 'Internet der Dinge',
          'en': 'Internet of Things'
        },
        'icon': 'track_1.png'
      },
      {
        'id': '8',
        'order': 1,
        'names': {
          'de': 'Enterprise Java',
          'en': 'Enterprise Java'
        },
        'icon': 'track_1.png'
      },
      {
        'id': '9',
        'order': 1,
        'names': {
          'de': 'JVM-Sprachen',
          'en': 'JVM Languages'
        },
        'icon': 'track_1.png'
      },
      {
        'id': '10',
        'order': 7,
        'names': {
          'de': 'Newcomer',
          'en': 'Newcomer'
        },
        'icon': 'track_7.png'
      },
      {
        'id': '11',
        'order': 8,
        'names': {
          'de': 'Java EE - Early Adopters',
          'en': 'Java EE - Early Adopters'
        },
        'icon': 'track_8.png'
      }
    ],
    'locations': [
      {
        'id': '1',
        'order': 1,
        'names': {
          'de': 'Silverado Theater',
          'en': 'Silverado Theater'
        },
        'icon': 'location_1.png',
        'capacity': 1000
      },
      {
        'id': '2',
        'order': 10,
        'names': {
          'de': 'JUG-Café',
          'en': 'JUG-Café'
        },
        'icon': 'location_10.png',
        'capacity': 0
      },
      {
        'id': '3',
        'order': 11,
        'names': {
          'de': 'Workshop-Raum Juno',
          'en': 'Workshop-Raum Juno'
        },
        'icon': 'location_11.png',
        'capacity': 0
      },
      {
        'id': '4',
        'order': 12,
        'names': {
          'de': 'JavaInnovationLab',
          'en': 'JavaInnovationLab'
        },
        'icon': 'location_12.png',
        'capacity': 0
      },
      {
        'id': '5',
        'order': 13,
        'names': {
          'de': 'Quantum 1',
          'en': 'Quantum 1'
        },
        'icon': 'location_13.png',
        'capacity': 0
      },
      {
        'id': '6',
        'order': 14,
        'names': {
          'de': 'Quantum 2',
          'en': 'Quantum 2'
        },
        'icon': 'location_14.png',
        'capacity': 0
      },
      {
        'id': '7',
        'order': 15,
        'names': {
          'de': 'Quantum 3',
          'en': 'Quantum 3'
        },
        'icon': 'location_15.png',
        'capacity': 0
      },
      {
        'id': '8',
        'order': 16,
        'names': {
          'de': 'Quantum 4',
          'en': 'Quantum 4'
        },
        'icon': 'location_16.png',
        'capacity': 0
      },
      {
        'id': '9',
        'order': 17,
        'names': {
          'de': 'Dambali (Hotel Matamba)',
          'en': 'Dambali (Hotel Matamba)'
        },
        'icon': 'location_17.png',
        'capacity': 0
      },
      {
        'id': '10',
        'order': 18,
        'names': {
          'de': 'Bambuti (Hotel Matamba)',
          'en': 'Bambuti (Hotel Matamba)'
        },
        'icon': 'location_18.png',
        'capacity': 0
      },
      {
        'id': '11',
        'order': 19,
        'names': {
          'de': 'Wang Wei (Hotel Ling Bao)',
          'en': 'Wang Wei (Hotel Ling Bao)'
        },
        'icon': 'location_19.png',
        'capacity': 0
      },
      {
        'id': '12',
        'order': 2,
        'names': {
          'de': 'Wintergarten',
          'en': 'Wintergarten'
        },
        'icon': 'location_2.png',
        'capacity': 850
      },
      {
        'id': '13',
        'order': 20,
        'names': {
          'de': 'Konfuzius (Hotel Ling Bao)',
          'en': 'Konfuzius (Hotel Ling Bao)'
        },
        'icon': 'location_20.png',
        'capacity': 0
      },
      {
        'id': '14',
        'order': 3,
        'names': {
          'de': 'Schauspielhaus',
          'en': 'Schauspielhaus'
        },
        'icon': 'location_3.png',
        'capacity': 460
      },
      {
        'id': '15',
        'order': 4,
        'names': {
          'de': 'Quantum 1+2',
          'en': 'Quantum 1+2'
        },
        'icon': 'location_4.png',
        'capacity': 250
      },
      {
        'id': '16',
        'order': 5,
        'names': {
          'de': 'Quantum 3+4',
          'en': 'Quantum 3+4'
        },
        'icon': 'location_5.png',
        'capacity': 250
      },
      {
        'id': '17',
        'order': 6,
        'names': {
          'de': 'Eventhalle',
          'en': 'Eventhalle'
        },
        'icon': 'location_6.png',
        'capacity': 400
      },
      {
        'id': '18',
        'order': 7,
        'names': {
          'de': 'Neptun',
          'en': 'Neptun'
        },
        'icon': 'location_7.png',
        'capacity': 120
      },
      {
        'id': '19',
        'order': 8,
        'names': {
          'de': 'Quantum UG ',
          'en': 'Quantum UG '
        },
        'icon': 'location_8.png',
        'capacity': 60
      },
      {
        'id': '20',
        'order': 9,
        'names': {
          'de': 'Community Hall',
          'en': 'Community Hall'
        },
        'icon': 'location_9.png',
        'capacity': 0
      }
    ],
    'defaultIcon': 'Unknown.png'
  },
  'events': [
    {
      'id': '529268',
      'trackId': '1',
      'audienceId': '1',
      'typeId': '1',
      'locationId': '12',
      'start': '2017-03-28T14:00:00',
      'end': '2017-03-28T14:40:00',
      'title': 'Fallacies of Distributed Computing: What If Networks Fail?',
      'speakerIds': [
        '364675',
        '375158'
      ],
      'abstractText': 'Modern Software Architectures increasingly rely on the network for parts of applications to communicate with each other. In the minds of many software developers the network will never fail. But when L Peter Deutsch wrote the "Fallacies of Distributed Computing" paper back in 1994, he was probably never more right than today. \n\nOne of the hardest things when designing and testing for distributed failures is that most issues such as slow networks and lost packets will only be found in production environments. In this talk we will show you how to deal with distributed dependencies. We\'ll discuss setting and dealing with time-outs, connection monitoring, connection pooling, thread pools, queue sizes, and latency. Moreover we\'ll cover a strategy for improving fault tolerance in distributed architectures. \n\nThe topics covered are especially relevant if your application has a lot of dependencies that it communicates with over a network i.e. microservices. It is even more applicable if your application is deployed to an environment which is prone to failure on a regular basis e.g. a "cloud".',
      'languageId': '2',
      'demo': true,
      'simultan': false,
      'veryPopular': true,
      'fullyBooked': false,
      'numberOfFavorites': 0
    },
    {
      'id': '529697',
      'trackId': '10',
      'audienceId': '2',
      'typeId': '4',
      'locationId': '19',
      'start': '2017-03-28T12:00:00',
      'end': '2017-03-28T12:40:00',
      'title': 'Microservice-Anwendungen mit Docker',
      'speakerIds': [
        '364068'
      ],
      'abstractText': 'Docker ist ein ideales Werkzeug, den gesamten Entwicklungszyklus zu begleiten und einen weiteren Schritt in Richtung universell einsetzbare und verfügbare Anwendungen zu machen.\n\nVia Live-Demos wird anhand einer Spring-Cloud-Microservice-Anwendung der Einsatz der verschiedenen Docker-Tools in der Entwicklung, Integration und Betrieb gezeigt. Dabei wird auf Anforderungen einer verteilten Microservice-Architektur eingegangen und gezeigt, wie diese mit Docker und dem Spring Cloud/NetflixOSS Stack umgesetzt werden können.',
      'languageId': '1',
      'demo': true,
      'simultan': false,
      'veryPopular': true,
      'fullyBooked': false,
      'numberOfFavorites': 0
    },
    {
      'id': '529516',
      'trackId': '2',
      'audienceId': '2',
      'typeId': '1',
      'locationId': '15',
      'start': '2017-03-29T12:00:00',
      'end': '2017-03-29T12:40:00',
      'title': 'Everything as code',
      'speakerIds': [
        '374893'
      ],
      'abstractText': 'Zeitgemäße Entwickler müssen eine Vielzahl an Sprachen sicher beherrschen. Wir definieren unsere Entwicklungsumgebung mit Gradle, wir bauen unsere Software in Java, Kotlin oder sogar JavaScript. Wir verwenden Groovy und Scala, um unsere Software zu testen. Die Build-Pipeline wird per DSL und JSON definiert. Mit YAML und Python beschreiben wir die Infrastruktur und das Deployment unserer Anwendungen. Die Dokumentation unserer Architekturen erledigen wir mit AsciiDoc und JRuby. Willkommen in Babel! Hallo, Softwareindustrialisierung!\n\nUse the right tool for the job! Das ist das Motto dieser Session. Jede Sprache hat Stärken in einer bestimmten Domäne. Diese Stärken gilt es zu nutzen. Aber einfach blind jede gerade angesagte Sprache einzusetzen, ist sicherlich nicht die Lösung. Genau das versuchen wir mit dieser Session zu vermitteln. Stattdessen braucht es eine gut integrierte und abgestimmte Tool-Chain. Wir berichten aus der Praxis: What worked for us and what did not.',
      'languageId': '1',
      'demo': true,
      'simultan': false,
      'veryPopular': true,
      'fullyBooked': false,
      'numberOfFavorites': 0
    }
  ]
}

export default {
  data
}
