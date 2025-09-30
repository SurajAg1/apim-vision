// Azure APIM Configuration
// Replace REPLACE_WITH_ENV_VAR with actual environment variables in production

export const apimConfig = {
  backendUrl: "https://mtbank-apim-1.developer.azure-api.net/",
  managementApiUrl: "https://management.azure.com/subscriptions/181821eb-6bc1-41fa-bba6-5bfecf56c48f/resourceGroups/mtbank-rg-1/providers/Microsoft.ApiManagement/service/mtbank-apim-1",
  armEndpoint: "management.azure.com",
  subscriptionId: "181821eb-6bc1-41fa-bba6-5bfecf56c48f",
  resourceGroupName: "mtbank-rg-1",
  serviceName: "mtbank-apim-1",
  
  // These should be set via environment variables in production
  // For now, using placeholders
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || "REPLACE_WITH_ENV_VAR",
    tenantId: import.meta.env.VITE_AZURE_TENANT_ID || "REPLACE_WITH_ENV_VAR",
    clientSecret: import.meta.env.VITE_AZURE_CLIENT_SECRET || "REPLACE_WITH_ENV_VAR",
  }
};

export const msalConfig = {
  auth: {
    clientId: apimConfig.auth.clientId,
    authority: `https://login.microsoftonline.com/${apimConfig.auth.tenantId}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
  scopes: ["https://management.azure.com/.default"]
};
