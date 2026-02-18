
# Matrix Constructions - Owner's Portal

This is your private project management app. Use it to track site progress and run AI delay reports.

## 🔐 Login Credentials (Demo)

Use these usernames to access the different parts of the app:

*   **Owner/Admin:** `jane.smith`
*   **Site Engineer:** `amit.s`

## 🛠 Fixing "Page Not Found" (404 Error)

If you see a "Page Not Found" error after deploying, Netlify is likely looking in the wrong folder.

1.  **Check Site Settings:** In your Netlify dashboard, go to **Site configuration** > **Build & deploy** > **Continuous deployment**.
2.  **Verify Settings:** Ensure these three fields match:
    *   **Base directory:** (Leave this empty)
    *   **Build command:** `vite build`
    *   **Publish directory:** `dist`
3.  **Re-Deploy:** Go to the **Deploys** tab and click **Trigger deploy** > **Clear cache and deploy site**.

## 🔑 Adding the API Key

1.  Go to **Site configuration** > **Environment variables**.
2.  Click **Add a variable** > **Add a single variable**.
3.  **Key:** `API_KEY`
4.  **Value:** (Paste your code from Google AI Studio).
5.  **Trigger a new deploy** (Clear cache) after saving for the changes to take effect.

## 📱 Installation
1. Open your Netlify URL on your phone.
2. **iPhone:** Tap 'Share' -> **"Add to Home Screen"**.
3. **Android:** Tap the three dots -> **"Install App"**.
