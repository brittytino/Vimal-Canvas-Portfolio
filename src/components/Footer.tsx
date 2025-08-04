import { Phone, MapPin, Clock, Heart, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Contact Vimal</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <a href="https://wa.me/919965262733" className="hover:text-accent transition-colors">
                  +91 9965262733
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="h-5 w-5 text-accent" />
                <a href="https://instagram.com/___vimal__arts_03" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  @___vimal__arts_03
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span>Delivery all over Tamil Nadu</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-accent" />
                <span>Mon - Sat: 9AM - 7PM</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Portrait Pencil Drawing</li>
              <li>Color Pencil Art</li>
              <li>Stencil Art</li>
              <li>Wall Painting</li>
              <li>Family & Couple Portraits</li>
              <li>Baby Portraits</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">About</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Bringing emotions to paper through the art of pencil drawing. 
              Each portrait tells a story, captures a moment, and preserves memories 
              that last a lifetime.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-accent" fill="currentColor" /> for art lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;