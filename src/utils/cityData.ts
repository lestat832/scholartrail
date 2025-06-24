// Mock city data for autocomplete
// In a real app, this would come from an API
export const cityData = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
  "Austin, TX",
  "Jacksonville, FL",
  "Fort Worth, TX",
  "Columbus, OH",
  "San Francisco, CA",
  "Charlotte, NC",
  "Indianapolis, IN",
  "Seattle, WA",
  "Denver, CO",
  "Washington, DC",
  "Boston, MA",
  "El Paso, TX",
  "Detroit, MI",
  "Nashville, TN",
  "Portland, OR",
  "Memphis, TN",
  "Oklahoma City, OK",
  "Las Vegas, NV",
  "Louisville, KY",
  "Baltimore, MD",
  "Milwaukee, WI",
  "Albuquerque, NM",
  "Tucson, AZ",
  "Fresno, CA",
  "Mesa, AZ",
  "Sacramento, CA",
  "Atlanta, GA",
  "Kansas City, MO",
  "Colorado Springs, CO",
  "Miami, FL",
  "Raleigh, NC",
  "Omaha, NE",
  "Long Beach, CA",
  "Virginia Beach, VA",
  "Oakland, CA",
  "Minneapolis, MN",
  "Tulsa, OK",
  "Arlington, TX",
  "Tampa, FL",
  "New Orleans, LA",
];

export const searchCities = (query: string): string[] => {
  if (query.length < 3) return [];
  
  const lowerQuery = query.toLowerCase();
  return cityData
    .filter(city => city.toLowerCase().includes(lowerQuery))
    .slice(0, 5); // Return max 5 suggestions
};