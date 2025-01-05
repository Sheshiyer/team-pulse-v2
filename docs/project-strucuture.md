5. project-structure.md

# project-structure.md

This document explains how to organize your code and files for the Team Pulse project.

## 1. Repository Layout

team-pulse/
├─ raycast-extension/
│   ├─ package.json
│   ├─ src/
│   │   ├─ commands/
│   │   │   ├─ employee-overview.tsx
│   │   │   ├─ employee-detail.tsx
│   │   │   └─ …
│   │   ├─ integrations/
│   │   │   ├─ notion.ts
│   │   │   ├─ clockify.ts
│   │   │   └─ height.ts
│   │   ├─ hooks/
│   │   │   └─ useNotionData.ts
│   │   ├─ utils/
│   │   │   └─ date-utils.ts
│   │   └─ types/
│   │       └─ …
│   ├─ .cursorrules
│   └─ README.md
├─ docs/
│   ├─ PRD.md
│   ├─ documentation.md
│   ├─ Raycast-design-guidelines.md
│   ├─ Data-properties-linking.md
│   └─ project-structure.md
├─ scripts/
│   └─ notion-clockify-sync.ts
├─ .gitignore
├─ LICENSE
└─ README.md

### 1.1. `raycast-extension/`
Contains the core extension code:
- **`commands/`**: Each Raycast command (e.g., “Employee Overview,” “Employee Detail”).  
- **`integrations/`**: Modules for fetching/pushing data to external APIs (Notion, Clockify, etc.).  
- **`hooks/`**: Custom React hooks for data fetching or state management.  
- **`utils/`**: Utility files for date manipulation, formatting, etc.  
- **`types/`**: TypeScript interfaces or types.  
- **`.cursorrules`**: Agent prompt for coding style and guidelines.  
- **`README.md`**: High-level instructions for building/testing the Raycast extension.

### 1.2. `docs/`
Holds project documentation:
- **`PRD.md`**, **`documentation.md`**, **`Raycast-design-guidelines.md`**, **`Data-properties-linking.md`**, **`project-structure.md`** (this file).

### 1.3. `scripts/`
Place for Node scripts or any automation code (e.g., to sync Clockify data with Notion or to run scheduled tasks).

---

## 2. Branching Strategy (Optional)

- **`main`**: Stable, production-ready code.
- **`dev`** or feature branches: For ongoing development of new extension features or documentation updates.

---

## 3. Deployment and Build Steps

1. **Raycast Extension**:
   - Typically built with `npm install && npm run build`.
   - Test locally in Raycast by linking the extension folder or using Raycast’s dev tools.

2. **Scripts**:
   - `npm run notion-clockify-sync`: Example command to fetch Clockify data and update Notion fields.

3. **Documentation**:
   - All markdown docs live in `docs/`; can be rendered in any static site generator if needed.

---

## 4. Future Expansions

- **Serverless / Cloudflare**: If real-time webhooks become complex, you might create a small serverless function to handle concurrency or caching before updating Notion.
- **Multi-Workspace**: If you manage multiple Notion databases (one per department), you can replicate the same structure.

---

**End of project-structure.md**
