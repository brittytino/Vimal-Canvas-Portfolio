import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Eye, CheckCircle, Package, MessageSquare, BarChart3, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [orders, setOrders] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is already logged in
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const loadData = () => {
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    const messagesData = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    setOrders(ordersData);
    setMessages(messagesData);
    
    // Calculate stats
    const totalOrders = ordersData.length;
    const pendingOrders = ordersData.filter((order: any) => order.status === 'Pending').length;
    const deliveredOrders = ordersData.filter((order: any) => order.status === 'Delivered').length;
    const totalRevenue = ordersData
      .filter((order: any) => order.status === 'Delivered')
      .reduce((sum: number, order: any) => sum + order.total, 0);
    
    setStats({
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalRevenue
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem('adminSession', 'true');
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminSession');
    setLoginForm({ username: "", password: "" });
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    loadData(); // Refresh stats
    
    toast({
      title: "Order Updated",
      description: `Order ${orderId} marked as ${newStatus}`,
    });
  };

  const deleteOrder = (orderId: string) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    loadData(); // Refresh stats
    
    toast({
      title: "Order Deleted",
      description: "Order has been removed from the system.",
    });
  };

  const deleteMessage = (messageId: string) => {
    const updatedMessages = messages.filter(message => message.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    toast({
      title: "Message Deleted",
      description: "Message has been removed.",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" variant="hero" className="w-full">
                Login
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Demo: admin / admin123
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Admin Dashboard
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.deliveredOrders}</p>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No orders found.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <h3 className="font-semibold">{order.id}</h3>
                                <Badge 
                                  variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                                  className={order.status === 'Delivered' ? 'bg-green-500' : ''}
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                <strong>Customer:</strong> {order.name} ({order.phone})
                              </p>
                              <p className="text-sm text-muted-foreground mb-1">
                                <strong>Artwork:</strong> {order.artworkType}
                              </p>
                              <p className="text-sm text-muted-foreground mb-1">
                                <strong>Address:</strong> {order.address}, {order.city}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                              </p>
                            </div>
                            
                            <div className="flex flex-col items-end gap-2">
                              <p className="text-lg font-bold text-primary">
                                ₹{order.total.toLocaleString()}
                              </p>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Order Details - {order.id}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-semibold mb-2">Customer Info</h4>
                                          <p><strong>Name:</strong> {order.name}</p>
                                          <p><strong>Phone:</strong> {order.phone}</p>
                                          <p><strong>Email:</strong> {order.email}</p>
                                        </div>
                                        <div>
                                          <h4 className="font-semibold mb-2">Order Info</h4>
                                          <p><strong>Artwork:</strong> {order.artworkType}</p>
                                          <p><strong>Total:</strong> ₹{order.total.toLocaleString()}</p>
                                          <p><strong>Status:</strong> {order.status}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">Address</h4>
                                        <p>{order.address}, {order.city}, {order.state} - {order.pincode}</p>
                                      </div>
                                      {order.customRequirements && (
                                        <div>
                                          <h4 className="font-semibold mb-2">Special Requirements</h4>
                                          <p>{order.customRequirements}</p>
                                        </div>
                                      )}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                
                                <Select 
                                  value={order.status} 
                                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Processing">Processing</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                  </SelectContent>
                                </Select>
                                
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => deleteOrder(order.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No messages found.</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <Card key={message.id} className="border">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <h3 className="font-semibold">{message.subject}</h3>
                                <Badge variant="secondary">{message.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                <strong>From:</strong> {message.name} ({message.email})
                              </p>
                              {message.phone && (
                                <p className="text-sm text-muted-foreground mb-2">
                                  <strong>Phone:</strong> {message.phone}
                                </p>
                              )}
                              <p className="text-sm mb-2">{message.message}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(message.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => deleteMessage(message.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;