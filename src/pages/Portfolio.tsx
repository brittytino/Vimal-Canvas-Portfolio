import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { artworkData, categories } from "@/data/artworkData";
import { Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArtwork = selectedCategory === "All" 
    ? artworkData 
    : artworkData.filter(artwork => artwork.category === selectedCategory);

  const addToCart = (artwork: any) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find((item: any) => item.id === artwork.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...artwork, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Trigger a custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Portfolio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of beautiful pencil art and discover the perfect piece for you
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-12">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xs md:text-sm"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtwork.map((artwork) => (
                <Card key={artwork.id} className="group overflow-hidden hover:shadow-artistic transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={artwork.image} 
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle className="font-serif text-2xl">{artwork.title}</DialogTitle>
                            </DialogHeader>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="aspect-square overflow-hidden rounded-lg">
                                <img 
                                  src={artwork.image} 
                                  alt={artwork.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="space-y-4">
                                <Badge variant="secondary">{artwork.category}</Badge>
                                <p className="text-muted-foreground">{artwork.description}</p>
                                <div className="space-y-2">
                                  <p className="text-sm"><strong>Price:</strong> ₹{artwork.price.toLocaleString()}</p>
                                  <p className="text-sm"><strong>Delivery:</strong> {artwork.deliveryTime}</p>
                                </div>
                                <Button 
                                  className="w-full" 
                                  variant="hero"
                                  onClick={() => addToCart(artwork)}
                                >
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          variant="hero"
                          onClick={() => addToCart(artwork)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif font-semibold text-lg">{artwork.title}</h3>
                      <Badge variant="secondary">{artwork.category}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{artwork.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold text-primary">₹{artwork.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{artwork.deliveryTime}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addToCart(artwork)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredArtwork.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No artwork found in this category.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-card rounded-lg shadow-card">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-muted-foreground mb-6">
            We create custom artwork tailored to your specific needs and preferences
          </p>
          <Link to="/contact">
            <Button variant="hero" size="lg">
              Request Custom Artwork
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;