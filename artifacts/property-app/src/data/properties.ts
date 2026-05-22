export type PropertyStatus = 'Occupied' | 'Vacant';

export interface Tenant {
  name: string;
  profession: string;
  occupants: number;
  leaseExpiry: string;
}

export interface MaintenanceRequest {
  title: string;
  date: string;
  status: 'Open' | 'Resolved' | 'In Progress';
}

export interface Property {
  id: string;
  name: string;
  address: string;
  rent: string;
  beds: number;
  baths: number;
  area: string;
  status: PropertyStatus;
  tenant: Tenant | null;
  images: string[];
  maintenance: MaintenanceRequest[];
}

export const PROPERTIES_DATA: Property[] = [
  {
    id: '1',
    name: 'Prestige Lakeside Habitat',
    address: 'Whitefield, Bangalore — 560066',
    rent: '₹22,000/mo',
    beds: 3,
    baths: 2,
    area: '1,450 sqft',
    status: 'Occupied',
    tenant: {
      name: 'Ramesh Kumar',
      profession: 'Software Engineer',
      occupants: 3,
      leaseExpiry: '28 May 2025',
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      'https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=600&q=80',
    ],
    maintenance: [
      { title: 'Ceiling fan repair', date: 'Feb 10, 2025', status: 'Resolved' },
      { title: 'Bathroom geyser leaking', date: 'Apr 2, 2025', status: 'Open' },
      { title: 'Lobby light not working', date: 'Apr 5, 2025', status: 'Open' },
    ],
  },
  {
    id: '2',
    name: 'Sunset Apartments #402',
    address: 'Koramangala, Bangalore — 560034',
    rent: '₹18,500/mo',
    beds: 2,
    baths: 1,
    area: '1,100 sqft',
    status: 'Occupied',
    tenant: {
      name: 'Harish Rao',
      profession: 'Marketing Manager',
      occupants: 2,
      leaseExpiry: '15 Jun 2025',
    },
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    ],
    maintenance: [
      { title: 'AC not cooling', date: 'Mar 10, 2025', status: 'Open' },
      { title: 'Leaky kitchen faucet', date: 'Feb 28, 2025', status: 'Resolved' },
    ],
  },
  {
    id: '3',
    name: 'Ocean View Villa',
    address: 'Indiranagar, Bangalore — 560038',
    rent: '₹35,000/mo',
    beds: 4,
    baths: 3,
    area: '2,200 sqft',
    status: 'Vacant',
    tenant: null,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80',
    ],
    maintenance: [],
  },
  {
    id: '4',
    name: 'Green Park Residency',
    address: 'HSR Layout, Bangalore — 560102',
    rent: '₹14,000/mo',
    beds: 2,
    baths: 2,
    area: '950 sqft',
    status: 'Occupied',
    tenant: {
      name: 'Priya Sharma',
      profession: 'Data Analyst',
      occupants: 1,
      leaseExpiry: '10 Jul 2025',
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    ],
    maintenance: [
      { title: 'Door lock broken', date: 'Jan 5, 2025', status: 'Resolved' },
      { title: 'Wall paint peeling off', date: 'Mar 25, 2025', status: 'In Progress' },
    ],
  },
];
