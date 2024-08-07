// import React, { useEffect, useState } from 'react';

// const mockOrders = [
//   {
//     orderId: '12345',
//     productName: 'Wireless Headphones',
//     quantity: 1,
//     price: 150,
//     totalPrice: 150,
//     grandTotal: 150,
//     status: 'Shipped',
//     shippedDate: '2024-07-30',
//     productImage: 'https://via.placeholder.com/150', // Replace with actual image URL
//   },
//   {
//     orderId: '12346',
//     productName: 'Smartphone',
//     quantity: 2,
//     price: 600,
//     totalPrice: 1200,
//     grandTotal: 1200,
//     status: 'Processing',
//     shippedDate: '2024-07-28',
//     productImage: 'https://via.placeholder.com/150', // Replace with actual image URL
//   },
//   // Add more mock orders as needed
// ];

// const MyOrder = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Fetch orders from an API
//     // For now, we use mock data
//     setOrders(mockOrders);
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
//       <div className="space-y-4">
//         {orders.map((order) => (
//           <div key={order.orderId} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row p-4">
//             <img
//               src={order.productImage}
//               alt={order.productName}
//               className="w-full md:w-48 h-auto object-cover"
//             />
//             <div className="flex-grow md:pl-4 pt-4 md:pt-0">
//               <h2 className="text-xl font-semibold mb-2">{order.productName}</h2>
//               <p className="text-gray-700 mb-2">Order ID: {order.orderId}</p>
//               <p className="text-gray-700 mb-2">Quantity: {order.quantity}</p>
//               <p className="text-gray-700 mb-2">Price: ${order.price.toFixed(2)}</p>
//               <p className="text-gray-700 mb-2">Total Price: ${order.totalPrice.toFixed(2)}</p>
//               <p className="text-gray-700 mb-2">Grand Total: ${order.grandTotal.toFixed(2)}</p>
//               <p className="text-gray-700 mb-2">Status: {order.status}</p>
//               <p className="text-gray-700 mb-2">Shipped Date: {order.shippedDate}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyOrder;
