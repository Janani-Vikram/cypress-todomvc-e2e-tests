export namespace Cypress {
    export function addTodo(text: string) {
        cy.get(".new-todo").should("be.visible").type(text + "{enter}");
    }

    export function toggleTodo(index: number) {
        cy.get(".todo-list li").eq(index).find(".toggle").click();
    }

    export function clearCompletedTodos() {
        cy.get("body").then(($body) => {
            if ($body.find(".clear-completed").length > 0) {
                cy.get(".clear-completed").click();
            }
        });
    }

    export function removeActiveTodos() {
        cy.get("body").then($body => {
            if ($body.find(".todo-list li").length > 0) {
                cy.get(".todo-list li").each($el => {
                    cy.wrap($el).trigger("mouseover");
                    cy.wrap($el).find(".destroy").click({ force: true });
                });
            }
        });
    }
}