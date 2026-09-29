import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessInfo } from '../data/content';

const mapQuery = `${businessInfo.location}, Philippines`;
const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=17&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 page-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-10 lg:gap-20 items-start">
        <div>
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 className="section-heading text-4xl md:text-5xl font-extrabold text-[#142825] mb-6">Tell us what’s going on.</h2>
          <p className="text-lg leading-relaxed text-[#53645e] max-w-lg">Reach out directly, or send a repair request so we have the details ready when we speak.</p>
          <Link to="/request" className="btn-primary mt-8">Start a repair request <ArrowUpRight className="w-4 h-4" /></Link>
        </div>
        <div className="card-surface divide-y divide-[#e2e9e4] overflow-hidden">
          <a href={`tel:${businessInfo.phone}`} className="flex items-center gap-5 p-5 sm:p-7 hover:bg-blue-50 transition-colors">
            <span className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><Phone className="w-5 h-5" /></span>
            <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-wider text-[#718077]">Call us</span><span className="block mt-1 font-bold text-[#142825]">{businessInfo.phone}</span></span>
            <ArrowUpRight className="w-5 h-5 text-blue-600 ml-auto shrink-0" />
          </a>
          <a href={`mailto:${businessInfo.email}`} className="flex items-center gap-5 p-5 sm:p-7 hover:bg-blue-50 transition-colors">
            <span className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><Mail className="w-5 h-5" /></span>
            <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-wider text-[#718077]">Email us</span><span className="block mt-1 font-bold text-[#142825] break-all">{businessInfo.email}</span></span>
            <ArrowUpRight className="w-5 h-5 text-blue-600 ml-auto shrink-0" />
          </a>
          <div className="flex items-center gap-5 p-5 sm:p-7">
            <span className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><MapPin className="w-5 h-5" /></span>
            <span><span className="block text-xs font-bold uppercase tracking-wider text-[#718077]">Find us</span><span className="block mt-1 font-bold text-[#142825]">{businessInfo.location}</span>{businessInfo.landmark && <span className="block mt-1 text-sm text-[#61726b]">{businessInfo.landmark}</span>}</span>
          </div>
        </div>
      </div>
      <div className="card-surface overflow-hidden mt-10 lg:mt-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-7 border-b border-[#e2e9e4]">
          <div>
            <p className="eyebrow mb-2">Visit us</p>
            <h3 className="text-xl sm:text-2xl font-bold text-[#142825]">Southville 1, Marinig</h3>
            <p className="text-sm text-[#61726b] mt-1">{businessInfo.landmark}</p>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">Open in Google Maps <ArrowUpRight className="w-4 h-4" /></a>
        </div>
        <iframe
          title="Google Maps view of the Southville 1, Marinig address"
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="block w-full h-[320px] sm:h-[420px] border-0 bg-[#e5eae5]"
        />
        <p className="px-5 sm:px-7 py-3 text-xs text-[#61726b] border-t border-[#e2e9e4]">
          This map searches the address above and may not mark the exact entrance.
        </p>
      </div>
      </div>
    </section>
  );
}
