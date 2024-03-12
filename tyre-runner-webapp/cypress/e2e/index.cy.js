describe("UI is working correctly", () => {

  beforeEach(() => {
    cy.viewport("iphone-xr");
    cy.visit(
      "/url-data?licenseplate=AO12XZP&sensorreadings=30,32,28,31"
    );
  }); 

  it("test dropdown", () => {
    const dropdown = cy.get("select");
    dropdown.select(1).should("have.value", "1");
  });

  it("test radio button", () => {
    const radio_button_heavy = cy.get("#heavy");
    radio_button_heavy.should("be.disabled");

    const radio_button_normal = cy.get("#normal");
    radio_button_normal.click().should("be.checked");
  });

  it("test select button", () => {
    const select_button = cy.get(".button");
    select_button.click();
  });

  it("test back button", () => {
    const back_button = cy.get(".BackButtonpc");
    back_button.click();
  });
// it("UI is working correctly", () => {
 

//   // test drop
//   const dropdown = page.get("select");

//   dropdown.select(1).should("have.value", "1");

//   const radio_button_heavy = page.get("#heavy");
//   radio_button_heavy.should("be.disabled");

//   const radio_button_normal = page.get("#normal");
//   radio_button_normal.click().should("be.checked");
//   cy.wait(2000)

//   const select_button = page.get(".button");
//   select_button.click();

//   const back_button = cy.get(".BackButtonpc");
//   cy.wait(2000)
//   back_button.click();
//   // page.get('header').should()

//   // page.get('h1').should('have.text', 'Hello world from Astro');
});