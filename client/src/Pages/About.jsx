import React from "react";
import { ShieldCheck, UploadCloud, DownloadCloud, Code2, Server, Link2 } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
          About ShareWare
        </h1>

        {/* Project Description */}
        <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          <span className="text-orange-400 font-semibold">ShareWare</span> is a peer-to-peer file sharing platform that allows users to securely transfer files without any server-side storage. It provides a seamless, real-time experience using modern web technologies — all within your browser.
        </p>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* How it works */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Link2 /> How It Works</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Establishes a WebRTC connection between sender and receiver.</li>
              <li>Uses WebSocket signaling to exchange session data.</li>
              <li>Files are transferred directly — no data touches a server.</li>
              <li>Supports real-time feedback, file status, and secure links.</li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Code2 /> Tech Stack</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>⚛️ <strong>React.js</strong> for a dynamic frontend UI</li>
              <li>🌐 <strong>WebRTC</strong> for peer-to-peer communication</li>
              <li>🔌 <strong>WebSocket</strong> for signaling and real-time updates</li>
              <li>🧠 <strong>Tailwind CSS</strong> for responsive styling</li>
              <li>🛡️ <strong>Postgres + PostGIS</strong> for scalable spatial data (future integration)</li>
            </ul>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 flex justify-center items-center gap-2"><ShieldCheck /> Our Mission</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We believe in a future where data is exchanged freely and securely without relying on centralized infrastructure. ShareWare promotes privacy, speed, and control — helping users stay connected without compromising on trust.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-xl mb-4">Ready to try it?</h3>
          <div className="flex justify-center gap-4">
            <a href="/send" className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md font-semibold">
              <UploadCloud className="inline mr-2" /> Send File
            </a>
            <a href="/receive" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md font-semibold">
              <DownloadCloud className="inline mr-2" /> Receive File
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
