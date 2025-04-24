import React from "react";
import { Link } from "react-router-dom";
import {
  UploadCloud,
  DownloadCloud,
  ShieldCheck,
  Zap,
  WifiOff,
  Clock,
  Send,
} from "lucide-react";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Banner Section */}
      <section
        className="py-20 text-center px-6 bg-gradient-to-r from-slate-800 to-gray-900"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
          Share files. Instantly. Securely.
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          ShareWare is a blazing fast peer-to-peer file sharing platform with no
          middleman. Your data stays yours.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link
            to="/send"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-md text-lg font-semibold"
          >
            <UploadCloud className="inline-block mr-2" /> Send File
          </Link>
          <Link
            to="/receive"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-lg font-semibold"
          >
            <DownloadCloud className="inline-block mr-2" /> Receive File
          </Link>
        </div>
      </section>

      {/* Share Options Container */}
      <section className="py-16 px-6 text-center bg-gray-950/45">
        <h2 className="text-3xl font-bold mb-6 text-orange-400">
          How It Works
        </h2>
        <p className="max-w-xl mx-auto text-gray-400 mb-10">
          ShareWare uses peer-to-peer WebRTC and secure WebSocket signaling to
          transfer files directly between devices with end-to-end encryption.
        </p>
        <div className="flex justify-center">
          <Link
            to="/send"
            className="px-6 py-3 text-white bg-orange-500 rounded hover:bg-orange-600 font-medium"
          >
            Start Sharing
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-black to-gray-900">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Why Choose ShareWare?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-gray-300">
          <FeatureCard
            icon={<Zap />}
            title="Blazing Fast"
            desc="Direct device-to-device transfer for unmatched speed."
          />
          <FeatureCard
            icon={<ShieldCheck />}
            title="Secure & Private"
            desc="End-to-end encrypted with no storage on servers."
          />
          <FeatureCard
            icon={<WifiOff />}
            title="Offline Ready"
            desc="Supports local network sharing without internet."
          />
          <FeatureCard
            icon={<Clock />}
            title="No Signup Needed"
            desc="Start sharing instantly without any account."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center hover:shadow-xl transition">
    <div className="text-orange-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);

export default Home;
