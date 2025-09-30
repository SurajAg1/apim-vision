import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMsal } from "@azure/msal-react";

const Profile = () => {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User profile</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Account details</CardTitle>
        </CardHeader>
        <CardContent>
          {isAuthenticated ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {accounts[0].name}</p>
              <p><strong>Email:</strong> {accounts[0].username}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">User not found</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Subscriptions not found</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
