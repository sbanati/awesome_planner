// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // Scoped declarations within the document ready function
  let today = dayjs(); // Initiates dayjs library
  let timeDisplayEl = $("#currentDay"); // links element to id
  let timeBlocksContainer = $(".container-lg"); // links element to class
  let currentHour = today.hour(); // change to a value for testing or today.hour() for accurate reading
  const businessHours = [
    { value: 9, display: "9AM" },
    { value: 10, display: "10AM" },
    { value: 11, display: "11AM" },
    { value: 12, display: "12PM" },
    { value: 13, display: "1PM" },
    { value: 14, display: "2PM" },
    { value: 15, display: "3PM" },
    { value: 16, display: "4PM" },
    { value: 17, display: "5PM" },
  ];

  // function to display time and date
  function displayTime() {
    
    //Sets rightNow to show the time using dayjs in desired format
    let rightNow = dayjs().format("dddd, MMMM, YYYY [|] h:mm:ss a");
    
    // Call the element and display the text content document
    timeDisplayEl.text(rightNow);
  }

  


  // function to create the html elements 
  function createTimeBlock() {
    // Create the time block html elements and add class
    // Append the time block elements
    for (let i = 0; i < businessHours.length; i++) {

      // stores the current value of the business hour into blockHour 
      let blockHour = businessHours[i].value;
      
      // stores the display property of the business hour element
      let displayFormat = businessHours[i].display;

      // Create new time block element
      let timeBlock = $("<div>").addClass("row time-block");

      // adds a unique id to the timeBlock based on the businessHour
      timeBlock.attr('id', 'hour-' + blockHour);

      // Create the hourColumn element
      let hourColumn = $("<div>").addClass( "col-2 col-md-1 hour text-center py-3");
      
      // sets the text content of the hourColumn to the displayFormat 
      hourColumn.text(displayFormat);
      
      // append the element
      timeBlock.append(hourColumn);

      // create textarea element for the description in the timeblock and setting style.
      let descriptionTextarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");
      
      // append the created textarea to the timeBlock element
      timeBlock.append(descriptionTextarea);

      // create save button and icon and add class
      let saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
      
      // creates the icon element and adds the class from font-awesome and adds attributes for accessibility
      let icon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");
      
      // Append icon to saveButton and then saveButton to timeBlock
      saveButton.append(icon);
      timeBlock.append(saveButton);

      // appends the timeBlock element to the timeBlocksContainer
      timeBlocksContainer.append(timeBlock);

      // Use the determineTimeBlockClass function to get the appropriate class
      let timeBlockClass = christmasCarol(blockHour, currentHour);
      timeBlock.addClass(timeBlockClass);
    
    
  }
      /*Event mqust be inside the createTimeBlock function b/c the elements must exist first 
       before data can be saved.*/
      timeBlocksContainer.on('click', '.saveBtn', function () {
        
        // Get the attribute of the closest ancestor element with the class time-block from the current element marked by (this)
        let timeBlockId = $(this).closest('.time-block').attr('id');
    
        // Looks for elements that are siblings and has the class of description (of the current element defined by this) and retrieve the value
        let savedUserEntry = $(this).siblings('.description').val();
    
        // Save the user input in local storage using the time block id as a key
        localStorage.setItem(timeBlockId, savedUserEntry);
      });
    
    }
 
  

  

  
  // ha ha goofy function to apply the past/present/future classes, get the joke?
  function christmasCarol(blockHour, currentHour) {
    if (blockHour < currentHour) {
      return "past";
    } else if (blockHour === currentHour) {
      return "present";
    } else {
      return "future";
    }
  }
 
 
 
 
 
  

 // function to retrieve the user input from the saved local storage
 function retrieveUserInput () {

  // uses .each method to iterate through all elements with the class time-block
  $('.time-block').each(function() {
    
  //Get the id attribute of the current time block
  const key = $(this).attr('id');
  console.log('Retrieving from local storage for ID:', key);
  
  // Retrieve the value (user input) from the local storage using the id
  const value = localStorage.getItem(key);
  console.log('Retrieved value:', value);
  
  // Sets the retrieved value as the text content of the description textarea.
  $(this).children('.description').val(value);
  
    });

  
  
}























  // Calls displayTime function
  displayTime();
  // Updates the time interval every 1 second
  setInterval(displayTime, 1000);
  // Calls createTimeBlock function
  createTimeBlock();
  retrieveUserInput ()
});












