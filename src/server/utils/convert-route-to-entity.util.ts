const mapping: Record<string, string> = {
  documents: 'document',
  employers: 'employer',
  'tax-informations': 'tax_information',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
