import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState("all");
  const [timeRange, setTimeRange] = useState("7days");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reports</h1>

      <div className="flex gap-4 mb-8">
        <Select value={selectedReport} onValueChange={setSelectedReport}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select report" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All reports</SelectItem>
            <SelectItem value="api-calls">API Calls</SelectItem>
            <SelectItem value="data-transfer">Data Transfer</SelectItem>
            <SelectItem value="response-times">API Response Times</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Transfer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Response Times</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Products</CardTitle>
              <div className="flex gap-4 text-sm font-medium">
                <span>Successful calls</span>
                <span>Blocked calls</span>
                <span>Failed calls</span>
                <span>Other calls</span>
                <span>Total calls</span>
                <span>Response time</span>
                <span>Bandwidth</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Subscriptions</CardTitle>
              <div className="flex gap-4 text-sm font-medium">
                <span>Successful calls</span>
                <span>Blocked calls</span>
                <span>Failed calls</span>
                <span>Other calls</span>
                <span>Total calls</span>
                <span>Response time</span>
                <span>Bandwidth</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>APIs</CardTitle>
              <div className="flex gap-4 text-sm font-medium">
                <span>Successful calls</span>
                <span>Blocked calls</span>
                <span>Failed calls</span>
                <span>Other calls</span>
                <span>Total calls</span>
                <span>Response time</span>
                <span>Bandwidth</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Operations</CardTitle>
              <div className="flex gap-4 text-sm font-medium">
                <span>Successful calls</span>
                <span>Blocked calls</span>
                <span>Failed calls</span>
                <span>Other calls</span>
                <span>Total calls</span>
                <span>Response time</span>
                <span>Bandwidth</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No data</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
