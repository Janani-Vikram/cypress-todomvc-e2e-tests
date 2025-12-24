/// <reference types="cypress" />
import data from "../../fixtures/todosData.json";
import { Cypress } from "../../support/commands";

describe("TodoMVC - Critical User Flow", () => {

  before(() => {
    cy.visit("/");
  });

  it("should add a todo, mark it complete, and verify state", () => {

    Cypress.clearCompletedTodos();
    Cypress.removeActiveTodos();

    // 1. Add a todo item
    Cypress.addTodo(data.todoText);

    cy.get(".todo-list li").should("have.length", 1).first().should("contain.text", "Learn Cypress");

    // 2. Mark it complete
    Cypress.toggleTodo(0);

    cy.get(".todo-list li").first().should("have.class", "completed");

    // 3. Verify UI persistence / state
    cy.reload();

    cy.get(".todo-list li").should("have.length", 1).first().should("have.class", "completed")
      .and("contain.text", "Learn Cypress");
  });

});
