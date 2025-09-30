import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apimService, Api, ApiOperation } from "@/services/apim.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const ApiDetails = () => {
  const { apiId } = useParams<{ apiId: string }>();
  const [api, setApi] = useState<Api | null>(null);
  const [operations, setOperations] = useState<ApiOperation[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<ApiOperation | null>(null);
  const [loading, setLoading] = useState(true);
  const [operationsExpanded, setOperationsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (apiId) {
      loadApiData();
    }
  }, [apiId]);

  const loadApiData = async () => {
    if (!apiId) return;
    
    try {
      setLoading(true);
      const [apiData, operationsData] = await Promise.all([
        apimService.getApi(apiId),
        apimService.getApiOperations(apiId)
      ]);
      
      setApi(apiData);
      setOperations(operationsData);
      if (operationsData.length > 0) {
        setSelectedOperation(operationsData[0]);
      }
    } catch (error) {
      console.error("Error loading API data:", error);
      toast.error("Failed to load API details");
    } finally {
      setLoading(false);
    }
  };

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: "bg-green-500/10 text-green-700 border-green-200",
      POST: "bg-blue-500/10 text-blue-700 border-blue-200",
      PUT: "bg-orange-500/10 text-orange-700 border-orange-200",
      DELETE: "bg-red-500/10 text-red-700 border-red-200",
      HEAD: "bg-purple-500/10 text-purple-700 border-purple-200",
    };
    return colors[method] || "bg-gray-500/10 text-gray-700 border-gray-200";
  };

  const filteredOperations = operations.filter(op =>
    op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    op.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">Loading API details...</div>
      </div>
    );
  }

  if (!api) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">API not found</div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar */}
      <aside className="w-80 border-r bg-card overflow-y-auto">
        <div className="p-4 border-b">
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">API</label>
            <Select value={apiId}>
              <SelectTrigger>
                <SelectValue>{api.name}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={apiId!}>{api.name}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setOperationsExpanded(!operationsExpanded)}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <span>Operations</span>
              {operationsExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {operationsExpanded && (
            <>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9"
                />
              </div>

              <div className="space-y-1">
                {filteredOperations.map((operation) => (
                  <button
                    key={operation.id}
                    onClick={() => setSelectedOperation(operation)}
                    className={`w-full text-left p-3 rounded text-sm hover:bg-secondary transition-colors ${
                      selectedOperation?.id === operation.id ? "bg-secondary" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium ${getMethodColor(operation.method)}`}
                      >
                        {operation.method}
                      </Badge>
                    </div>
                    <div className="font-medium">{operation.name}</div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{api.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" size="sm">
                Download definition
              </Button>
              <Select defaultValue="openapi3">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openapi3">Open API 3 (YAML)</SelectItem>
                  <SelectItem value="openapi3json">Open API 3 (JSON)</SelectItem>
                  <SelectItem value="openapi2json">Open API 2 (JSON)</SelectItem>
                  <SelectItem value="wadl">WADL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-muted-foreground">{api.description}</p>
          </div>

          {selectedOperation && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    variant="outline"
                    className={`font-medium ${getMethodColor(selectedOperation.method)}`}
                  >
                    {selectedOperation.method}
                  </Badge>
                  <CardTitle className="text-xl">{selectedOperation.name}</CardTitle>
                </div>
                <CardDescription>{selectedOperation.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Endpoint:</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono">
                        {selectedOperation.method}
                      </Badge>
                      <code className="flex-1 p-2 bg-muted rounded text-sm">
                        {api.serviceUrl}{selectedOperation.urlTemplate}
                      </code>
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full sm:w-auto">
                    Try this operation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ApiDetails;
