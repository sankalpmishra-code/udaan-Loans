/**
 * Udaan Loans - Application Form Module
 * Handles client-side validation and lead submission to Google Sheets / Webhook.
 */

// Configuration: Set your Google Apps Script Web App URL or backend endpoint here
const SHEET_URL = ""; 

function initApplicationForm() {
  const form = document.getElementById("f");
  if (!form) return;

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const nameInput = document.getElementById("n");
    const phoneInput = document.getElementById("p");
    const emailInput = document.getElementById("e");
    const countryInput = document.getElementById("c");
    const univInput = document.getElementById("u");
    const amountInput = document.getElementById("a");
    const consentInput = document.getElementById("k");

    const values = {
      name: nameInput ? nameInput.value.trim() : "",
      phone: phoneInput ? phoneInput.value.replace(/\D/g, "") : "",
      email: emailInput ? emailInput.value.trim() : "",
      country: countryInput ? countryInput.value : "",
      course: univInput ? univInput.value.trim() : "",
      amount: amountInput ? +amountInput.value : 0,
      consent: consentInput ? consentInput.checked : false,
    };

    // Validation checks
    const errors = {
      n: values.name.length < 2 ? "Enter your full name." : "",
      p: !/^[6-9]\d{9}$/.test(values.phone) ? "Enter a valid 10-digit mobile number." : "",
      e: !/^\S+@\S+\.\S+$/.test(values.email) ? "Enter a valid email address." : "",
      c: !values.country ? "Select a country." : "",
      a: values.amount < 100000 ? "Enter an amount of at least ₹1,00,000." : "",
      k: !values.consent ? "Please tick the box to continue." : "",
    };

    // Display error messages
    let hasError = false;
    for (const key in errors) {
      const errEl = document.getElementById(key + "E");
      if (errEl) {
        errEl.textContent = errors[key];
      }
      if (errors[key]) {
        hasError = true;
      }
    }

    if (hasError) return;

    // Submission UI state
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn ? submitBtn.textContent : "Request a call back";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    let isSuccess = true;

    // Send payload if backend/SHEET_URL is configured
    if (SHEET_URL) {
      try {
        await fetch(SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: values.name,
            phone: values.phone,
            email: values.email,
            country: values.country,
            course: values.course,
            amount: values.amount,
            source: window.location.href,
          }),
        });
      } catch (err) {
        console.error("Submission failed:", err);
        isSuccess = false;
      }
    }

    if (!isSuccess) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
      const consentErr = document.getElementById("kE");
      if (consentErr) {
        consentErr.textContent = "Could not send your request. Please try again.";
      }
      return;
    }

    // Success response display
    const doneSection = document.getElementById("done");
    const firstNameSpan = document.getElementById("dn");
    const msgPara = document.getElementById("dm");

    if (firstNameSpan) {
      firstNameSpan.textContent = values.name.split(" ")[0];
    }
    if (msgPara) {
      msgPara.textContent = SHEET_URL
        ? "An Udaan Loans advisor will call you within one working day."
        : "Demo mode: form submitted successfully (connect a Google Sheet URL to save data).";
    }

    form.style.display = "none";
    if (doneSection) {
      doneSection.style.display = "block";
      doneSection.focus();
    }
  });
}

// Export for module or global use
window.initApplicationForm = initApplicationForm;
