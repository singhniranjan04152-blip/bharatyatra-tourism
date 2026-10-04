(() => {
    const modal = document.getElementById("accountModal");
    const authForms = document.getElementById("accountAuthForms");
    const profilePanel = document.getElementById("accountProfile");
    const notice = document.getElementById("accountNotice");
    const planElement = document.getElementById("accountPlan");
    let accountConfigured = false;

    function showNotice(message) {
        notice.textContent = message;
        notice.classList.add("visible");
    }

    function clearNotice() {
        notice.textContent = "";
        notice.classList.remove("visible");
    }

    async function request(path, options = {}) {
        const response = await fetch(`/api/auth/${path}`, {
            credentials: "same-origin",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Request could not be completed.");
        return data;
    }

    function openAccount() {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        clearNotice();
        if (!accountConfigured) {
            showNotice("Account setup is not finished yet. The site owner needs to connect a PostgreSQL database before registration and login can work.");
        }
        const firstInput = modal.querySelector("input");
        if (firstInput) firstInput.focus();
    }

    function closeAccount() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function readPreferences(form) {
        const formData = new FormData(form);
        return {
            days: Number(formData.get("days")),
            budget: Number(formData.get("budget")),
            partySize: Number(formData.get("partySize")),
            pace: formData.get("pace"),
            categories: formData.getAll("categories")
        };
    }

    function fillPreferences(form, preferences) {
        for (const field of ["days", "budget", "partySize", "pace"]) {
            if (preferences[field] !== undefined) form.elements[field].value = preferences[field];
        }
        const selected = new Set(preferences.categories || []);
        form.querySelectorAll('input[name="categories"]').forEach((input) => {
            input.checked = selected.has(input.value);
        });
    }

    function setBusy(form, busy, label) {
        const button = form.querySelector('button[type="submit"]');
        if (!button) return;
        if (busy) {
            button.dataset.originalText = button.textContent;
            button.textContent = label;
        } else if (button.dataset.originalText) {
            button.textContent = button.dataset.originalText;
            delete button.dataset.originalText;
        }
        button.disabled = busy;
    }

    function renderProfile(user) {
        authForms.hidden = true;
        profilePanel.hidden = false;
        document.getElementById("accountWelcome").textContent = `Signed in as ${user.name} (${user.email})`;
        fillPreferences(document.getElementById("accountPreferencesForm"), user.preferences || {});
    }

    function renderPlan(plan, note) {
        planElement.replaceChildren();
        const title = document.createElement("h3");
        title.textContent = "Your personalized trip plan";
        planElement.appendChild(title);

        plan.forEach((day) => {
            const card = document.createElement("article");
            card.className = "account-plan-day";

            const heading = document.createElement("div");
            heading.className = "account-plan-day-head";
            const place = document.createElement("strong");
            place.textContent = `Day ${day.day}: ${day.destination}, ${day.state}`;
            const cost = document.createElement("small");
            cost.textContent = `~₹${Number(day.estimatedBudget).toLocaleString("en-IN")} total estimate`;
            heading.append(place, cost);

            const idea = document.createElement("p");
            idea.textContent = day.idea;
            const season = document.createElement("small");
            season.textContent = `Best time: ${day.bestTime} · ${day.category}`;

            card.append(heading, idea, season);
            planElement.appendChild(card);
        });

        const noteElement = document.createElement("p");
        noteElement.className = "account-plan-note";
        noteElement.textContent = note;
        planElement.appendChild(noteElement);
        planElement.hidden = false;
    }

    async function loadPlan() {
        const data = await request("plan", { method: "POST", body: "{}" });
        renderPlan(data.plan, data.note);
    }

    document.getElementById("accountLoginForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        clearNotice();
        setBusy(form, true, "Logging in…");
        try {
            const formData = new FormData(form);
            const data = await request("login", {
                method: "POST",
                body: JSON.stringify({
                    email: formData.get("email"),
                    password: formData.get("password")
                })
            });
            renderProfile(data.user);
            form.reset();
            await loadPlan();
        } catch (error) {
            showNotice(error.message);
        } finally {
            setBusy(form, false);
        }
    });

    document.getElementById("accountRegisterForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        clearNotice();
        setBusy(form, true, "Creating account…");
        try {
            const formData = new FormData(form);
            const data = await request("register", {
                method: "POST",
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    password: formData.get("password"),
                    preferences: readPreferences(form)
                })
            });
            renderProfile(data.user);
            form.reset();
            await loadPlan();
        } catch (error) {
            showNotice(error.message);
        } finally {
            setBusy(form, false);
        }
    });

    document.getElementById("accountPreferencesForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        clearNotice();
        setBusy(form, true, "Saving & planning…");
        try {
            const data = await request("profile", {
                method: "POST",
                body: JSON.stringify({ preferences: readPreferences(form) })
            });
            renderProfile(data.user);
            await loadPlan();
            showNotice("Preferences saved. Your plan is ready below.");
        } catch (error) {
            showNotice(error.message);
        } finally {
            setBusy(form, false);
        }
    });

    window.logoutAccount = async () => {
        clearNotice();
        try {
            await request("logout", { method: "POST", body: "{}" });
            authForms.hidden = false;
            profilePanel.hidden = true;
            planElement.replaceChildren();
            planElement.hidden = true;
            showNotice("You have been logged out.");
        } catch (error) {
            showNotice(error.message);
        }
    };

    window.openAccount = openAccount;
    window.closeAccount = closeAccount;

    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeAccount();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("open")) closeAccount();
    });

    request("status")
        .then(async (data) => {
            accountConfigured = data.configured;
            if (!accountConfigured) return;
            const session = await request("me");
            renderProfile(session.user);
            await loadPlan();
        })
        .catch((error) => {
            if (!error.message.includes("log in")) console.error("Could not restore the Bharatyatra account session:", error.message);
        });
})();
