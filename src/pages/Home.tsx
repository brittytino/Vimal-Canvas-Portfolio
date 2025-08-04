import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/data/artworkData";
import heroBackground from "@/assets/hero-background.jpg";
import familyPortrait from "@/assets/family-portrait-1.jpg";
import babyPortrait from "@/assets/baby-portrait-1.jpg";
import couplePortrait from "@/assets/couple-portrait-1.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Bring Emotions to Paper
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-light">by Vimal</p>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Transform your precious memories into timeless pencil art. 
            Professional portrait drawings that capture the essence of your loved ones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="hero" size="lg" className="text-lg px-8 py-3">
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="artist" size="lg" className="text-lg px-8 py-3">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Art Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specializing in various forms of pencil art and custom portraits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Portrait Pencil Drawing",
                description: "Realistic portraits that capture every detail and emotion",
                icon: "👨‍🎨",
                price: "From ₹1,500"
              },
              {
                title: "Family Portraits", 
                description: "Beautiful family drawings preserving precious moments",
                icon: "👨‍👩‍👧‍👦",
                price: "From ₹2,500"
              },
              {
                title: "Baby Portraits",
                description: "Adorable baby drawings capturing innocence and joy",
                icon: "👶",
                price: "From ₹1,800"
              },
              {
                title: "Couple Portraits",
                description: "Romantic couple drawings celebrating love stories",
                icon: "💑",
                price: "From ₹2,200"
              },
              {
                title: "Wall Painting",
                description: "Custom wall art to transform your living spaces",
                icon: "🎨",
                price: "From ₹5,000"
              },
              {
                title: "Color Pencil Art",
                description: "Vibrant colored pencil artwork bringing life to drawings",
                icon: "🌈",
                price: "From ₹3,000"
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-artistic transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="font-serif">{service.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {service.price}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Featured Artwork
            </h2>
            <p className="text-lg text-muted-foreground">
              Some of our recent masterpieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { image: familyPortrait, title: "Family Love", category: "Family Portrait" },
              { image: babyPortrait, title: "Little Angel", category: "Baby Portrait" },
              { image: couplePortrait, title: "Eternal Bond", category: "Couple Portrait" }
            ].map((work, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-artistic transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-lg mb-2">{work.title}</h3>
                  <p className="text-muted-foreground">{work.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button variant="accent" size="lg">
                View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, number: "500+", label: "Happy Clients" },
              { icon: Heart, number: "1000+", label: "Portraits Created" },
              { icon: Star, number: "5.0", label: "Average Rating" },
              { icon: Clock, number: "3", label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <stat.icon className="h-8 w-8 text-accent mb-4" />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              What Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Testimonials from satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.review}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Create Your Masterpiece?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Let's bring your memories to life with beautiful pencil art
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="accent" size="lg" className="text-lg px-8 py-3">
                Start Your Order
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="artist" size="lg" className="text-lg px-8 py-3 bg-white/10 border-white/30 hover:bg-white hover:text-primary">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;