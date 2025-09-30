import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apimService, Product, Api } from "@/services/apim.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Grid, List, Search } from "lucide-react";
import { toast } from "sonner";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [apis, setApis] = useState<Api[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupByTag, setGroupByTag] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState("");

  useEffect(() => {
    if (productId) {
      loadProductData();
    }
  }, [productId]);

  const loadProductData = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      const [productData, apisData] = await Promise.all([
        apimService.getProduct(productId),
        apimService.getProductApis(productId)
      ]);

      setProduct(productData);
      setApis(apisData);
    } catch (error) {
      console.error("Error loading product data:", error);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = () => {
    if (!subscriptionName.trim()) {
      toast.error("Please enter a subscription name");
      return;
    }
    toast.success("Subscription request submitted");
    setSubscriptionName("");
  };

  const filteredApis = apis.filter(api =>
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Product</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={productId}>
                <SelectTrigger>
                  <SelectValue>{product.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={productId!}>{product.name}</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-4">{product.description}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You don't have subscriptions yet.</p>
            <div className="flex gap-2">
              <Input
                placeholder="Your new product subscription name"
                value={subscriptionName}
                onChange={(e) => setSubscriptionName(e.target.value)}
                className="max-w-md"
              />
              <Button onClick={handleSubscribe}>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">APIs in the product</h2>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Group by tag</span>
            <Switch checked={groupByTag} onCheckedChange={setGroupByTag} />
          </div>

          <div className="flex gap-1 border rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredApis.map((api) => (
            <Card key={api.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{api.name}</CardTitle>
                <CardDescription>{api.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to={`/apis/${api.id}`}>Go to API</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
