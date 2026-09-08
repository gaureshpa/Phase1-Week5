"use strict";
class FormValidator {
    form;
    rules;
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
        this.attachEvents();
    }
    attachEvents() {
        for (const fieldName of Object.keys(this.rules)) {
            const field = this.getField(fieldName);
            field.addEventListener("blur", () => {
                this.validateField(fieldName);
            });
        }
        this.form.addEventListener("submit", (event) => {
            const result = this.validate();
            if (!result.valid) {
                event.preventDefault();
            }
        });
    }
    getField(fieldName) {
        const field = this.form.elements.namedItem(String(fieldName));
        if (!(field instanceof HTMLInputElement)) {
            throw new Error(`Field "${String(fieldName)}" not found`);
        }
        return field;
    }
    getValue(fieldName) {
        const field = this.getField(fieldName);
        const rawValue = field.value.trim();
        if (field.type === "number") {
            return Number(rawValue);
        }
        return rawValue;
    }
    validateField(fieldName) {
        const field = this.getField(fieldName);
        const value = this.getValue(fieldName);
        const fieldRules = this.rules[fieldName] ?? [];
        let error = null;
        for (const rule of fieldRules) {
            if (rule.required === true) {
                if (value === null || value === undefined || String(value).trim() === "") {
                    error = "This field is required. Fill it in";
                    break;
                }
            }
            if (rule.minLength !== undefined && String(value).length < rule.minLength) {
                error = `Minimum ${rule.minLength} characters needed`;
                break;
            }
            if (rule.pattern !== undefined && !rule.pattern.test(String(value))) {
                error = "Invalid format";
                break;
            }
            if (rule.custom !== undefined) {
                error = rule.custom(value);
                if (error !== null) {
                    break;
                }
            }
        }
        this.showResult(field, error);
        return error;
    }
    validate() {
        const errors = {};
        for (const fieldName of Object.keys(this.rules)) {
            const error = this.validateField(fieldName);
            if (error !== null) {
                errors[fieldName] = error;
            }
        }
        return {
            valid: Object.keys(errors).length === 0,
            errors
        };
    }
    showResult(field, error) {
        const span = field.nextElementSibling;
        if (!(span instanceof HTMLSpanElement)) {
            return;
        }
        span.textContent = error ?? "";
        field.classList.remove("is-valid", "is-invalid");
        if (error === null) {
            field.classList.add("is-valid");
        }
        else {
            field.classList.add("is-invalid");
        }
    }
}
