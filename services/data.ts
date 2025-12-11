import { Product, ProductType, Unit, ResourceGuide } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Roundup PowerMAX 3',
    manufacturer: 'Bayer',
    type: ProductType.HERBICIDE,
    activeIngredient: 'Glyphosate',
    crops: ['Corn', 'Soybeans', 'Cotton'],
    price: 45.00,
    packageSize: 1,
    packageUnit: Unit.GALLON,
    rateMin: 20,
    rateMax: 32,
    rateUnit: 'oz/acre',
    isOrganic: false
  },
  {
    id: '2',
    name: 'Liberty 280 SL',
    manufacturer: 'BASF',
    type: ProductType.HERBICIDE,
    activeIngredient: 'Glufosinate',
    crops: ['Corn', 'Soybeans', 'Cotton'],
    price: 65.00,
    packageSize: 2.5,
    packageUnit: Unit.GALLON,
    rateMin: 29,
    rateMax: 43,
    rateUnit: 'oz/acre',
    isOrganic: false
  },
  {
    id: '3',
    name: 'Warrior II',
    manufacturer: 'Syngenta',
    type: ProductType.INSECTICIDE,
    activeIngredient: 'Lambda-cyhalothrin',
    crops: ['Corn', 'Wheat', 'Rice'],
    price: 380.00,
    packageSize: 1,
    packageUnit: Unit.GALLON,
    rateMin: 1.28,
    rateMax: 1.92,
    rateUnit: 'oz/acre',
    isOrganic: false
  },
  {
    id: '4',
    name: 'Headline AMP',
    manufacturer: 'BASF',
    type: ProductType.FUNGICIDE,
    activeIngredient: 'Pyraclostrobin',
    crops: ['Corn'],
    price: 210.00,
    packageSize: 2.5,
    packageUnit: Unit.GALLON,
    rateMin: 10,
    rateMax: 14.4,
    rateUnit: 'oz/acre',
    isOrganic: false
  },
  {
    id: '5',
    name: 'Neem Oil Concentrate',
    manufacturer: 'Organic Solutions',
    type: ProductType.ORGANIC,
    activeIngredient: 'Azadirachtin',
    crops: ['Vegetables', 'Fruits', 'Ornamentals'],
    price: 85.00,
    packageSize: 1,
    packageUnit: Unit.GALLON,
    rateMin: 32,
    rateMax: 64,
    rateUnit: 'oz/acre',
    isOrganic: true
  },
  {
    id: '6',
    name: 'PyGanic Crop Protection',
    manufacturer: 'MGK',
    type: ProductType.ORGANIC,
    activeIngredient: 'Pyrethrins',
    crops: ['General', 'Greenhouse'],
    price: 150.00,
    packageSize: 1,
    packageUnit: Unit.GALLON,
    rateMin: 16,
    rateMax: 32,
    rateUnit: 'oz/acre',
    isOrganic: true
  }
];

export const resourceGuides: ResourceGuide[] = [
  {
    id: 'g1',
    title: 'Transitioning to Organic',
    summary: 'A step-by-step guide on certification and soil management.',
    content: 'Transitioning to organic farming requires a 36-month transition period where no prohibited substances are applied to the land. Key steps include: 1. Developing an Organic System Plan (OSP). 2. Focusing on soil health through cover cropping and composting. 3. Managing pests through integrated pest management (IPM) rather than synthetic chemicals.'
  },
  {
    id: 'g2',
    title: 'Understanding REI & PHI',
    summary: 'Safety intervals you need to know for worker protection.',
    content: 'REI (Restricted Entry Interval) is the time immediately after pesticide application when entry into the treated area is restricted. PHI (Pre-Harvest Interval) is the minimum amount of time that must pass between the last application of a pesticide and the harvesting of the crop. Always read the label!'
  },
  {
    id: 'g3',
    title: 'Integrated Pest Management',
    summary: 'Strategies to reduce reliance on chemical controls.',
    content: 'IPM is an ecosystem-based strategy that focuses on long-term prevention of pests or their damage through a combination of techniques such as biological control, habitat manipulation, modification of cultural practices, and use of resistant varieties.'
  }
];