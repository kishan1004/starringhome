import React from "react";
import Blacklogo from "../../images/starringblack.png";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col font-beatrice">
      <div className="w-screen md:px-10  px-4 pb-4">
        <Link to="/">
          <svg
            width="62"
            height="14"
            viewBox="0 0 62 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60.5 7H1M1 7L7 1M1 7L7 13"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
      {/* Header */}
      <header className="text-center py-10">
        <img
          src={Blacklogo}
          alt="Store Logo"
          className="w-[200px] mb-6 mx-auto"
        />
      </header>

      {/* Content */}
      <main className="max-w-3xl  mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 pb-4">
          Privacy Policy
        </h1>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="text-gray-700">
            This privacy policy outlines how we collect, use, and protect your
            personal information. By using our website, you consent to the
            practices described in this policy.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Information We Collect
          </h2>
          <p className="text-gray-700">
            We collect various types of information, including personal details
            like your name, email address, and payment information when you make
            purchases or sign up.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            How We Use Your Information
          </h2>
          <p className="text-gray-700">
            We use the information to improve your experience, process
            transactions, and send you relevant updates. Your information will
            never be shared with third parties without your consent, except for
            legal purposes.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Security</h2>
          <p className="text-gray-700">
            We implement various security measures to safeguard your personal
            information from unauthorized access, alteration, or disclosure.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
          <p className="text-gray-700">
            You have the right to access, modify, or delete your personal
            information. To do so, please contact us at [Your Contact
            Information].
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this privacy policy from time to time. Any changes
            will be posted on this page with the updated date.
          </p>
        </section>
        <h1 className="text-4xl font-bold text-gray-900 py-4">
          Terms of Service
        </h1>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="text-gray-700">
            These terms govern the use of our website and services. By using our
            site, you agree to be bound by these terms. Please read them
            carefully.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Acceptance of Terms
          </h2>
          <p className="text-gray-700">
            By accessing or using our website, you agree to comply with these
            terms and conditions. If you do not agree, you may not use our
            services.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            User Responsibilities
          </h2>
          <p className="text-gray-700">
            You are responsible for maintaining the confidentiality of your
            account information and for all activities that occur under your
            account.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Prohibited Activities
          </h2>
          <p className="text-gray-700">
            You may not use our website to engage in illegal activities, harass
            others, or violate any applicable laws or regulations.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Limitation of Liability
          </h2>
          <p className="text-gray-700">
            We are not liable for any damages arising from your use of our
            website or services, except as required by law.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Governing Law
          </h2>
          <p className="text-gray-700">
            These terms are governed by the laws of [Your State/Country]. Any
            disputes will be resolved in the appropriate courts.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Changes to Terms
          </h2>
          <p className="text-gray-700">
            We reserve the right to update these terms at any time. The most
            current version will be posted on this page with the date of the
            latest revision.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center py-4 bg-[#CFD8DC] text-black">
        <p>&copy; 2024 Starring. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
