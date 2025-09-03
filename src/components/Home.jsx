import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const features = [
  {
    title: "Easy Blog Creation",
    desc: "Create and publish blogs with a simple editor.",
  },
  {
    title: "Responsive Design",
    desc: "Works perfectly on mobile, tablet, and desktop.",
  },
  {
    title: "User-Friendly Dashboard",
    desc: "Manage your blogs with ease and efficiency.",
  },
  {
    title: "Comment & Like System",
    desc: "Engage with your readers through interactions.",
  },
];

const testimonials = [
  {
    name: "Sophia Williams",
    role: "Content Writer",
    feedback:
      "Blogify made it so easy for me to share my stories. The editor is simple yet powerful!",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "James Smith",
    role: "Developer & Blogger",
    feedback:
      "I love how responsive and clean the design is. Managing my blogs feels effortless.",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Aisha Khan",
    role: "Travel Blogger",
    feedback:
      "Blogify gave me the tools to connect with my audience and grow my community.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const Home = () => {
  return (
    <div className="font-[Poppins] bg-[#F9FAFB]">
      <Navbar />

      {/* Hero with Background */}
      <section className="relative pt-28 md:pt-32 pb-32 text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Blogify
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Share your thoughts with the world
          </motion.p>
          <motion.button
            className="mt-8 px-10 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-[#4A90E2] to-[#50E3C2] shadow-md hover:shadow-xl transition"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Features
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-[#4A90E2] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-[#F9FAFB] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Blogging"
            className="rounded-2xl shadow-md"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              About Blogify
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Blogify is a modern blogging platform designed for creators,
              writers, and storytellers. With an intuitive editor, customizable
              dashboard, and built-in engagement tools, Blogify makes it easy to
              share your voice with the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What People Say
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="bg-[#F9FAFB] p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-gray-600 italic">"{t.feedback}"</p>
                <h4 className="mt-4 font-semibold text-[#4A90E2]">
                  {t.name}
                </h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#4A90E2] to-[#50E3C2] py-20 text-center text-white">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Ready to start your blogging journey?
        </motion.h2>
        <motion.button
          className="mt-8 px-10 py-4 rounded-2xl bg-white text-[#4A90E2] font-semibold shadow-md hover:shadow-lg transition"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Now
        </motion.button>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
