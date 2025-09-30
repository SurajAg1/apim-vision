import axios from 'axios';
import { apimConfig } from '@/config/apim.config';

const API_VERSION = '2021-08-01';

// Types for APIM entities
export interface Product {
  id: string;
  name: string;
  description: string;
  terms?: string;
  subscriptionRequired: boolean;
  approvalRequired: boolean;
  subscriptionsLimit?: number;
  state: string;
}

export interface Api {
  id: string;
  name: string;
  description: string;
  serviceUrl: string;
  path: string;
  protocols: string[];
  isCurrent: boolean;
  apiRevision: string;
  apiType: string;
  subscriptionKeyParameterNames?: {
    header: string;
    query: string;
  };
}

export interface ApiOperation {
  id: string;
  name: string;
  method: string;
  urlTemplate: string;
  description: string;
  request?: {
    description?: string;
    queryParameters?: any[];
    headers?: any[];
    representations?: any[];
  };
}

export interface Subscription {
  id: string;
  name: string;
  scope: string;
  state: string;
  createdDate: string;
  startDate?: string;
  expirationDate?: string;
  primaryKey: string;
  secondaryKey: string;
}

class ApimService {
  private getHeaders(token?: string) {
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Products
  async getProducts(token?: string): Promise<Product[]> {
    try {
      const url = `${apimConfig.managementApiUrl}/products?api-version=${API_VERSION}`;
      const response = await axios.get(url, {
        headers: this.getHeaders(token)
      });
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return mock data for development
      return this.getMockProducts();
    }
  }

  async getProduct(productId: string, token?: string): Promise<Product | null> {
    try {
      const url = `${apimConfig.managementApiUrl}/products/${productId}?api-version=${API_VERSION}`;
      const response = await axios.get(url, {
        headers: this.getHeaders(token)
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  // APIs
  async getApis(token?: string): Promise<Api[]> {
    try {
      const url = `${apimConfig.managementApiUrl}/apis?api-version=${API_VERSION}`;
      const response = await axios.get(url, {
        headers: this.getHeaders(token)
      });
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching APIs:', error);
      // Return mock data for development
      return this.getMockApis();
    }
  }

  async getApi(apiId: string, token?: string): Promise<Api | null> {
    try {
      const url = `${apimConfig.managementApiUrl}/apis/${apiId}?api-version=${API_VERSION}`;
      const response = await axios.get(url, {
        headers: this.getHeaders(token)
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching API:', error);
      return this.getMockApis().find(api => api.id === apiId) || null;
    }
  }

  async getApiOperations(apiId: string, token?: string): Promise<ApiOperation[]> {
    try {
      const url = `${apimConfig.managementApiUrl}/apis/${apiId}/operations?api-version=${API_VERSION}`;
      const response = await axios.get(url, {
        headers: this.getHeaders(token)
      });
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching API operations:', error);
      return this.getMockOperations();
    }
  }

  async getProductApis(productId: string, token?: string): Promise<Api[]> {
    try {
      const url = `${apimConfig.managementApiUrl}/products/${productId}/apis?api-version=${API_VERSION}`;
      const response = await axios.get(url, {
        headers: this.getHeaders(token)
      });
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching product APIs:', error);
      return this.getMockApis();
    }
  }

  // Subscriptions
  async getUserSubscriptions(token?: string): Promise<Subscription[]> {
    try {
      const url = `${apimConfig.managementApiUrl}/subscriptions?api-version=${API_VERSION}`;
      const response = await axios.get(url, {
        headers: this.getHeaders(token)
      });
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    }
  }

  // Mock data for development/testing
  private getMockProducts(): Product[] {
    return [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Subscribers will be able to run 5 calls/minute up to a maximum of 100 calls/week.',
        subscriptionRequired: true,
        approvalRequired: false,
        subscriptionsLimit: 1,
        state: 'published'
      },
      {
        id: 'unlimited',
        name: 'Unlimited',
        description: 'Subscribers have completely unlimited access to the API. Administrator approval is required.',
        subscriptionRequired: true,
        approvalRequired: true,
        state: 'published'
      }
    ];
  }

  private getMockApis(): Api[] {
    return [
      {
        id: 'echo-api',
        name: 'Echo API',
        description: 'The Echo API is a simple REST service that returns the data sent to it, useful for testing and debugging API requests.',
        serviceUrl: 'https://mtbank-apim-1.azure-api.net/echo',
        path: '/echo',
        protocols: ['https'],
        isCurrent: true,
        apiRevision: '1',
        apiType: 'http'
      },
      {
        id: 'jsonplaceholder',
        name: 'JSONPlaceholder',
        description: 'REST API that you can use whenever you need some data',
        serviceUrl: 'https://jsonplaceholder.typicode.com',
        path: '/jsonplaceholder',
        protocols: ['https'],
        isCurrent: true,
        apiRevision: '1',
        apiType: 'http'
      },
      {
        id: 'jsonplaceholderapi',
        name: 'JSONPlaceholderapi',
        description: 'Online REST API for Testing and Prototyping',
        serviceUrl: 'https://jsonplaceholder.typicode.com',
        path: '/jsonplaceholderapi',
        protocols: ['https'],
        isCurrent: true,
        apiRevision: '1',
        apiType: 'http'
      }
    ];
  }

  private getMockOperations(): ApiOperation[] {
    return [
      {
        id: 'create-resource',
        name: 'Create resource',
        method: 'POST',
        urlTemplate: '/resource',
        description: 'A demonstration of a POST call based on the echo backend above. The request body is expected to contain JSON-formatted data.'
      },
      {
        id: 'modify-resource',
        name: 'Modify Resource',
        method: 'PUT',
        urlTemplate: '/resource',
        description: 'Modify an existing resource'
      },
      {
        id: 'remove-resource',
        name: 'Remove resource',
        method: 'DELETE',
        urlTemplate: '/resource',
        description: 'Remove an existing resource'
      },
      {
        id: 'retrieve-header-only',
        name: 'Retrieve header only',
        method: 'HEAD',
        urlTemplate: '/resource',
        description: 'Retrieve resource headers'
      },
      {
        id: 'retrieve-resource',
        name: 'Retrieve resource',
        method: 'GET',
        urlTemplate: '/resource',
        description: 'Get resource data'
      },
      {
        id: 'retrieve-resource-cached',
        name: 'Retrieve resource (cached)',
        method: 'GET',
        urlTemplate: '/resource-cached',
        description: 'Get cached resource data'
      }
    ];
  }
}

export const apimService = new ApimService();
