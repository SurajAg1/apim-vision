import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-hero-from to-hero-to py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                Transform ideas into reality with our APIs
              </h1>
              <p className="text-lg text-foreground/80 max-w-xl">
                Our API Developer Portal offers the tools you need to explore, test, and integrate APIs with ease. Start building today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/apis">
                    Explore APIs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/products">Sign up</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <div className="text-muted-foreground text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-sm">API Integration Illustration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Important features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Documentation</h3>
              <p className="text-muted-foreground">
                Access detailed API documentation with examples, schemas, and interactive testing capabilities.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security with OAuth 2.0, API keys, and subscription management.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Monitoring</h3>
              <p className="text-muted-foreground">
                Track API usage, performance metrics, and get insights into your integration health.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
