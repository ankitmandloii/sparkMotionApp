// import React from 'react';
// import { icons, MapPin } from 'lucide-react';
// import { ForkKnife, Entrance, Toilet, Parking, HandBag, Food, StagePinIcon, RedStarIcon, RedlocationIcon } from '../assets/customSvg';
// // --- DATA DEFINITION ---

// // Define the data for the Map Legend items
// const MAP_LEGEND_ITEMS = [
//   // Row 1 (first 3 items)
//   { label: 'Stage', colorVar: '--stage', Icons: StagePinIcon },
//   { label: 'Food', colorVar: '--food', Icons: Food },
//   { label: 'Merch', colorVar: '--merch', Icons: HandBag },
//   // // Row 2 (next 3 items)
//   { label: 'Parking', colorVar: '--parking', Icons: Parking },
//   { label: 'Restroom', colorVar: '--restroom', Icons: Toilet },
//   { label: 'Entrance', colorVar: '--entrance', Icons: Entrance },
// ];

// // Define the data for the Festival Tips
// const FESTIVAL_TIPS = [
//   'This app works offline! Content will sync automatically when you have an internet connection.',
//   'Stay hydrated! Look for the water refill stations marked on the map.',
//   'Designate a meeting spot with your friends in case cell service is spotty.',
// ];

// // Split the full array into two rows for the responsive desktop layout
// const row1Items = MAP_LEGEND_ITEMS.slice(0, 3);
// const row2Items = MAP_LEGEND_ITEMS.slice(3);

// // --- HELPER COMPONENT ---

// // Component for a single legend item
// const LegendItem = ({ label, colorVar, isLastInRow, Icons }) => {
//   // Determine if a right border is needed (for all items except the last one in the row)
//   const borderClass = !isLastInRow
//     ? 'border-r border-white border-opacity-15'
//     : '';

//   return (
//     <li
//       // w-1/3 on mobile/small screens, md:flex-1 on desktop to ensure even spacing
//       className={`w-1/3 md:flex-1 text-center py-3 ${borderClass}`}
//       style={{ color: `var(${colorVar})` }}
//     >
//       <div className="flex justify-center items-center gap-1">
//         <Icons color={"#8B5CF6"} size={20} className="stroke-current" />
//         <span className="font-medium">{label}</span>
//       </div>
//     </li>
//   );
// };

// // --- MAIN COMPONENT ---

// function Map() {

//   return (
//     <section className='bg-black py-8 px-4 sm:px-14 text-white w-full' >

//       {/* title start */}
//       <div className="max-w-7xl mx-auto">
//         <h2 className="uppercase text-4xl font-extrabold text-teal-400">Festival Map</h2>
//         <p className='text-sm italic text-gray-400 mt-1'>Navigate the festival grounds with ease.</p>
//       </div>
//       {/* title end*/}

//       {/* legend and tips container start */}
//       <div className='bg-[#151515] p-6 sm:p-8 my-8 rounded-3xl shadow-2xl max-w-7xl mx-auto'>

//         {/* Map Legend */}
//         <div>
//           <p className='uppercase py-2 font-bold text-xl mb-4 text-white'>Map Legend</p>

//           <div className="bg-[#232323] rounded-xl border border-white border-opacity-15 overflow-hidden">
//             <div className="text-base text-white flex flex-col md:flex-row">

//               {/* First Row: 3 items */}
//               <ul className="py-2 flex w-full md:flex-1 border-b border-white border-opacity-15 md:border-none">
//                 {row1Items.map((item, index) => (
//                   <LegendItem
//                     key={item.label}
//                     label={item.label}
//                     colorVar={item.colorVar}
//                     // The last item in the first row should not have a right border in this split list structure
//                     isLastInRow={index === row1Items.length - 1}
//                     Icons={item.Icons}
//                   />
//                 ))}
//               </ul>

//               {/* Second Row: 3 items */}
//               <ul className="py-2 flex w-full md:flex-1">
//                 {row2Items.map((item, index) => (
//                   <LegendItem
//                     key={item.label}
//                     label={item.label}
//                     colorVar={item.colorVar}
//                     Icons={item.Icons}
//                     // The last item in the second row should not have a right border
//                     isLastInRow={index === row2Items.length - 1}
//                   />
//                 ))}
//               </ul>

//             </div>
//           </div>
//         </div>

//         {/* Festival Tips */}
//         <div className='mt-8'>
//           <p className='uppercase py-2 font-bold text-xl mb-2 text-white'>Festival Tips</p>

//           <div className='py-4 leading-relaxed bg-[#232323] rounded-xl px-6 text-sm border border-white border-opacity-15'>
//             <ul className='list-disc list-inside space-y-3'>
//               {FESTIVAL_TIPS.map((tip, index) => (
//                 <li
//                   key={index}
//                   className={`text-gray-300 ${index < FESTIVAL_TIPS.length - 1 ? 'pb-3 border-b border-gray-600 border-opacity-50' : ''}`}
//                 >
//                   {tip}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//       </div>
//       {/* legend and tips container end */}

//       {/* Placeholder for the actual Map Image */}
//       <div className="max-w-7xl mx-auto mt-12 p-8 bg-[#0a0a0a] rounded-xl border border-dashed border-gray-700 h-96 flex items-center justify-center">
//         <p className="text-gray-500 italic text-lg">
//           [Actual Festival Map Image/Interactive Map goes here]
//         </p>
//       </div>

//     </section>
//   );
// }

// export default Map;
import React from 'react';
// We must use icons available within this single-file environment, so we use lucide-react.
// Custom SVG imports from external files (like '../assets/customSvg') are not supported here.
import { Mic, Utensils, ShoppingBag, Car, DoorOpen } from 'lucide-react';
import { ForkKnife, Entrance, Toilet, Parking, HandBag, Food, StagePinIcon, RedStarIcon, RedlocationIcon } from '../assets/customSvg';

// --- DATA DEFINITION ---

// Define the data for the Map Legend items
const MAP_LEGEND_ITEMS = [
  // Using capitalized 'Icon' key for component rendering. We use 'Icon' (singular) for clarity.
  { label: 'Stage', colorVar: '--stage', Icon: StagePinIcon },
  { label: 'Food', colorVar: '--food', Icon: Utensils },
  { label: 'Merch', colorVar: '--merch', Icon: ShoppingBag },
  { label: 'Parking', colorVar: '--parking', Icon: Parking },
  { label: 'Restroom', colorVar: '--restroom', Icon: Toilet },
  { label: 'Entrance', colorVar: '--entrance', Icon: Entrance },
];

// Define the data for the Festival Tips
const FESTIVAL_TIPS = [
  'This app works offline! Content will sync automatically when you have an internet connection.',
  'Stay hydrated! Look for the water refill stations marked on the map.',
  'Designate a meeting spot with your friends in case cell service is spotty.',
];

// Split the full array into two rows for the responsive desktop layout
const row1Items = MAP_LEGEND_ITEMS.slice(0, 3);
const row2Items = MAP_LEGEND_ITEMS.slice(3);

// --- HELPER COMPONENT ---

// Component for a single legend item
// The prop is named 'Icon' (capital I) and is destuctured as such.
const LegendItem = ({ label, colorVar, isLastInRow, Icon, className = '' }) => {
  // Determine if a right border is needed (for all items except the last one in the row)
  // We use the same color variables defined in the main Map function.
  const borderClass = !isLastInRow
    ? 'border-r border-[var(--border-color)] border-opacity-15'
    : '';

  return (
    <li
      // w-1/3 on mobile/small screens, md:flex-1 on desktop to ensure even spacing
      // Added className to the applied classes
      className={`w-1/3 md:flex-1 text-center py-3 ${borderClass} ${className}`}
      style={{ color: `var(${colorVar})` }}
    >
      <div className="flex justify-center items-center gap-1">
        <Icon color={"#8B5CF6"} size={20} className="stroke-current" />
        <span className="font-medium">{label}</span>
      </div>
    </li>
  );
};

// --- MAIN COMPONENT ---

function Map() {


  return (
    <section className='bg-black py-8  px-4 md:px-14 text-white w-full' >

      {/* title start */}
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold uppercase ">Festival Map</h1>
          <p className="color-text-base text-sm italic">Navigate the festival grounds with ease.</p>
        </div>
        {/* <h2 className="uppercase text-[34px] color-primary-base font-extrabold color-text-bas ">Festival Map</h2>
        <p className='text-[16px] font-medium  color-primary-base  italic '>Navigate the festival grounds with ease.</p> */}
      </div>
      {/* title end*/}

      {/* legend and tips container start */}
      <div className='bg-[#151515] p-6 sm:p-8 my-8 rounded-3xl shadow-2xl max-w-7xl mx-auto'>

        {/* Map Legend */}
        <div>
          <p className='uppercase py-2 font-bold text-xl mb-4 text-white'>Map Legend</p>

          <div className="bg-[#232323] rounded-2xl use-border border-opacity-15 overflow-hidden">
            <div className="text-base text-white flex flex-col md:flex-row">

              {/* First Row: 3 items */}
              <ul className="py-2 flex w-full md:flex-1 border-b border-[var(--border-color)] border-opacity-15 md:border-none">
                {row1Items.map((item, index) => (
                  <LegendItem
                    key={item.label}
                    label={item.label}
                    colorVar={item.colorVar}
                    Icon={item.Icon}
                    // ADDED: Force a right border on desktop for the last item of this row ("Merch")
                    // to close the visual gap with the next list item ("Parking").
                    className={index === row1Items.length - 1 ? 'md:border-r md:border-[var(--border-color)] md:border-opacity-15' : ''}
                    isLastInRow={index === row1Items.length - 1}
                  />
                ))}
              </ul>

              {/* Second Row: 3 items */}
              <ul className="py-2 flex w-full md:flex-1">
                {row2Items.map((item, index) => (
                  <LegendItem
                    key={item.label}
                    label={item.label}
                    colorVar={item.colorVar}
                    Icon={item.Icon}
                    // The last item in the second row should not have a right border (isLastInRow handles this)
                    isLastInRow={index === row2Items.length - 1}
                  />
                ))}
              </ul>

            </div>
          </div>
        </div>

        {/* Festival Tips */}
        <div className='mt-8'>
          <p className='uppercase py-2 font-bold text-xl mb-2 text-white'>Festival Tips</p>

          <div className='py-4 leading-relaxed bg-[#232323] rounded-2xl px-6 text-sm use-border border-opacity-15'>
            <ul className='list-disc list-inside space-y-3'>
              {FESTIVAL_TIPS.map((tip, index) => (
                <li
                  key={index}
                  className={`text-gray-300 ${index < FESTIVAL_TIPS.length - 1 ? 'pb-3 border-b border-gray-600 border-opacity-50' : ''}`}
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
      {/* legend and tips container end */}

      {/* Placeholder for the actual Map Image */}
      <div className="max-w-7xl mx-auto mt-12 p-8 bg-[#0a0a0a] rounded-2xl border border-dashed border-gray-700 h-96 flex items-center justify-center">
        <p className="text-gray-500 italic text-lg">
          [Actual Festival Map Image/Interactive Map goes here]
        </p>
      </div>

    </section>
  );
}

export default Map;
