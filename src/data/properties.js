import video1 from '../assets/WhatsApp Video 2026-03-15 at 8.21.36 AM.mp4';
import video2 from '../assets/WhatsApp Video 2026-03-15 at 8.23.29 AM.mp4';
import video3 from '../assets/WhatsApp Video 2026-03-15 at 8.23.42 AM.mp4';

const localVideos = [video1, video2, video3];

const locations = ['Nashik', 'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Aurangabad', 'Solapur', 'Amravati'];
const nashikAreas = ['Indira Nagar', 'College Road', 'Gangapur Road', 'Pathardi Phata', 'Panchavati', 'Satpur', 'Ambad', 'Nashik Road', 'Makhmalabad', 'Adgaon'];
const propertyTypes = ['Apartment', 'Villa', 'Penthouse', 'Commercial Space', 'Plot', 'Duplex'];

const generateProperties = (count) => {
  const props = [];
  for (let i = 1; i <= count; i++) {
    const isNashik = i <= 60 || Math.random() > 0.5; 
    const city = isNashik ? 'Nashik' : locations[Math.floor(Math.random() * locations.length)];
    const area = isNashik ? nashikAreas[Math.floor(Math.random() * nashikAreas.length)] : city + ' Area';
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const price = Math.floor(Math.random() * 2000) + 20; 
    const bhk = Math.floor(Math.random() * 5) + 1;
    const sqft = bhk * (Math.floor(Math.random() * 400) + 500);
    
    // Only use local videos as requested
    const video = localVideos[i % localVideos.length];
    
    props.push({
      id: i,
      name: `${area} ${type}`,
      priceValue: price,
      price: price > 99 ? `₹${(price/100).toFixed(2)} Cr` : `₹${price} L`,
      location: `${area}, ${city}`,
      city: city,
      beds: bhk,
      baths: bhk === 1 ? 1 : bhk - 1,
      sqft: sqft,
      tags: i % 3 === 0 ? ['Trending'] : i % 5 === 0 ? ['Featured'] : ['New Launch'],
      video: video,
      type: i % 2 === 0 ? 'Buy' : 'Rent',
      category: type
    });
  }
  return props;
};

export const allProperties = generateProperties(120);
