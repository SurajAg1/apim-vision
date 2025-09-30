import { Link, useLocation } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/apis", label: "APIs" },
    { path: "/reports", label: "Reports" },
    { path: "/profile", label: "Profile" },
  ];

  const handleSignIn = () => {
    instance.loginPopup().catch((e) => {
      console.error(e);
    });
  };

  const handleSignOut = () => {
    instance.logoutPopup().catch((e) => {
      console.error(e);
    });
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="h-5 w-5" />
            <span>API portal</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded hover:bg-secondary ${
                  isActive(link.path)
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button onClick={handleSignOut} variant="outline">
              Sign out
            </Button>
          ) : (
            <>
              <Button onClick={handleSignIn} variant="outline">
                Sign In
              </Button>
              <Button onClick={handleSignIn}>
                Sign out
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
