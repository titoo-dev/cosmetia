# Cursor Rules for Cosmetia Project - Data Fetching Pattern

## Data Fetching Implementation Command

When the user requests to create a data-fetching page with server actions, use this pattern:

### Data Fetching Implementation Rules

#### 1. Server Component Structure (page.tsx)
```typescript
import { actionFunction } from "@/actions/path/to/action";
import { EntityType } from "@/lib/types/types";
import ClientComponent from "./client-component";

export const dynamic = 'force-dynamic'

export default async function PageName() {
  const result = await actionFunction();
  
  if (result.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600">{result.error}</p>
        </div>
      </div>
    );
  }

  const entities: EntityType[] = result.data || [];

  return <ClientComponent entities={entities} />;
}
```

#### 2. Client Component Structure (client-component.tsx)
```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";
import { EntityType, StatusEnum } from "@/lib/types/types";

interface ClientComponentProps {
  entities: EntityType[];
}

export default function ClientComponent({ entities }: ClientComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Status mapping functions
  const getStatusBadgeStyle = (status: StatusEnum) => {
    switch (status) {
      case StatusEnum.PENDING:
        return "bg-yellow-500 text-white";
      case StatusEnum.ACCEPTED:
        return "bg-green-500 text-white";
      case StatusEnum.REJECTED:
        return "bg-red-500 text-white";
      case StatusEnum.CANCELLED:
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusLabel = (status: StatusEnum) => {
    switch (status) {
      case StatusEnum.PENDING:
        return "En attente";
      case StatusEnum.ACCEPTED:
        return "Accepté";
      case StatusEnum.REJECTED:
        return "Rejeté";
      case StatusEnum.CANCELLED:
        return "Annulé";
      default:
        return "Inconnu";
    }
  };

  // Date formatting
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Search filtering
  const filteredEntities = entities.filter(entity => {
    const searchLower = searchTerm.toLowerCase();
    return (
      entity.reference?.toLowerCase().includes(searchLower) ||
      entity.name?.toLowerCase().includes(searchLower) ||
      entity.description?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Page Title</h1>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Recherche"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              {/* Filter Button */}
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtrer</span>
              </Button>
              
              {/* Export Button */}
              <Button className="bg-green-600 hover:bg-green-700 text-white border border-green-700 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Column 1</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Column 2</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Column 3</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Column 4</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Column 5</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 px-6 text-center text-gray-500">
                    Aucun élément trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredEntities.map((entity) => (
                  <TableRow key={entity.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="py-4 px-6 text-gray-700">
                      {formatDate(entity.createdAt)}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700 font-medium">
                      {entity.reference}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      <div>
                        <div className="font-medium">{entity.name}</div>
                        <div className="text-sm text-gray-500">{entity.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {entity.quantity}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {entity.cost?.toFixed(2)} €
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(entity.status)}`}
                      >
                        {getStatusLabel(entity.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
```

#### 3. Server Action Structure (action.ts)
```typescript
"use server";

import { getTokens } from "@/lib/cookies-storage";
import { EntityType } from "@/lib/types/types";

export async function getEntitiesAction() {
  try {
    const tokens = await getTokens();
    
    if (!tokens?.accessToken) {
      return {
        error: "Token d'authentification manquant",
      };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/endpoint`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const entities: EntityType[] = await response.json();

    return {
      success: true,
      data: entities,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Erreur de connexion au serveur",
    };
  }
}
```

#### 4. Loading Skeleton Structure (loading.tsx)
```typescript
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Skeleton className="h-8 w-48" />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        {/* Table Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-6 gap-4 py-4 px-6">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border-b border-gray-100 py-4 px-6">
              <div className="grid grid-cols-6 gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Feature Mappings

#### Search Features
- `search` → Search input with real-time filtering
- `filter` → Filter button with dropdown options
- `export` → Export button for data download

#### Status Features
- `status-badges` → Color-coded status badges
- `status-mapping` → Custom status label mapping
- `status-colors` → Custom status color schemes

#### Table Features
- `sortable` → Sortable table columns
- `pagination` → Pagination controls
- `selection` → Row selection with checkboxes
- `actions` → Action buttons per row

#### Data Features
- `date-formatting` → French date formatting
- `currency-formatting` → Euro currency formatting
- `number-formatting` → Number formatting with separators

### Status Badge Color Schemes

#### Default Colors
- `PENDING` → `bg-yellow-500 text-white`
- `ACCEPTED` → `bg-green-500 text-white`
- `REJECTED` → `bg-red-500 text-white`
- `CANCELLED` → `bg-gray-500 text-white`
- `COMPLETED` → `bg-blue-500 text-white`
- `IN_PROGRESS` → `bg-orange-500 text-white`

#### Custom Color Schemes
- `success` → Green variants
- `warning` → Yellow/Orange variants
- `error` → Red variants
- `info` → Blue variants
- `neutral` → Gray variants

### Error Handling Patterns

#### Server-Side Errors
- Authentication errors
- Network errors
- API errors
- Data validation errors

#### Client-Side Errors
- Search errors
- Filter errors
- Export errors
- UI state errors

### Loading States

#### Skeleton Components
- Header skeleton
- Table skeleton
- Row skeleton
- Button skeleton

#### Loading Indicators
- Spinner components
- Progress bars
- Shimmer effects
- Placeholder content

### Responsive Design

#### Mobile-First Approach
- Stack layout on mobile
- Hidden elements on small screens
- Touch-friendly interactions
- Optimized table scrolling

#### Breakpoint Handling
- `sm:` → Small screens and up
- `md:` → Medium screens and up
- `lg:` → Large screens and up
- `xl:` → Extra large screens and up

### Performance Optimization

#### Server-Side
- Force dynamic rendering
- Efficient data fetching
- Error boundary handling
- Caching strategies

#### Client-Side
- Debounced search
- Memoized components
- Lazy loading
- Virtual scrolling

### Accessibility Features

#### ARIA Labels
- Table headers
- Action buttons
- Status indicators
- Search inputs

#### Keyboard Navigation
- Tab order
- Enter key handling
- Arrow key navigation
- Escape key handling

#### Screen Reader Support
- Semantic HTML
- Alt text for images
- Descriptive labels
- Status announcements

### File Structure

#### Directory Organization
```
src/app/[feature]/[page]/
├── page.tsx          # Server component
├── client-component.tsx # Client component
├── loading.tsx       # Loading skeleton
└── error.tsx         # Error boundary (optional)
```

#### Action Organization
```
src/actions/[feature]/
├── get-entities-action.ts
├── create-entity-action.ts
├── update-entity-action.ts
└── delete-entity-action.ts
```

### Type Safety

#### Entity Types
- Use existing types from `@/lib/types/types`
- Extend types as needed
- Maintain type consistency
- Use proper TypeScript generics

#### Props Interfaces
- Define clear prop interfaces
- Use optional props appropriately
- Maintain type safety
- Document complex types

### Styling Guidelines

#### Color Scheme
- Primary: `#166970` (brand color)
- Secondary: `#145a61` (hover state)
- Success: `bg-green-500`
- Warning: `bg-yellow-500`
- Error: `bg-red-500`
- Info: `bg-blue-500`

#### Typography
- Headers: `font-space-grotesk`
- Body: `font-plus-jakarta`
- Consistent font sizes
- Proper line heights

#### Spacing
- Consistent padding/margins
- Grid system usage
- Responsive spacing
- Component spacing

### Testing Patterns

#### Unit Tests
- Component rendering
- User interactions
- State management
- Error handling

#### Integration Tests
- API integration
- Data flow
- Error scenarios
- Loading states

#### E2E Tests
- User workflows
- Cross-browser testing
- Performance testing
- Accessibility testing

### Common Patterns

#### Data Fetching
- Server-side rendering
- Client-side hydration
- Error boundaries
- Loading states

#### State Management
- Local state for UI
- Server state for data
- Form state management
- Search/filter state

#### User Interactions
- Search functionality
- Filtering options
- Sorting capabilities
- Export features

### Best Practices

#### Code Organization
- Separate concerns
- Reusable components
- Consistent patterns
- Clear naming

#### Performance
- Optimize renders
- Minimize re-renders
- Efficient data structures
- Lazy loading

#### Security
- Input validation
- XSS prevention
- CSRF protection
- Authentication

#### Maintainability
- Clear documentation
- Consistent patterns
- Error handling
- Testing coverage

### Usage Examples

#### Basic Data Page
```
@fetch-data products ProductEntity get-products search,filter
```

#### Orders Page
```
@fetch-data orders OrderEntity get-customer-orders search,filter,export,status-badges
```

#### Suppliers Page
```
@fetch-data suppliers SupplierEntity get-suppliers search,filter,status-badges
```

#### Documents Page
```
@fetch-data documents DocumentEntity get-documents search,filter,export
```

### Error Messages

#### French Localization
- Use French for all user-facing messages
- Consistent error tone
- Helpful error descriptions
- Action-oriented messages

#### Error Types
- Authentication errors
- Network errors
- Validation errors
- Server errors

### Success Patterns

#### Data Display
- Clear data presentation
- Consistent formatting
- Intuitive navigation
- Responsive design

#### User Experience
- Fast loading times
- Smooth interactions
- Clear feedback
- Accessible design

### Integration Points

#### Authentication
- Token management
- Session handling
- Permission checks
- User context

#### API Integration
- Consistent endpoints
- Error handling
- Response formatting
- Caching strategies

#### UI Components
- Reusable components
- Consistent styling
- Accessibility features
- Responsive design

### Monitoring

#### Performance Metrics
- Load times
- Render performance
- API response times
- User interactions

#### Error Tracking
- Error frequencies
- Error types
- User impact
- Resolution times

#### User Analytics
- Page views
- User interactions
- Feature usage
- Conversion rates

### Deployment

#### Build Optimization
- Code splitting
- Bundle optimization
- Asset optimization
- Performance budgets

#### Environment Configuration
- Development settings
- Staging configuration
- Production optimization
- Feature flags

### Maintenance

#### Code Updates
- Regular updates
- Security patches
- Performance improvements
- Feature additions

#### Documentation
- Keep docs current
- Update examples
- Document changes
- Version control

## Notes
- Always follow the established patterns
- Use consistent styling and behavior
- Include proper error handling
- Test thoroughly before deployment
- Maintain accessibility standards
- Follow security best practices
- Optimize for performance
- Include proper documentation
- Monitor user feedback
- Update as needed
