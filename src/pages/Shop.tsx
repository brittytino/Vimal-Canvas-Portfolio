import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { artworkData, categories } from "@/data/artworkData";
import { ShoppingCart, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const { toast } = useToast();

  const filteredAndSortedArtwork = artworkData
    .filter(artwork => {
      const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || artwork.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const addToCart = (artwork: any) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find((item: any) => item.id === artwork.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...artwork, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    toast({
      title: "Added to Cart!",
      description: `${artwork.title} has been added to your cart.`,
    });

    // Trigger a custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Get cart items count
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const cartCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Art Shop
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse and order beautiful pencil artwork for your home or as perfect gifts
          </p>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-6 bg-card rounded-lg shadow-card">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search artwork..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>

          <Link to="/cart">
            <Button variant="outline" className="w-full">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({cartCount})
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedArtwork.map((artwork) => (
            <Card key={artwork.id} className="group overflow-hidden hover:shadow-artistic transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={artwork.image} 
                  alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {artwork.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="font-serif">{artwork.title}</CardTitle>
                <CardDescription>{artwork.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">₹{artwork.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Delivery: {artwork.deliveryTime}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    variant="hero"
                    onClick={() => addToCart(artwork)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Link to="/order" state={{ selectedArtwork: artwork }}>
                    <Button variant="outline">
                      Order Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedArtwork.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No artwork found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortBy("name");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Custom Order CTA */}
        <div className="mt-16 p-8 bg-gradient-hero text-primary-foreground rounded-lg shadow-artistic text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">
            Need Something Custom?
          </h2>
          <p className="mb-6 text-primary-foreground/90">
            We create personalized artwork based on your photos and preferences
          </p>
          <Link to="/order">
            <Button variant="accent" size="lg">
              Request Custom Artwork
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shop;