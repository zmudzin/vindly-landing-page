const form = document.getElementById("support-form");
const statusMsg = document.getElementById("status-message");
const submitBtn = document.getElementById("submit-btn");

function acceptTicket() {
    form.classList.add("is-sent");
    statusMsg.classList.add("is-visible");
}

if (form && statusMsg && submitBtn) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const gotcha = form.querySelector('[name="_gotcha"]');
        if (gotcha && gotcha.value) {
            acceptTicket();
            return;
        }

        const data = new FormData(form);

        submitBtn.disabled = true;
        submitBtn.textContent = "PROCESSING...";

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                acceptTicket();
            } else {
                submitBtn.disabled = false;
                submitBtn.textContent = "ERROR. RETRY";
            }
        } catch (error) {
            submitBtn.disabled = false;
            submitBtn.textContent = "NETWORK ERROR. RETRY";
        }
    });
}
