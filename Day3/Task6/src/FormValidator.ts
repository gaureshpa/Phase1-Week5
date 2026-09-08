type Rule<T = unknown> = {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    custom?: (v: T) => string | null;
}

interface RegistrationForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: number;
}

type ValidationResult<T extends Record<string, unknown>> = {
    valid: boolean;
    errors: Partial<Record<keyof T, string>>;
};

class FormValidator<T extends Record<string, unknown>> {
    constructor(
        private form: HTMLFormElement,
        private rules: {
            [K in keyof T]?: Rule<T[K]>[];
        }
    ) {
        this.attachEvents();
    }

    private attachEvents(): void {
        for (const fieldName of Object.keys(this.rules) as Array<keyof T>) {
            const field = this.getField(fieldName);

            field.addEventListener("blur", (): void => {
                this.validateField(fieldName);
            });
        }

        this.form.addEventListener("submit", (event: SubmitEvent): void => {
            const result = this.validate();

            if(!result.valid) {
                event.preventDefault();
            }
        });
    }

    private getField<K extends keyof T>(fieldName: K): HTMLInputElement {
        const field = this.form.elements.namedItem(String(fieldName));

        if (!(field instanceof HTMLInputElement)) {
            throw new Error(`Field "${String(fieldName)}" not found`);
        }
        return field;
    }

    private getValue<K extends keyof T> (
        fieldName: K
    ): T[K] {
        const field = this.getField(fieldName);
        const rawValue = field.value.trim();

        if(field.type === "number") {
            return Number(rawValue) as T[K];
        }

        return rawValue as T[K];
    }

    public validateField<K extends keyof T> (
        fieldName: K
    ): string | null {
        const field = this.getField(fieldName);
        const value = this.getValue(fieldName);
        const fieldRules = this.rules[fieldName] ?? [];

        let error: string | null = null;

        for (const rule of fieldRules) {
            if(rule.required === true) {
                if(value === null || value === undefined || String(value).trim() === ""){
                    error = "This field is required. Fill it in";
                    break;
                }
            }

            if (rule.minLength !== undefined && String(value).length < rule.minLength) {
                error = `Minimum ${rule.minLength} characters needed`;
                break;
            }

            if(rule.pattern !== undefined && !rule.pattern.test(String(value))) {
                error = "Invalid format";
                break;
            }

            if(rule.custom !== undefined) {
                error = rule.custom(value);

                if(error !== null) {
                    break;
                }
            }
        }

        this.showResult(field, error);
        return error;
    }

    public validate(): ValidationResult<T>{
        const errors: Partial<Record<keyof T, string>> = {};

        for (const fieldName of Object.keys(this.rules) as Array<keyof T>) {
            const error = this.validateField(fieldName);

            if(error !== null) {
                errors[fieldName] = error;
            }
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors
        };
    }

    private showResult(
        field: HTMLInputElement,
        error: string | null
    ): void {
        const span = field.nextElementSibling;

        if(!(span instanceof HTMLSpanElement)) {
            return;
        }

        span.textContent = error ?? "";

        field.classList.remove("is-valid", "is-invalid");

        if(error === null) {
            field.classList.add("is-valid");
        }
        else {
            field.classList.add("is-invalid");
        }
    }
}
