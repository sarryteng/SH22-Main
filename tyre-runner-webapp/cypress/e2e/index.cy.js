describe("UI is working correctly", () => {

  beforeEach(() => {
    cy.viewport("iphone-xr");
    cy.visit(
      "/url-data?licenseplate=AO12XZP&sensorreadings=30,32,28,31"
    );
  }); 

  it("test on mobile", () => {
    const dropdown = cy.get("select");
    dropdown.select(1).should("have.value", "1");
    const radio_button_heavy = cy.get("#heavy");
    radio_button_heavy.should("be.disabled");
    const radio_button_normal = cy.get("#normal");
    radio_button_normal.click().should("be.checked");
    const select_button = cy.get(".button");
    select_button.click();
    const back_button = cy.get(".BackButtonpc");
    back_button.click();
  });

  it("test on desktop", () => {
    const dropdown = cy.get("select");
    dropdown.select(1).should("have.value", "1");
    const radio_button_heavy = cy.get("#heavy");
    radio_button_heavy.should("be.disabled");
    const radio_button_normal = cy.get("#normal");
    radio_button_normal.click().should("be.checked");
    const select_button = cy.get(".button");
    select_button.click();
    const back_button = cy.get(".BackButtonpc");
    back_button.click();
  });
});