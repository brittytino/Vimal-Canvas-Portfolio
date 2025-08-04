import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Store message in localStorage (in a real app, this would be sent to a server)
    const message = {
      id: `MSG-${Date.now()}`,
      ...formData,
      timestamp: new Date().toISOString(),
      status: "New"
    };

    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    existingMessages.push(message);
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
    }, 1000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm interested in your pencil art services. Can you please provide more information?");
    window.open(`https://wa.me/919965262733?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question about our artwork or want to discuss a custom project? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Phone className="h-5 w-5 text-accent" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">+91 9965262733</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Available Mon - Sat, 9 AM - 7 PM
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => window.open('tel:+919965262733')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick responses via WhatsApp chat
                </p>
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={openWhatsApp}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  Service Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Tamil Nadu</p>
                <p className="text-sm text-muted-foreground mt-1">
                  We deliver artwork all across Tamil Nadu
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Instagram className="h-5 w-5 text-accent" />
                  Instagram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">@___vimal__arts_03</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Follow for latest artwork updates
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => window.open('https://instagram.com/___vimal__arts_03', '_blank')}
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Follow on Instagram
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Working Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span>9 AM - 7 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>By Appointment</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-artistic">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project or question..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif font-bold text-primary text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How long does it take to complete a portrait?",
                answer: "Typically 5-10 days depending on the complexity and size of the artwork."
              },
              {
                question: "What if I'm not satisfied with the artwork?",
                answer: "We offer a 7-day money back guarantee and unlimited revisions until you're happy."
              },
              {
                question: "Do you deliver outside Tamil Nadu?",
                answer: "Currently we deliver only within Tamil Nadu, but we're planning to expand soon."
              },
              {
                question: "What photo quality do you need for portraits?",
                answer: "High-resolution photos work best, but we can work with most clear photos you have."
              },
              {
                question: "Can I request custom sizes?",
                answer: "Yes! We create artwork in various sizes. Contact us for custom size pricing."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept cash on delivery, UPI, bank transfer, and online payments."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;