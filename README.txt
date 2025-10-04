# topcinema-cloudstream
Files to add a Top Cinema extension to CloudStream.

## What is inside
- repo.json  -> repository file CloudStream reads
- topcinema.js -> source extension template

## Quick steps to get a direct link for CloudStream
1. Create a GitHub repository (public) named whatever you want, e.g. `topcinema-cloudstream`.
2. Upload `repo.json` and `topcinema.js` to the repository root.
3. Open `repo.json` on GitHub and click **Raw**. Copy the raw URL (it looks like `https://raw.githubusercontent.com/USERNAME/REPO/main/repo.json`).
4. In CloudStream -> Extensions -> Add repo, paste that raw URL and add it.
5. If needed, edit `topcinema.js` on GitHub to set `BASE` to the real Top Cinema domain and adjust selectors.

> If you want, أعطني اسم حساب GitHub (USERNAME) وأنا أجهز `repo.json` بحيث يحتوي على رابط raw جاهز تستخدمه مباشرة بعد ما تخلق الـ repo بنفس الاسم.
