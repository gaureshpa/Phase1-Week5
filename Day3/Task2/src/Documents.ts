interface Serializable {
    toJSON(): string;
    fromJSON(data: string): this;
}

interface Printable {
    print(): void;
    getDisplayName(): string;
}

interface Validatable {
    validate(): ValidationResult;
}

interface ValidationResult {
    valid: boolean;
    errors: string[];
}

class Documents implements Serializable, Printable, Validatable {
    constructor(
        public title: string,
        public content: string
    ) {}

    toJSON(): string {
        return JSON.stringify({
            title: this.title,
            content: this.content
        });
    }

    fromJSON(data: string): this {
        const parsed = JSON.parse(data) as {
            title: string;
            content: string;
        };

        this.title = parsed.title;
        this.content = parsed.content;

        return this;
    }

    print(): void {
        console.log(this.content);
    }

    getDisplayName(): string {
        return this.title;
    }

    validate(): ValidationResult {
        const errors: string[] = [];

        if(this.title.trim() === "") {
            errors.push("Title is required");
        }

        if(this.content.trim() === "") {
            errors.push("Content is required");
        }

        return {
            valid: errors.length === 0, errors
        };
    }
}

const doc = new Documents(
    "Test Document", "Test Document content"
);

console.log(doc.getDisplayName());
doc.print();

console.log(doc.validate());

const json = doc.toJSON();
console.log(json);

const restored = new Documents("", "").fromJSON(json);
console.log(restored);

const plainObject = {
    toJSON(): string {
        return JSON.stringify({message: "Hello"});
    },

    fromJSON(data: string) {
        console.log("Received:", data);
        return this;
    }
};

const serializable: Serializable = plainObject;

console.log(serializable.toJSON());

