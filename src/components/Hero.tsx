import { ArrowRight, Check, Laptop, MapPin, Smartphone, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { icon: Laptop, label: 'Computers & laptops' },
  { icon: Smartphone, label: 'Phones & tablets' },
  { icon: Wrench, label: 'Networks & CCTV' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden page-surface pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_.9fr] gap-14 lg:gap-20 items-center">
        <div>
          <div className="eyebrow flex items-center gap-2 mb-6"><MapPin className="w-4 h-4" /> Local repair service in Cabuyao, Laguna</div>
          <h1 className="display-heading text-[clamp(3.2rem,7vw,6.4rem)] font-extrabold text-[#142825] max-w-3xl">
            Get your tech <span className="text-blue-600">working again.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-[#53645e] max-w-xl">
            Tell us what went wrong. We help with computers, laptops, phones, networks, and CCTV, with clear updates from request to repair.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link to="/request" className="btn-primary text-base sm:text-lg">Request a repair <ArrowRight className="w-5 h-5" /></Link>
            <Link to="/track" className="btn-secondary text-base sm:text-lg">Track my repair</Link>
          </div>
          <p className="mt-6 text-sm text-[#6d7a74]">No account needed · Meet-up and home service available</p>
        </div>

        <div className="relative max-w-lg w-full mx-auto lg:mr-0">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-[repeating-linear-gradient(0deg,transparent,transparent_31px,#dbe8df_32px),repeating-linear-gradient(90deg,transparent,transparent_31px,#dbe8df_32px)] opacity-55" aria-hidden="true" />
          <div className="relative rounded-[2rem] bg-[#142825] text-white p-6 sm:p-9 shadow-[0_32px_70px_-38px_#092f2e]">
            <div className="flex items-center justify-between border-b border-white/15 pb-6">
              <span className="text-xs tracking-[.2em] font-bold text-[#a3c9be]">CABUYAO TEK / SERVICE DESK</span>
              <span className="text-xs font-mono text-[#a3c9be]">CT—01</span>
            </div>
            <p className="text-xs uppercase tracking-[.18em] text-[#a3c9be] mt-8">What we work on</p>
            <div className="mt-4 space-y-2">
              {services.map(({ icon: Icon, label }, index) => (
                <div key={label} className="flex items-center gap-4 py-3 border-b border-white/10">
                  <span className="text-xs font-mono text-[#a3c9be]">0{index + 1}</span>
                  <Icon className="w-5 h-5 text-[#a3c9be]" />
                  <span className="text-base sm:text-lg font-semibold">{label}</span>
                  <Check className="w-4 h-4 ml-auto text-[#bfe0cc]" />
                </div>
              ))}
            </div>
            <div className="mt-9 rounded-xl bg-[#e5f1e9] text-[#143c39] p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold">A simpler way to get help</span>
                <span className="text-xs font-mono">01 / 03</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed">Send the details, receive a reference number, then check progress whenever you need to.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
