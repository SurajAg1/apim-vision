# Azure APIM Portal Setup Guide

This is a complete front-end replica of the Azure API Management Developer Portal, with dynamic data integration.

## Features

✅ **Complete UI Clone**
- Exact replica of Azure APIM portal design
- All pages: Home, Products, APIs, API Details, Reports, Profile
- Responsive layout matching the reference site

✅ **Dynamic Data Integration**
- Pulls data from Azure API Management APIs
- No hardcoded content (products, APIs, operations, etc.)
- Real-time data from your APIM instance

✅ **Azure AD Authentication**
- MSAL (Microsoft Authentication Library) integration
- OAuth 2.0 client credentials flow
- Secure token management

## Configuration

### 1. Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Then fill in your Azure credentials:

```env
VITE_AZURE_CLIENT_ID=your-actual-client-id
VITE_AZURE_TENANT_ID=your-actual-tenant-id
VITE_AZURE_CLIENT_SECRET=your-actual-client-secret
```

### 2. APIM Configuration

The APIM configuration is located in `src/config/apim.config.ts`:

```typescript
export const apimConfig = {
  backendUrl: "https://mtbank-apim-1.developer.azure-api.net/",
  managementApiUrl: "https://management.azure.com/subscriptions/181821eb-6bc1-41fa-bba6-5bfecf56c48f/resourceGroups/mtbank-rg-1/providers/Microsoft.ApiManagement/service/mtbank-apim-1",
  subscriptionId: "181821eb-6bc1-41fa-bba6-5bfecf56c48f",
  resourceGroupName: "mtbank-rg-1",
  serviceName: "mtbank-apim-1",
  // ... other settings
};
```

These values match your Azure APIM instance as specified.

### 3. Azure AD App Registration

To enable authentication, you need to register an application in Azure AD:

1. Go to Azure Portal > Azure Active Directory > App registrations
2. Create a new registration
3. Configure redirect URIs (e.g., `http://localhost:8080` for development)
4. Generate a client secret
5. Grant API permissions:
   - Azure Service Management > user_impersonation
   - Microsoft Graph > User.Read (optional, for user profile)
6. Copy the Application (client) ID and Directory (tenant) ID to your `.env` file

## Running the Application

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx      # Main navigation
│   ├── Footer.tsx      # Footer with APIM attribution
│   └── ui/             # shadcn UI components
├── config/
│   └── apim.config.ts  # Azure APIM configuration
├── pages/              # Route pages
│   ├── Home.tsx        # Landing page with hero
│   ├── Products.tsx    # Products listing
│   ├── ProductDetails.tsx
│   ├── Apis.tsx        # APIs listing
│   ├── ApiDetails.tsx  # API details with operations
│   ├── Reports.tsx     # Analytics & reports
│   └── Profile.tsx     # User profile & subscriptions
├── services/
│   └── apim.service.ts # APIM API integration
└── App.tsx             # Main app with routing & MSAL
```

## API Integration

The application integrates with Azure APIM Management APIs:

- **Products**: `GET /products` - List all products
- **APIs**: `GET /apis` - List all APIs
- **API Operations**: `GET /apis/{apiId}/operations` - Get API operations
- **Subscriptions**: `GET /subscriptions` - User subscriptions
- **Product APIs**: `GET /products/{productId}/apis` - APIs in a product

All API calls are handled by `src/services/apim.service.ts` with automatic fallback to mock data during development.

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Client secrets** should only be used server-side in production
3. For production, implement a backend proxy to handle APIM Management API calls
4. Use environment-specific configurations for different deployment stages
5. Enable CORS properly in your APIM instance if accessing from browser

## Features Implemented

✅ Home page with hero section and feature cards
✅ Products listing with search and view modes (grid/list)
✅ Product details with subscription management
✅ APIs listing with search, filters, and grouping
✅ API details page with operations sidebar
✅ API operations with method badges and testing interface
✅ Reports page with analytics sections
✅ User profile with account details and subscriptions
✅ Azure AD authentication with MSAL
✅ Responsive navigation and footer
✅ Clean, professional Azure-inspired design
✅ Dynamic data from APIM Management APIs
✅ Mock data fallback for development

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation
- **MSAL** - Azure AD authentication
- **Axios** - HTTP client
- **Tanstack Query** - Data fetching

## Customization

To customize the design, edit:
- `src/index.css` - Design system tokens (colors, spacing)
- `tailwind.config.ts` - Tailwind theme configuration
- `src/components/ui/` - shadcn component variants

## Support

For Azure APIM documentation:
- [Azure API Management Documentation](https://docs.microsoft.com/en-us/azure/api-management/)
- [APIM REST API Reference](https://docs.microsoft.com/en-us/rest/api/apimanagement/)
- [MSAL for React](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react)

## License

This project matches the design and functionality of Azure API Management Developer Portal.
© Microsoft 2025
