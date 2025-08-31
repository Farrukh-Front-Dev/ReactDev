export const futuristicCarouselUsage =`import React from 'react';
import FuturisticCarousel from './FuturisticCarousel';

const App = () => {
  const carouselItems = [
    { color: '#06b6d4', id: 'product1', data: { name: 'AI Assistant', price: '$99' } },
    { color: '#8b5cf6', id: 'product2', data: { name: 'VR Headset', price: '$599' } },
    { color: '#ec4899', id: 'product3', data: { name: 'Smart Watch', price: '$299' } },
    { color: '#10b981', id: 'product4', data: { name: 'Drone', price: '$799' } },
  ];

  const handleSelection = (index: number, item: any) => {
    console.log('User selected:', item.data.name);
    // Add your custom logic here
  };

  return (
    <div className="App">
      <FuturisticCarousel 
        items={carouselItems}
        onItemSelect={handleSelection}
      />
    </div>
  );
};

export default App;`;