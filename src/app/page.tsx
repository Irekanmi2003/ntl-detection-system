import Link from "next/link"
import { BarChart3, Shield, Zap, Database, Brain, TrendingUp } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Fraud Detection",
      description: "AI-powered detection of electricity theft and meter tampering"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Live monitoring of consumption patterns and anomaly detection"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Alerts",
      description: "Instant notifications for suspicious activities"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Management",
      description: "Efficient handling of meter data with CSV uploads"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Machine Learning",
      description: "Advanced algorithms for pattern recognition"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Revenue Protection",
      description: "Reduce non-technical losses for power distribution companies"
    }
  ]

  const stats = [
    { value: "90%+", label: "Detection Accuracy" },
    { value: "60%", label: "Revenue Loss Reduction" },
    { value: "Real-time", label: "Monitoring" },
    { value: "AI-Powered", label: "Analytics" }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">NTL Detect</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-300 transition">Home</Link>
            <Link href="/collect" className="hover:text-blue-300 transition">Dashboard</Link>
            <Link href="/analytics" className="hover:text-blue-300 transition">Analytics</Link>
            <Link href="/about" className="hover:text-blue-300 transition">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm mb-8">
            🎓 University of Lagos Research Project
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AI-Powered NTL Detection
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Advanced <span className="font-semibold text-white">Machine Learning System</span> for detecting
            Non-Technical Losses in prepaid electricity networks. Combat theft, reduce revenue loss,
            and ensure fair energy distribution.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              href="/collect"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2"
            >
              <Database className="w-5 h-5" />
              <span>Launch Dashboard</span>
            </Link>
            <Link
              href="/analytics"
              className="px-8 py-4 border border-blue-400/30 text-blue-300 rounded-xl font-semibold hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <BarChart3 className="w-5 h-5" />
              <span>View Analytics</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-800/50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive solution for detecting and preventing non-technical losses in electricity distribution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Three simple steps to detect anomalies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold mb-4">Data Collection</h3>
              <p className="text-gray-400">
                Upload meter consumption data via CSV or manual entry. System validates and processes the data.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
              <p className="text-gray-400">
                Machine learning algorithms analyze patterns and detect anomalies in real-time.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold mb-4">Results & Alerts</h3>
              <p className="text-gray-400">
                View detected anomalies through interactive dashboards and receive instant alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Detect Anomalies?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Start using our AI-powered system to protect your electricity distribution network from revenue losses.
          </p>
          <Link
            href="/collect"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            <Zap className="w-5 h-5" />
            <span>Get Started Now</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 border-t border-slate-700">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold">NTL Detection System</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 AI NTL Detection Project | Department of Systems Engineering, University of Lagos
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/about" className="text-gray-400 hover:text-white transition text-sm">About</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition text-sm">Contact</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition text-sm">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}