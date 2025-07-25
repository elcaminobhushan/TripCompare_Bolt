import React from 'react';
import { Users, Heart, Camera } from 'lucide-react';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: "Bhushan Bhosale",
      role: "Co-Founder",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Kashish Verma",
      role: "Co-Founder",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  const gallery = [
    "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3155674/pexels-photo-3155674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3155726/pexels-photo-3155726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3155732/pexels-photo-3155732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Story</h2>
          <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 leading-relaxed mb-6">
            Founded in 2025, TripCompare was born out of a simple insight — travelers often struggle to compare tour packages clearly and confidently. With so many operators, prices, and inclusions, making the right choice can be overwhelming.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We're building TripCompare to change that. Our goal is to simplify travel planning by helping users compare group tour packages side by side — across price, activities, stays, meals, and more — so they can find the best fit without the guesswork.
          </p>

          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Customer First</h3>
              <p className="text-gray-600">Every decision we make is focused on providing the best experience for our users.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Passion for Travel</h3>
              <p className="text-gray-600">We're travelers ourselves, and we're passionate about helping others explore the world.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Camera className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Transparency</h3>
              <p className="text-gray-600">We believe in providing clear, honest information to help you make the best choice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 w-72 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-primary-100"
                />
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-primary-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((photo, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-xl hover:opacity-90 transition-opacity">
                <img 
                  src={photo} 
                  alt={`Gallery image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;