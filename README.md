# CommitLens: Compare Your GitHub Activity

CommitLens is a web application designed to help **GitHub users visualize and compare their recent activity** against their past performance. By simply entering a GitHub username and selecting a time window, users can gain insights into their development habits, progress, and consistency.

## Deployment
Deployed at [https://commitlens.vercel.app/](https://commitlens.vercel.app/)

## 🚀 Features

### Core Functionality
* **Performance Comparison:** Compare the user's activity in the most recent time window (e.g., the last month) with the preceding equivalent period (e.g., the month before that).
* **Selectable Time Windows:** Choose from **Week, Month, 6 Months, or Year** for analysis.
* **GitHub API Integration:** Fetches accurate contribution data directly from the GitHub API.

### Dashboard Insights
* **Contribution Chart Tab:**
    * **Stacked Grids:** Two visually familiar GitHub-style contribution grids for the current and previous periods.
    * **Summary Statistics:** Displays key metrics like **Total Commits, % Change (Growth/Decline), Longest Streak, and Activity Frequency**.
* **Commit Graph Tab:**
    * **Time-Series Visualization:** A line or bar chart showing commit count versus time for both periods.
    * **Overlay Toggle:** An option to directly **overlay the two graphs** for an immediate visual comparison.
    * **Interactive Tooltips:** Show daily commit counts on hover.

### Performance & Data Management
* **Intelligent Caching:** Implements a caching layer (e.g., Redis, SQLite, or in-memory) to **store user data for 24 hours**, ensuring fast subsequent lookups and respecting GitHub API limits.
* **Cache Lifespan:** Automatically deletes cached data older than 2 years (730 days).
* *Future Capability: Incremental fetching to update only new commits.*

### UX & Design
* **Modern and Minimal Interface:** Clean, intuitive, and focused design.
* **Responsive Layout:** Fully functional on **desktop and mobile devices**.
* **Visual Indicators:** Uses **green for growth** and **red for decline** in performance metrics.
* **Light/Dark Mode Toggle:** User-preferred visual style.
* **Last Refresh Time:** Clearly displays when the data was last updated.
* **Export Options:** Ability to export the charts as an **image or PDF**.

## ✨ Extra Ideas (Future Scope)

* **"Compare with Friend":** A side-by-side comparison feature for two different GitHub usernames.
* **GitHub OAuth Login:** Implementing OAuth for a smoother experience and accessing extended API rate limits.
* **"Insight Summary" Card:** A high-level, natural language summary of the user's performance (e.g., "Your commits increased by 25% this month!").

## 🛠️ Technology Stack (Planned)

*(Note: This section is a placeholder for the technologies that will be used to build CommitLens, which can be filled in once development begins.)*

| Layer | Potential Technologies |
| :--- | :--- |
| **Frontend** | React / Vue / Svelte (with TypeScript) |
| **Styling** | Tailwind CSS / Styled Components |
| **Data Visualization** | Chart.js / D3.js / Recharts |
| **Backend** | Node.js (Express) / Python (Flask/Django) / Go |
| **Database/Cache** | Redis (for caching) / PostgreSQL or SQLite (for user settings) |
| **Deployment** | Vercel / Netlify / Heroku |

## ⚙️ Local Development (Instructions Pending)

*(This section will contain detailed steps for cloning the repository, installing dependencies, setting up environment variables (like GitHub API keys), and running the development server.)*

## 🤝 Contributing

We welcome contributions to CommitLens! If you have suggestions for new features, find a bug, or want to help with development, please check out our [CONTRIBUTING.md] (to be created) for guidelines.

## 📄 License

GitPulse is released under the [MIT License](LICENSE) (to be confirmed).
