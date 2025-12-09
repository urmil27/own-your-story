import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Gem, Pencil, Eye } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Sparkles,
    title: "Choose Style",
    description: "Select from our curated designs or start from scratch",
  },
  {
    id: 2,
    icon: Gem,
    title: "Select Stone",
    description: "Pick your perfect certified diamond or gemstone",
  },
  {
    id: 3,
    icon: Pencil,
    title: "Personalize",
    description: "Add engravings, choose metals, make it yours",
  },
  {
    id: 4,
    icon: Eye,
    title: "Review",
    description: "Preview your creation in stunning 3D detail",
  },
];

const CustomDesignSection = () => {
  return (
    <section id="custom" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 border border-primary rounded-full" />
        <div className="absolute top-40 right-40 w-64 h-64 border border-primary rounded-full" />
        <div className="absolute top-60 right-60 w-32 h-32 border border-primary rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-primary font-script text-xl mb-3">
              Bespoke Experience
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-cream leading-tight mb-6">
              Design Your
              <br />
              <span className="text-gradient-gold">Dream Piece</span>
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-8">
              Transform your vision into reality with our interactive design studio. 
              Work with master craftsmen to create jewelry that tells your unique story.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-primary">
                  10K+
                </p>
                <p className="text-cream/60 text-sm">Custom Pieces</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-primary">
                  50+
                </p>
                <p className="text-cream/60 text-sm">Master Artisans</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-primary">
                  100%
                </p>
                <p className="text-cream/60 text-sm">Satisfaction</p>
              </div>
            </div>

            <Button variant="gold" size="xl" className="group">
              Start Your Custom Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right - Steps */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="glass-dark rounded-2xl p-6 luxury-border group hover:glow-gold transition-all duration-500"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-primary/50 text-sm font-medium mb-2">
                    Step {step.id}
                  </div>
                  <h3 className="text-cream text-lg font-heading font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-cream/60 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Connecting Lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-primary/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomDesignSection;
