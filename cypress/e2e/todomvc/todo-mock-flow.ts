import data from "../../fixtures/todosData.json";
import { Cypress } from "../../support/commands";
describe("TodoMVC – UI-driven deterministic mocks", () => {

    before(() => {
        cy.visit("/");
        Cypress.clearCompletedTodos();
        Cypress.removeActiveTodos();
    });

    it("verifies todos in UI and adds a new one", () => {
        // Add todos manually
        data.testTodos.forEach(todo => {
            cy.get(".new-todo").type(todo.title + "{enter}");

            if (todo.completed) {
                cy.get(".todo-list li").contains(todo.title).parent().find(".toggle").click();
            }
        });
        // Assert initial todos
        cy.get(".todo-list li").should("have.length", data.testTodos.length);

        data.testTodos.forEach((todo, index) => {
            cy.get(".todo-list li").eq(index).should("contain.text", todo.title);

            if (todo.completed) {
                cy.get(".todo-list li").eq(index).should("have.class", "completed");
            } else {
                cy.get(".todo-list li").eq(index).should("not.have.class", "completed");
            }
        });

        // Add a new todo
        cy.get(".new-todo").type(data.todoText + "{enter}");
        cy.get(".todo-list li").last().should("contain.text", data.todoText).and("not.have.class", "completed");
    });
});
