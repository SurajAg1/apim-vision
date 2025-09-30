const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        Powered by{" "}
        <a
          href="https://azure.microsoft.com/en-us/services/api-management/"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Azure API Management
        </a>
        {" "}© Microsoft 2025
      </div>
    </footer>
  );
};

export default Footer;
