import React from "react";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  UserGroupIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-xl shadow-lg"
  >
    <div className="flex flex-col items-center text-center">
      <Icon className="w-12 h-12 text-emerald-500 mb-4" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const HomePage = () => {
  const features = [
    {
      icon: AcademicCapIcon,
      title: "Expert Tutors",
      description: "Learn from qualified and experienced tutors in your field",
    },
    {
      icon: UserGroupIcon,
      title: "1-on-1 Sessions",
      description: "Personalized attention and focused learning experience",
    },
    {
      icon: ClockIcon,
      title: "Flexible Timing",
      description: "Schedule sessions at your convenience",
    },
    {
      icon: SparklesIcon,
      title: "Interactive Learning",
      description: "Engaging sessions with real-time doubt clearing",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <img
              src={logo}
              alt="logo"
              className="h-[120px] md:h-[200px] mb-8 hover:scale-105 transition-transform duration-300"
            />

            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Transform Your Learning Journey
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-8">
              <p className="text-2xl md:text-4xl font-bold">Prepare for</p>
              <ReactTyped
                className="text-2xl md:text-4xl font-bold text-emerald-400"
                strings={[
                  "School exams",
                  "PSC exams",
                  "UPSC exams",
                  "Competitive Exams",
                ]}
                typeSpeed={120}
                backSpeed={140}
                loop
              />
            </div>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl text-center mb-12">
              Connect with expert tutors who can guide you through your academic
              journey and help you achieve your goals.
            </p>

            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Start Learning Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide the tools and expertise you need to excel in your
              studies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Start Your Learning Journey?
          </h2>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Get Started Now
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
