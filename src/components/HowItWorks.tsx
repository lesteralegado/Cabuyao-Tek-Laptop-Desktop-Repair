import { howItWorks } from '../data/content';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4">The process</p>
          <h2 className="section-heading text-4xl md:text-5xl font-extrabold text-[#142825] mb-5">Know what happens next.</h2>
          <p className="text-lg text-[#53645e]">You can check each step with your reference number, without creating an account.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map(step => (
            <div key={step.id} className="border-t-[3px] border-blue-600 pt-5 pr-4">
              <span className="font-mono text-sm font-bold text-blue-600">0{step.id}</span>
              <h3 className="text-lg font-bold text-[#142825] mt-4 mb-2">{step.title}</h3>
              <p className="text-[#61726b] text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
