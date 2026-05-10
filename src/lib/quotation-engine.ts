export interface AirportLocation {
  icao: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  landing_fee: number;
}

export const MOCK_AIRPORTS: AirportLocation[] = [
  { icao: 'SBSP', name: 'Congonhas', city: 'São Paulo', lat: -23.6273, lng: -46.6566, landing_fee: 1500 },
  { icao: 'SBJD', name: 'Comte. Rolim Adolfo Amaro', city: 'Jundiaí', lat: -23.1809, lng: -46.9421, landing_fee: 500 },
  { icao: 'SBRJ', name: 'Santos Dumont', city: 'Rio de Janeiro', lat: -22.9105, lng: -43.1631, landing_fee: 2500 },
  { icao: 'SBBR', name: 'Juscelino Kubitschek', city: 'Brasília', lat: -15.8697, lng: -47.9172, landing_fee: 1800 },
  { icao: 'SBPA', name: 'Salgado Filho', city: 'Porto Alegre', lat: -29.9939, lng: -51.1711, landing_fee: 1200 },
  { icao: 'SBFL', name: 'Hercílio Luz', city: 'Florianópolis', lat: -27.6701, lng: -48.5525, landing_fee: 1100 },
  { icao: 'SBCF', name: 'Confins', city: 'Belo Horizonte', lat: -19.6244, lng: -43.9719, landing_fee: 1600 }
];

export interface CommercialPricing {
  hourly_rate: number;
  margin_percentage: number;
  min_hours: number;
  cruise_speed_kts: number;
}

export const QuotationEngine = {
  // Haversine formula to calculate distance in Nautical Miles (NM)
  calculateDistanceNM: (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3440.065; // Radius of earth in Nautical Miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  calculateQuote: (
    origin: AirportLocation, 
    destination: AirportLocation, 
    pricing: CommercialPricing
  ) => {
    // 1. Distance
    const distanceNm = QuotationEngine.calculateDistanceNM(origin.lat, origin.lng, destination.lat, destination.lng);
    
    // 2. Flight Time (Decimal Hours)
    // Add 15 mins (0.25h) for departure/arrival maneuvering and vectors
    let flightTimeHours = (distanceNm / pricing.cruise_speed_kts) + 0.25; 
    
    // Apply Minimum Hours Rule
    const billableHours = Math.max(flightTimeHours, pricing.min_hours);

    // 3. Base Operational Cost
    const baseCost = billableHours * pricing.hourly_rate;
    const landingFees = origin.landing_fee + destination.landing_fee;
    const totalOperationalCost = baseCost + landingFees;

    // 4. Commercial Margin
    const marginAmount = totalOperationalCost * (pricing.margin_percentage / 100);
    const finalPrice = totalOperationalCost + marginAmount;

    return {
      distanceNm: Math.round(distanceNm),
      flightTimeHours: flightTimeHours,
      billableHours: billableHours,
      baseCost: Math.round(baseCost),
      landingFees: landingFees,
      marginAmount: Math.round(marginAmount),
      finalPrice: Math.round(finalPrice),
    };
  }
};
