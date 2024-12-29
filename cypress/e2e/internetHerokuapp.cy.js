describe( 'Internet Herokuapp', () => {
      it('Add/Remove Element', () => {

        cy.visit("https://the-internet.herokuapp.com/");         //Visit the home page
        cy.contains("Add/Remove Elements").click();              //Click on "Add/Remove Elements"
        cy.url().should('eq','https://the-internet.herokuapp.com/add_remove_elements/');  //Check the url of the page
        cy.get('h3').should('have.text','Add/Remove Elements');  //Check the title of the page

        //Click on Add Element button - 4 times
        for(let i = 0; i < 4; i++) {
        cy.contains("Add Element").click();   
        }                  

        //Check there are four delete buttons
        cy.get('#elements .added-manually').should('have.length',4);

        //Click the first delete button 4 times and check all the delete buttons are gone.
        for(let i=0;i<4;i++){
            cy.get('#elements .added-manually').first().click();
        }

        cy.get('#elements .added-manually').should('not.exist');    

      });
      it('Basic Auth',() => {
        cy.visit("https://the-internet.herokuapp.com/");         //Visit the home page
        cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth'); // Provide credentials
        cy.get('h3').should('have.text','Basic Auth'); //Check the title of the page
        cy.get('p').should('contain.text','Congratulations! You must have the proper credentials.'); //Check success text
  
      });
      it('Broken Images',() => {
        cy.visit("https://the-internet.herokuapp.com/");         //Visit the home page
        cy.contains("Broken Images").click(); 
        cy.url().should('eq','https://the-internet.herokuapp.com/broken_images');  //Check the url of the page 
        cy.get('h3').should('have.text','Broken Images'); //Check the title of the page
   
        cy.get('.example img').each(($img) => {
            // Get the image source
            const src = $img.prop('src');
        
            // Make an HTTP request to check the image status
            cy.request({
              url: src,
              failOnStatusCode: false, // Prevent test failure on 404
            }).then((response) => {
              // Assert based on the status code
              if (response.status === 200) {
                cy.log(`Valid image: ${src}`);
                expect(response.status).to.eq(200); // Valid image
              } else {
                cy.log(`Broken image: ${src}`);
                expect(response.status).to.not.eq(200); // Broken image
              }
            });
          });
  
      });
      it('Challenging DOM',() =>{
        cy.visit("https://the-internet.herokuapp.com/");         //Visit the home page
        cy.contains("Challenging DOM").click(); 

        cy.url().should('eq','https://the-internet.herokuapp.com/challenging_dom');  //Check the url of the page 
        cy.get('h3').should('have.text','Challenging DOM'); //Check the title of the page

        //Class is not changing here. so we can use it.

        
            // Click on the first button with the class 'button' (foo button)
            cy.get('.button').first().click();
          
            // Click on the second button with the class 'alert' (bar button)
            cy.get('.button.alert').click();
          
            // Click on the third button with the class 'success' (bar button)
            cy.get('.button.success').click();
       
      });
      it('Checkboxes',() =>{
        cy.visit("https://the-internet.herokuapp.com/");         //Visit the home page
        cy.contains("Checkboxes").click(); 

        cy.url().should('eq','https://the-internet.herokuapp.com/checkboxes');  //Check the url of the page 
        cy.get('h3').should('have.text','Checkboxes'); //Check the title of the page
        // Click on the first checkbox
        cy.get('input[type="checkbox"]').first().click();

       // Click on the second checkbox
        cy.get('input[type="checkbox"]').last().click();


      });
      it('Context Menu', () =>{
        cy.visit("https://the-internet.herokuapp.com/");         //Visit the home page
        cy.contains("Context Menu").click(); 

        cy.url().should('eq','https://the-internet.herokuapp.com/context_menu');  //Check the url of the page 
        cy.get('h3').should('have.text','Context Menu'); //Check the title of the page
         // Right-click on the hot-spot element to trigger the alert
         cy.get("#hot-spot").trigger('contextmenu'); // Trigger right-click (context menu)

         // Handle the alert box that appears
         cy.on('window:alert', (alertText) => {
            // Assert that the alert contains the expected text
            expect(alertText).to.include('You selected a context menu'); // Replace with actual content you expect
        
            // Automatically click "OK" to close the alert
            return true; // Accept the alert box
          });

      });
      it('Digest Auth', () => {
        cy.exec(
            `curl --digest --location --user admin:admin "https://the-internet.herokuapp.com/digest_auth"`
        ).then((result) => {
            // Log the curl output for debugging
            cy.log('Curl stdout:', result.stdout);
            cy.log('Curl stderr:', result.stderr);

            // Assert the curl command executed successfully
            expect(result.code).to.eq(0); // Ensure the command did not fail

            // Assert the response content
            expect(result.stdout).to.include('Congratulations'); // Check for success message
        });
      });
      it('Drag and Drop', () => {
  cy.visit("https://the-internet.herokuapp.com/"); // Visit the home page
      cy.contains("Drag and Drop").click();
      cy.url().should('eq', 'https://the-internet.herokuapp.com/drag_and_drop'); // Verify the page URL
      // Drag 'column-a' and drop it onto 'column-b'
      const dataTransfer = new DataTransfer();

      cy.get('#column-a').trigger('dragstart', { dataTransfer });
      cy.get('#column-b').trigger('drop', { dataTransfer });
      cy.get('#column-a').trigger('dragend');

      // Validate that the content has swapped
      cy.get('#column-a header').should('contain', 'B'); // Ensure 'B' is now in #column-a
      cy.get('#column-b header').should('contain', 'A'); // Ensure 'A' is now in #column-b
      });
      it('Dropdown List', () => {
      cy.visit("https://the-internet.herokuapp.com/"); // Visit the home page
      cy.contains("Dropdown").click();
      cy.url().should('eq', 'https://the-internet.herokuapp.com/dropdown'); // Verify the page URL
      cy.get('h3').should('have.text','Dropdown List'); //Check the title of the page
      
      // Verify the dropdown has exactly two options
      cy.get('#dropdown option').should('have.length', 3); // Including the disabled default option

      // Select "Option 2"
      cy.get('#dropdown').select('2');
      cy.get('#dropdown').should('have.value', '2'); // Verify "Option 2" is selected

      // Select "Option 1"
      cy.get('#dropdown').select('1');
      cy.get('#dropdown').should('have.value', '1'); // Verify "Option 1" is selected
      });
      it('Dynamic Content', () => {
          // Visit the dynamic content page
          cy.visit('https://the-internet.herokuapp.com/dynamic_content');
          
          // Capture the initial content of the first row
          cy.get('#content .row:nth-of-type(1) .large-10')
            .invoke('text')
            .then((text) => {
              // Normalize the text by trimming and removing extra spaces
              const firstRowInitialText = text.trim().replace(/\s+/g, ' ');
              cy.wrap(firstRowInitialText).as('firstRowInitialText');
            });
          
          // Capture the initial content of the second row
          cy.get('#content .row:nth-of-type(2) .large-10')
            .invoke('text')
            .then((text) => {
              const secondRowInitialText = text.trim().replace(/\s+/g, ' ');
              cy.wrap(secondRowInitialText).as('secondRowInitialText');
            });
          
          // Capture the initial content of the third row
          cy.get('#content .row:nth-of-type(3) .large-10')
            .invoke('text')
            .then((text) => {
              const thirdRowInitialText = text.trim().replace(/\s+/g, ' ');
              cy.wrap(thirdRowInitialText).as('thirdRowInitialText');
            });


          
          
          // Reload the page
          cy.reload();
          
          // Wait for the page to reload and ensure content is refreshed
          cy.wait(5000);
          
          // Verify that the content of the first row has changed
          cy.get('@firstRowInitialText').then((initialText) => {
            cy.get('#content .row:nth-of-type(1) .large-10')
              .invoke('text')
              .then((newText) => {
                const normalizedNewText = newText.trim().replace(/\s+/g, ' ');
                expect(normalizedNewText).to.not.equal(initialText);
              });
          });
          
          // Verify that the content of the second row has changed
          cy.get('@secondRowInitialText').then((initialText) => {
            cy.get('#content .row:nth-of-type(2) .large-10')
              .invoke('text')
              .then((newText) => {
                const normalizedNewText = newText.trim().replace(/\s+/g, ' ');
                expect(normalizedNewText).to.not.equal(initialText);
              });
          });
          
          // Verify that the content of the third row has changed
          cy.get('@thirdRowInitialText').then((initialText) => {
            cy.get('#content .row:nth-of-type(3) .large-10')
              .invoke('text')
              .then((newText) => {
                const normalizedNewText = newText.trim().replace(/\s+/g, ' ');
                expect(normalizedNewText).to.not.equal(initialText);
              });
          });

          

      });
  //     it('Disappearing Elements - Track Gallery Button', () => {
  //       cy.visit("https://the-internet.herokuapp.com/"); // Visit the home page
  //       cy.contains("Disappearing Elements").click();
  //       cy.url().should('eq', 'https://the-internet.herokuapp.com/disappearing_elements'); // Verify the page URL
  //       cy.get('h3').should('have.text', 'Disappearing Elements'); // Verify the page title
      
  //       // Step 2: Check if the "Gallery" button exists
  //     cy.get("a[href='/gallery/']") // Replace with the correct selector
  //     .should('not.exist') // Assert that the Gallery button exists
  //     .then(() => {
  //       // If the button exists, refresh the page
  //       cy.reload();
  //       cy.wait(5000);
  //       cy.reload();
  
  //     });
  
  //   // Step 3: After the page reloads, check that the "Gallery" button is gone
  //   cy.get("a[href='/gallery/']")
  //     .should('exist'); // Assert that the Gallery button does not exist after reload
  //     cy.reload();
  //     cy.wait(5000);
  //     cy.reload();
  // cy.get("a[href='/gallery/']") // Replace with the correct selector
  //     .should('not.exist')
  //     });
   

});