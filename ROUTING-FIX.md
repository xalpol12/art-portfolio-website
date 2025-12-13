# Fixed Routing Architecture

## Problem Solved
**Issue**: Double router-outlet causing nested routing problems
- App component had `<router-outlet>`
- Library's LayoutComponent route wrapper created another `<router-outlet>`
- Result: Confusing double nesting

## Solution
**Simplified Architecture**: Client imports LayoutComponent directly

### How It Works Now

```
Client App (app.ts)
    ↓
<apw-layout />  ← Import LayoutComponent from library
    ↓
    ├─ <apw-navbar />
    ├─ <main>
    │   └─ <router-outlet />  ← Single router-outlet renders pages
    └─ <apw-footer />
```

### Routes Structure (Flat)
```typescript
export const portfolioRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'bio', component: BioPageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'project/:id', component: ProjectPageComponent },
]
```

No wrapper route, just flat routes that render inside LayoutComponent's router-outlet.

## Client Usage (Showcase App)

### app.ts
```typescript
import { Component } from '@angular/core';
import { LayoutComponent } from 'ngx-artist-portfolio';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  template: `<apw-layout />`,
  styleUrl: './app.scss'
})
export class App {}
```

### app.config.ts
```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { providePortfolio } from 'ngx-artist-portfolio';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    providePortfolio({
      config: {
        contentApiUrl: 'https://api.example.com/portfolio',
        siteTitle: 'Showcase Portfolio App'
      },
      provideRouting: true
    })
  ]
};
```

## Benefits

✅ **Single router-outlet**: No more double nesting  
✅ **Clear hierarchy**: App → Layout → Pages  
✅ **Reusable layout**: Client just imports LayoutComponent  
✅ **Simple routes**: Flat route structure, easy to understand  
✅ **Flexible**: Client can use LayoutComponent or build their own  

## For Custom Layout (Advanced)

If client wants custom layout:

```typescript
// Client's custom-layout.component.ts
@Component({
  template: `
    <custom-header />
    <router-outlet />
    <custom-footer />
  `
})
export class CustomLayout {}

// app.ts
template: `<app-custom-layout />`
```

Library's pages still work, just with custom layout wrapper!

