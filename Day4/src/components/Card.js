export function Card({ title, content }) {
    const card = document.createElement("div");
    const heading = document.createElement("h2");
    const body = document.createElement("p");
    card.className = "card";
    heading.textContent = title;
    body.textContent = content;
    card.append(heading, body);
    return card;
}
