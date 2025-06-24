// Generate GPA values from 4.0 to 0.0 in 0.1 increments
export const generateGPAValues = (): string[] => {
  const gpaValues: string[] = [];
  
  for (let i = 4.0; i >= 0.0; i -= 0.1) {
    // Format to 1 decimal place to avoid floating point precision issues
    gpaValues.push(i.toFixed(1));
  }
  
  return gpaValues;
};