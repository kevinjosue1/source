import { INavData } from '@coreui/angular';



export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',

    iconComponent: { name: 'cilViewQuilt' },

  },
  {
    name: 'Campaings',
    url: '/MyCampaing',
    iconComponent: { name: 'cilPaperPlane' },
    children: [
      {
        name: 'My Campaings',
        url: '/MyCampaing/MyTables',

        icon: 'nav-icon-bullet',
      },

      {
        name: 'New Campaings',
        url: '/MyCampaing/NewCampaing',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Upload',
        url: '/MyCampaing/Upload',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Statistics',
    url: '/statistics',
    iconComponent: { name: 'cilChartPie' },
    children: [
      {
        name: 'Reports',
        url: '/statistics/reports',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Monitor',
        url: '/statistics/monitor',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Audience',
    url: '/settings',
    iconComponent: { name: 'cilPeople' },
  }
  , {
    name: 'Analytics',
    url: '/analytics',
    iconComponent: { name: 'cilChart' },
  }

  , {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cilUser' }
  },

  {
    name: 'settings',
    url: '/settings',
    iconComponent: { name: 'cilSettings' },
  }
];

