import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { artworkData } from "@/data/artworkData";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { cartItems, total, selectedArtwork } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
    artworkType: selectedArtwork?.title || "",
    customRequirements: "",
    referencePhoto: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        referencePhoto: e.target.files[0]
      });
    }
  };

  const calculateOrderTotal = () => {
    if (cartItems && cartItems.length > 0) {
      return total;
    } else if (selectedArtwork) {
      return selectedArtwork.price + 200; // Adding delivery charge
    }
    return 1500; // Default custom artwork price
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Create order object
    const order = {
      id: `ORDER-${Date.now()}`,
      ...formData,
      items: cartItems || [selectedArtwork || { title: "Custom Artwork", price: 1500 }],
      total: calculateOrderTotal(),
      status: "Pending",
      orderDate: new Date().toISOString(),
      referencePhotoName: formData.referencePhoto?.name || null
    };

    // Store order in localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Clear cart if this was a cart order
    if (cartItems) {
      localStorage.removeItem('cartItems');
      window.dispatchEvent(new Event('cartUpdated'));
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${order.id} has been received. We'll contact you soon.`,
      });
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-8" />
          <h1 className="text-3xl font-serif font-bold text-primary mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We'll contact you within 24 hours to confirm the details 
            and start working on your beautiful artwork.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="hero" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            <Button variant="outline" onClick={() => navigate("/shop")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 text-center">
          Place Your Order
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="Kerala">Kerala</SelectItem>
                        <SelectItem value="Karnataka">Karnataka</SelectItem>
                        <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Pincode"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Artwork Details */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Artwork Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="artworkType">Type of Artwork</Label>
                  <Select 
                    value={formData.artworkType} 
                    onValueChange={(value) => setFormData({...formData, artworkType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select artwork type" />
                    </SelectTrigger>
                    <SelectContent>
                      {artworkData.map((artwork) => (
                        <SelectItem key={artwork.id} value={artwork.title}>
                          {artwork.title} - ₹{artwork.price.toLocaleString()}
                        </SelectItem>
                      ))}
                      <SelectItem value="Custom Artwork">Custom Artwork - ₹1,500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="customRequirements">Special Requirements</Label>
                  <Textarea
                    id="customRequirements"
                    name="customRequirements"
                    value={formData.customRequirements}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or customizations..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="referencePhoto">Reference Photo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="referencePhoto"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="referencePhoto" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {formData.referencePhoto 
                          ? formData.referencePhoto.name 
                          : "Click to upload reference photo"
                        }
                      </p>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-serif">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems ? (
                  <>
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.title} x{item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex justify-between text-sm">
                    <span>{selectedArtwork?.title || "Custom Artwork"}</span>
                    <span>₹{(selectedArtwork?.price || 1500).toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span>Delivery Charges</span>
                  <span>₹200</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{calculateOrderTotal().toLocaleString()}</span>
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• We'll contact you within 24 hours</p>
                  <p>• 50% advance payment required</p>
                  <p>• 7-day money back guarantee</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;