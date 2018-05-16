export default dayreport => {
  return {
    text: 'Uw dagelijkse assortimentrapport:',
    channel: 'CAPCPRW6B',
    username: 'Lightspeed - Dagrapporten',
    icon_url:
      'https://integration-platform.korteschielkampen.nl/lightspeed.png',
    attachments: [
      {
        title: 'Archiveerbare artikelen',
        fields: [
          {
            title: 'Artikelnaam',
            value:
              'laatst verkocht: 03-02-2017\nlaatst ingekocht: 05-06-2016\nvoorraad: xx, bestelpunt: xx',
            short: true,
          },
          {
            title: 'Artikelnaam',
            value:
              'laatst verkocht: 03-02-2017\nlaatst ingekocht: 05-06-2016\nvoorraad: xx, bestelpunt: xx',
            short: true,
          },
          {
            title: 'Artikelnaam',
            value:
              'laatst verkocht: 03-02-2017\nlaatst ingekocht: 05-06-2016\nvoorraad: xx, bestelpunt: xx',
            short: true,
          },
          {
            title: 'Artikelnaam',
            value:
              'laatst verkocht: 03-02-2017\nlaatst ingekocht: 05-06-2016\nvoorraad: xx, bestelpunt: xx',
            short: true,
          },
          {
            title: 'Artikelnaam',
            value:
              'laatst verkocht: 03-02-2017\nlaatst ingekocht: 05-06-2016\nvoorraad: xx, bestelpunt: xx',
            short: true,
          },
          {
            title: 'Artikelnaam',
            value:
              'laatst verkocht: 03-02-2017\nlaatst ingekocht: 05-06-2016\nvoorraad: xx, bestelpunt: xx',
            short: true,
          },
        ],
        actions: [
          {
            name: 'Menu',
            text: 'Archiveer artikel',
            type: 'select',
            options: [
              {
                text: 'Artikel 1',
                value: '13',
              },
              {
                text: 'Artikel 2',
                value: '12',
              },
              {
                text: 'Artikel 3',
                value: '14',
              },
            ],
          },
          {
            name: 'Menu',
            text: 'Verhoog voorraad',
            type: 'select',
            options: [
              {
                text: 'Artikel 1',
                value: '13',
              },
              {
                text: 'Artikel 2',
                value: '12',
              },
              {
                text: 'Artikel 3',
                value: '14',
              },
            ],
          },
          {
            name: 'Menu',
            text: 'Pas nabestelpunt aan',
            type: 'select',
            options: [
              {
                text: 'Artikel 1',
                value: '13',
              },
              {
                text: 'Artikel 2',
                value: '12',
              },
              {
                text: 'Artikel 3',
                value: '14',
              },
            ],
          },
          {
            name: 'Button',
            text: 'Vorige',
            type: 'button',
          },
          {
            name: 'Button',
            text: 'Volgende',
            type: 'button',
          },
        ],
        color: '#ef3945',
        attachment_type: 'default',
      },
    ],
  }
}