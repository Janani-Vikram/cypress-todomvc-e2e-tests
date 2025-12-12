Cypress.Commands.add("addTodo", (text) => {
    cy.get(".new-todo").should("be.visible").type(text + "{enter}");
});

Cypress.Commands.add("toggleTodo", (index) => {
    cy.get(".todo-list li").eq(index).find(".toggle").click();
});

Cypress.Commands.add("clearCompletedTodos", () => {
    cy.get("body").then(($body) => {
        if ($body.find(".clear-completed").length > 0) {
            cy.get(".clear-completed").click();
        }
    });
});

Cypress.Commands.add("removeActiveTodos", () => {
    cy.get("body").then($body => {
        if ($body.find(".todo-list li").length > 0) {
            cy.get(".todo-list li").each($el => {
                cy.wrap($el).trigger("mouseover");
                cy.wrap($el).find(".destroy").click({ force: true });
            });
        }
    });
});