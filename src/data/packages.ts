import { Package } from '../types';

export const packages: Package[] = [
  // Bali Packages
  

];

export const getPackageById = (id: string): Package | undefined => {
  return packages.find(pkg => pkg.id === id);
};

export const getRelatedPackages = (packageId: string, limit: number = 3): Package[] => {
  const currentPackage = packages.find(p => p.id === packageId);
  if (!currentPackage) return [];
  
  return packages
    .filter(p => 
      p.id !== packageId && 
      p.destinationId === currentPackage.destinationId
    )
    .slice(0, limit);
};