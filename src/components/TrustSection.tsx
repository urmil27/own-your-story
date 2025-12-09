import { Shield, Award, RefreshCw, Leaf, Quote } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Certified Diamonds",
    description: "Every diamond comes with GIA certification for guaranteed quality",
  },
  {
    icon: Award,
    title: "Lifetime Warranty",
    description: "Complete protection and free maintenance for life",
  },
  {
    icon: RefreshCw,
    title: "Free Resizing",
    description: "Complimentary resizing within the first year of purchase",
  },
  {
    icon: Leaf,
    title: "Ethically Sourced",
    description: "Conflict-free diamonds and sustainable practices",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "New York",
    text: "The custom engagement ring exceeded all expectations. The attention to detail is remarkable.",
    rating: 5,
  },
  {
    id: 2,
    name: "James L.",
    location: "Los Angeles",
    text: "Working with OWN-it was a dream. They brought my vision to life perfectly.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily R.",
    location: "Chicago",
    text: "Exceptional craftsmanship and outstanding customer service. Highly recommend!",
    rating: 5,
  },
];

const TrustSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Trust Features */}
        <div className="text-center mb-20">
          <p className="text-primary font-script text-xl mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Excellence in Every Detail
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {trustFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-foreground text-lg font-heading font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-muted rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <p className="text-primary font-script text-xl mb-3">Testimonials</p>
            <h3 className="text-2xl md:text-4xl font-heading font-bold text-foreground">
              Stories from Our Clients
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-card rounded-2xl p-6 shadow-card hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-primary text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
