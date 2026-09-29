import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RepairRequestForm from '../components/RepairRequestForm';

const RepairRequest: React.FC = () => {
  return (
    <div className="min-h-screen page-surface flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="eyebrow mb-4">Start here · No account needed</p>
            <h1 className="display-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#142825] mb-5">
              Tell us what needs fixing.
            </h1>
            <p className="text-[#53645e] max-w-2xl leading-relaxed text-lg">
              Share a few details about your device. After you submit, we’ll give you a reference number to follow its progress.
            </p>
          </div>

          <div className="card-surface p-5 sm:p-8 md:p-10">
            <RepairRequestForm />
          </div>

          <div className="mt-8 p-6 bg-[#e5f1e9] rounded-2xl border border-[#d8e8dd] sm:flex sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="text-[#143c39] font-bold mb-1">Need to talk to someone?</h3>
              <p className="text-[#53645e] text-sm">
                Call or email us if you need help before submitting.
            </p>
            </div>
            <div className="flex gap-5 mt-4 sm:mt-0 shrink-0">
              <a href="tel:09473019217" className="text-blue-700 font-bold hover:underline py-2">Call us</a>
              <a href="mailto:johncomshop01@gmail.com" className="text-blue-700 font-bold hover:underline py-2">Email us</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RepairRequest;
