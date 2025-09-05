import { useState } from "react";

function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="font-[Inter] bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Share your stories with the world
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A simple, powerful platform for writers and creators. 
            Start your blog today and connect with readers everywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Start Writing Free
            </a>
            <a
              href="/demo"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              View Demo
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to blog
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple tools that help you focus on what matters most - your content.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Editor",
                description: "Clean, distraction-free writing experience with formatting tools when you need them.",
                icon: "✍️"
              },
              {
                title: "Mobile Ready",
                description: "Your blog looks great on all devices. Write and manage from anywhere.",
                icon: "📱"
              },
              {
                title: "Fast Loading",
                description: "Optimized for speed so your readers stay engaged with your content.",
                icon: "⚡"
              },
              {
                title: "Custom Domains",
                description: "Use your own domain name to build your brand and professional presence.",
                icon: "🌐"
              },
              {
                title: "Analytics",
                description: "Understand your audience with simple, actionable insights about your posts.",
                icon: "📊"
              },
              {
                title: "SEO Optimized",
                description: "Built-in SEO features help your content get discovered by search engines.",
                icon: "🔍"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-gray-200">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Built for writers who want to focus on writing
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We believe great content shouldn't be held back by complicated tools. 
              Blogify gives you everything you need to share your ideas without the bloat.
            </p>
            <p className="text-gray-600 mb-8">
              Join thousands of writers, creators, and businesses who trust Blogify 
              to power their online presence.
            </p>
            <a
              href="/about"
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
            >
              Learn more about our story →
            </a>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Person writing"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple pricing for everyone
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you need more features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                $0<span className="text-lg text-gray-600 font-normal">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Up to 3 blog posts
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Basic themes
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Blogify subdomain
                </li>
              </ul>
              <a
                href="/register"
                className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold text-center block hover:bg-gray-200 transition"
              >
                Get Started
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-lg border-2 border-indigo-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <p className="text-gray-600 mb-6">For serious bloggers</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                $12<span className="text-lg text-gray-600 font-normal">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Unlimited blog posts
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Premium themes
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Custom domain
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Priority support
                </li>
              </ul>
              <a
                href="/register"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-center block hover:bg-indigo-700 transition"
              >
                Start 14-day free trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to start your blog?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of writers who've already made the switch to Blogify.
          </p>
          <a
            href="/register"
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition"
          >
            Get Started for Free
          </a>
        </div>
      </section>
    </div>
  );
}

export default Landing;