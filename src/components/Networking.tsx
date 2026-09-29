import React from 'react';
import { specializedServices } from '../data/content';
import { Video, Wifi } from 'lucide-react';

const iconMap = { Wifi, Video };

const Networking: React.FC = () => {
  return (
    <section className="py-20 md:py-24 page-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4">Beyond device repairs</p>
          <h2 className="section-heading text-4xl md:text-5xl font-extrabold text-[#142825] mb-5">
            Better connected. Better protected.
          </h2>
          <p className="text-lg text-[#53645e]">
            We also help with networks and CCTV for homes and small businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {specializedServices.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Wifi;
            return (
              <div key={service.id} className="flex flex-col sm:flex-row gap-5 p-7 md:p-9 rounded-3xl bg-[#142825] text-white">
                <div className="shrink-0">
                  <div className="p-3 bg-white/10 rounded-xl w-fit text-[#bfe0cc]">
                    <IconComponent className="h-8 w-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-[#b4c9bd] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Networking;
