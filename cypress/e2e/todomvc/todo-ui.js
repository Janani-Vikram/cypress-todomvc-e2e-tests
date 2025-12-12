/// <reference types="cypress" />
import data from "../../fixtures/todosData.json";

describe("TodoMVC - Critical User Flow", () => {

  before(() => {
    cy.visit("/");
  });

  it("should add a todo, mark it complete, and verify state", () => {

    cy.clearCompletedTodos();
    cy.removeActiveTodos();

    // 1. Add a todo item
    cy.addTodo(data.todoText);

    cy.get(".todo-list li").should("have.length", 1).first().should("contain.text", "Learn Cypress");

    // 2. Mark it complete
    cy.toggleTodo(0);

    cy.get(".todo-list li").first().should("have.class", "completed");

    // 3. Verify UI persistence / state
    cy.reload();

    cy.get(".todo-list li").should("have.length", 1).first().should("have.class", "completed")
      .and("contain.text", "Learn Cypress");
  });

});
