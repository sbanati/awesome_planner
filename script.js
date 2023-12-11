// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {
  // Scoped declarations within the document ready function
  let today = dayjs();// Initiates dayjs library
  let timeDisplayEl = $('#currentDay'); // links element to id
  let timeBlocksContainer = $('.container-lg');// links element to class
  const businessHours = ['9AM', '10AM', '11AM', '12PM','1PM','2PM','3PM','4PM','5PM'];
  let currentHour = today.hour()
  // Function to display the time and date
  
  
  
  
  // function to display time and date 
  function displayTime() {
      //Sets rightNow to show the time using dayjs in desired format
      let rightNow = dayjs().format('dddd, MMMM, YYYY [|] h:mm:ss a');
      // Call the element and display the text content document
      timeDisplayEl.text(rightNow);
    
    } 
  
  
  
  
  
  
  function createTimeBlock () {
    // Create the time block html elements and add class 
    // Append the time block elements 
    // Maybe we generate the elements using loop to create the elements on the fly
    for (let i = 0; i < businessHours.length; i++) {
      // Create new time block element
      let timeBlock = $('<div>').addClass('row time-block');

      // Create the hourColumn element 
      let hourColumn = $('<div>').addClass('col-2 col-md-1 hour text-center py-3');
      // Get text content for element
      hourColumn.text(businessHours[i]);
      // append the element 
      timeBlock.append(hourColumn);
      
      let descriptionTextarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
      timeBlock.append(descriptionTextarea);
      
      // create save button and icon and add class
      let saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      let icon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');
      // Append icon to saveButton and then saveButton to timeBlock
      saveButton.append(icon);
      timeBlock.append(saveButton);
      
      
      timeBlocksContainer.append(timeBlock);
      
      
      // Extract the hour from the businessHours array
      let blockHour = parseInt(businessHours[i]);
      
      // Adjust blockHour to 24-hour format (1PM and 2PM become 13 and 14)
      if (businessHours[i].includes('PM') && blockHour !== 12) {
          blockHour += 12;
      }
      
    }
    
  }      
        
    















  // Calls displayTime function
  displayTime();
  // Updates the time interval every 1 second
  setInterval(displayTime, 1000);
  // Calls createTimeBlock function
  createTimeBlock();

});



    

      















$(function () {
  // !TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // !TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // !TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  
});
