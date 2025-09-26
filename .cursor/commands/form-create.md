# Cursor Rules for Cosmetia Project

## Form Implementation Command

When the user requests to create a form with server actions, use this pattern:

### Form Implementation Rules

#### 1. Client Component Structure
```typescript
"use client";

import { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { actionFunction } from "@/actions/path/to/action";

export default function FormComponent() {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [state, formAction, isPending] = useActionState(actionFunction, {
        errors: {},
        message: "",
    });
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.errors && Object.keys(state.errors).length > 0) {
            toast.error(state.message || "Erreur de validation");
        }

        if (state.success) {
            toast.success(state.message);
            router.push("/redirect-path");
        }
    }, [state.errors, state.success, state.message, router]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setProfileImage(result);
                const pictureInput = document.getElementById('picture') as HTMLInputElement;
                if (pictureInput) {
                    pictureInput.value = result;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-black font-space-grotesk">
                    Form Title
                </h1>
                <p className="text-gray-600 font-plus-jakarta">
                    Form Description
                </p>
            </div>

            <form ref={formRef} action={formAction} className="space-y-6">
                {/* Profile Image - Include if needed */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <Avatar className="w-20 h-20">
                            <AvatarImage className="object-cover" src={profileImage || undefined} />
                            <AvatarFallback className="bg-gray-200 text-gray-600">
                                <User className="w-8 h-8" />
                            </AvatarFallback>
                        </Avatar>
                        <label
                            htmlFor="profile-image"
                            className="absolute -bottom-2 -right-2 bg-[#166970] text-white rounded-full p-2 cursor-pointer hover:bg-[#145a61] transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </label>
                        <input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                </div>

                <input type="hidden" id="picture" name="picture" />

                {/* Form Fields - Generate based on parameters */}
                {/* Field Template */}
                <div className="space-y-2">
                    <Label htmlFor="fieldName">
                        Field Label *
                    </Label>
                    <div className="relative">
                        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            id="fieldName"
                            name="fieldName"
                            type="text"
                            placeholder="Placeholder text"
                            className={`pl-10 ${state.errors?.fieldName ? "border-red-500" : ""}`}
                            disabled={isPending}
                            required
                        />
                    </div>
                    {state.errors?.fieldName && (
                        <p className="text-sm text-red-600">{state.errors.fieldName}</p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-[#166970] hover:bg-[#145a61]"
                    size="lg"
                    disabled={isPending}
                >
                    {isPending ? "Processing..." : "Submit"}
                </Button>
            </form>
        </div>
    );
}
```

#### 2. Server Action Structure
```typescript
"use server";

import { getAccessToken } from "@/lib/cookies-storage";
import { z } from "zod";

const schema = z.object({
    fieldName: z.string().min(1, "Error message"),
    // Add other fields based on parameters
});

export async function actionFunction(prevState: unknown, formData: FormData) {
    // Extract form data
    const fieldName = formData.get("fieldName") as string;
    
    // Validate with Zod
    const validatedFields = schema.safeParse({
        fieldName,
        // Add other fields
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Erreur de validation des champs.",
        };
    }

    try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return {
                error: "Token d'accès non trouvé",
            };
        }

        const formDataToSend = new FormData();
        // Add validated fields to FormData
        formDataToSend.append("fieldName", validatedFields.data.fieldName);

        const response = await fetch(`${process.env.API_BASE_URL}/endpoint`, {
            method: "PATCH", // or POST, PUT, DELETE based on action-type
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            body: formDataToSend,
        });

        const data = await response.json();

        return {
            success: true,
            message: "Success message",
            data,
        };
    } catch (error) {
        console.error(error);
        return {
            error: "Error message",
        };
    }
}
```

### Field Type Mappings

#### Input Fields
- `text` → Input with text type
- `email` → Input with email type
- `tel` → Input with tel type
- `url` → Input with url type
- `number` → Input with number type

#### Special Fields
- `textarea` → Textarea component
- `select` → Select component with options
- `image` → Avatar with upload functionality

#### Icons Mapping
- `name` → User icon
- `email` → Mail icon
- `phone` → Phone icon
- `company` → Building icon
- `website` → Globe icon
- `description` → FileText icon

### Required Field Indicators
- Fields ending with `*` in label are required
- Add `required` attribute to input
- Add validation in Zod schema

### Error Handling
- Always show field-specific errors below each field
- Use red border for fields with errors (`border-red-500`)
- Use red text for error messages (`text-red-600`)
- Show toast notifications for success/error states

### Loading States
- Disable all inputs during `isPending`
- Show loading text in submit button
- Prevent form submission during processing

### Accessibility
- Use proper `htmlFor` and `id` attributes
- Provide meaningful placeholders
- Use semantic HTML elements
- Include proper ARIA labels

### Styling
- Use consistent spacing with `space-y-6`
- Use brand colors `#166970` and `#145a61`
- Use consistent typography with `font-space-grotesk` and `font-plus-jakarta`
- Use consistent input styling with icons

### File Structure
- Place server actions in `src/actions/` directory
- Use descriptive action names ending with `Action`
- Group related actions in subdirectories
- Export actions as named exports

### API Integration
- Always use `getAccessToken()` for authentication
- Use FormData for file uploads
- Handle API responses consistently
- Include proper error handling for network failures

### State Management
- Use `useActionState` for server actions
- Handle success/error states with useEffect
- Provide user feedback with toast notifications
- Redirect on successful completion

### Validation
- Use Zod for schema validation
- Provide descriptive error messages
- Validate on both client and server
- Handle validation errors gracefully

### Performance
- Use `useRef` for form references
- Prevent unnecessary re-renders
- Optimize image uploads with base64 encoding
- Use proper loading states

### Security
- Validate all inputs on server
- Use proper authentication tokens
- Sanitize user inputs
- Handle file uploads securely

### Testing
- Test form validation
- Test error handling
- Test success flows
- Test loading states
- Test accessibility

### Documentation
- Include JSDoc comments for complex functions
- Document form field requirements
- Provide usage examples
- Include error code references

### Maintenance
- Keep forms consistent across the application
- Update validation rules as needed
- Monitor form performance
- Handle edge cases gracefully

### Best Practices
- Follow the established patterns
- Use consistent naming conventions
- Maintain code readability
- Include proper error handling
- Test thoroughly before deployment

### Common Patterns
- Profile forms with image upload
- Contact forms with validation
- Settings forms with preferences
- Registration forms with multiple steps
- Search forms with filters

### Error Messages
- Use French language for user-facing messages
- Provide specific field-level errors
- Include helpful suggestions
- Maintain consistent tone

### Success Messages
- Confirm successful actions
- Provide next steps
- Include relevant information
- Use positive language

### Form Types
- Registration forms
- Profile update forms
- Contact forms
- Search forms
- Settings forms
- Multi-step forms

### Integration Points
- Authentication system
- User management
- File upload system
- Notification system
- Routing system

### Dependencies
- React hooks
- Next.js navigation
- Zod validation
- Toast notifications
- UI components
- Icons library

### Configuration
- Environment variables
- API endpoints
- Validation rules
- Error messages
- Success redirects

### Monitoring
- Form submission rates
- Error frequencies
- User completion rates
- Performance metrics
- User feedback

### Optimization
- Lazy loading
- Code splitting
- Image optimization
- Bundle size
- Runtime performance

### Deployment
- Environment-specific configs
- Build optimization
- Error monitoring
- Performance tracking
- User analytics

### Support
- Error reporting
- User assistance
- Documentation
- Training materials
- Troubleshooting guides

## Usage Examples

### Basic Form
```
@form-create contact-form name,email,message create
```

### Profile Form
```
@form-create user-profile name,email,phone,company,image update
```

### Registration Form
```
@form-create supplier-registration companyName,siretNumber,contactName,phone,website,description create
```

### Settings Form
```
@form-create user-settings name,email,notifications,preferences update
```

### Search Form
```
@form-create product-search query,category,priceRange,location select
```

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
