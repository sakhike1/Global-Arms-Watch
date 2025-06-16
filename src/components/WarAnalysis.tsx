import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Comments from "./Comments";

const WarAnalysis = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-zinc-950 via-red-950/20 to-zinc-950 relative overflow-hidden">
      {/* Enhanced background effects with more subtle, textured approach */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2WkwtMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section with More Dramatic Typography */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-red-950/30 border border-red-900/50 px-6 py-2 rounded-full">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white/90 tracking-tight">
              CURRENT <span className="text-red-500/90">CONFLICTS</span>
            </h2>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Comprehensive analysis of ongoing military conflicts and their global strategic implications
          </p>
        </div>

        {/* Main Content Container with Enhanced Depth */}
        <div className="space-y-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 md:p-10 shadow-2xl">
          {/* Israel-Iran Tension Header */}
          <div className="text-center mb-8 space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-white/90 tracking-tight">
              ISRAEL-IRAN <span className="text-orange-500/90">TENSIONS</span>
            </h3>
            <div className="inline-flex items-center bg-red-900/40 backdrop-blur-lg border border-red-600/50 rounded-full px-5 py-2.5 hover:scale-105 transition-transform">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-red-300 font-semibold tracking-wider uppercase text-sm">Live Updates</span>
            </div>
          </div>

          {/* Cards with More Pronounced Depth and Interaction */}
          <div className="space-y-8">
            {/* Current Situation Overview */}
            <Card className="bg-zinc-800/30 backdrop-blur-xl border border-zinc-700/50 hover:border-red-600/40 transition-all duration-300 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white/90 text-2xl font-bold tracking-tight">
                  Current Situation Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-white/75 leading-relaxed">
                  The Israel-Iran conflict represents a complex geopolitical powder keg, 
                  involving multi-dimensional confrontations across diplomatic, military, and technological domains.
                </p>
                <Alert className="bg-yellow-950/30 border-yellow-700/50">
                  <AlertDescription className="text-yellow-300/90">
                    <strong>Strategic Insight:</strong> This conflict transcends bilateral tensions, 
                    with profound implications for regional and global security architectures.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Grid of Dynamic Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-zinc-800/30 backdrop-blur-xl border border-zinc-700/50 hover:border-orange-600/40 transition-all duration-300 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white/90 text-2xl">Regional Dynamics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-white/70">
                    <ul className="space-y-2">
                      {[
                        "Advanced missile defense deployments",
                        "Drone warfare escalation",
                        "Strategic naval positioning",
                        "Cyber infrastructure challenges"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-red-500 mr-2">●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800/30 backdrop-blur-xl border border-zinc-700/50 hover:border-orange-600/40 transition-all duration-300 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white/90 text-2xl">Impact Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-white/70">
                    <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50">
                      <h4 className="font-semibold text-white/90 mb-2">Proxy Conflict Zones</h4>
                      <ul className="space-y-1">
                        {[
                          { region: "Gaza Strip", status: "Active Military Operations" },
                          { region: "Lebanon", status: "Hezbollah Engagement" },
                          { region: "Syria", status: "Strategic Positioning" }
                        ].map((conflict, index) => (
                          <li key={index} className="flex justify-between">
                            <span className="text-red-400">{conflict.region}</span>
                            <span className="text-white/60 text-sm">{conflict.status}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Global Impact Stats with Enhanced Design */}
            <div className="bg-zinc-800/30 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-8 grid md:grid-cols-4 gap-6 text-center">
              {[
                { value: "$2.4T", label: "Global Military Spending", color: "text-red-500" },
                { value: "56", label: "Active Conflicts", color: "text-orange-500" },
                { value: "100M+", label: "People Affected", color: "text-yellow-500" },
                { value: "15", label: "Regional Powers", color: "text-blue-500" }
              ].map((stat, index) => (
                <div key={index} className="p-4 rounded-lg hover:bg-zinc-700/30 transition-colors">
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <Card className="bg-zinc-800/30 backdrop-blur-xl border border-zinc-700/50">
            <CardHeader>
              <CardTitle className="text-white/90 text-2xl">Community Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <Comments topicId={1} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WarAnalysis;