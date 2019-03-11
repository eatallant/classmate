//when a button in the navbar is clicked and its corresponding content is displayed, it will turn white
$('.navBtn').click(function() {

    $(this).toggleClass('clicked');

});

$('#topNavLesson').click(function() {
    if ($('#dayPlan').is(':visible')) {
        $('#navDay').click();
    }
    if ($('#weekPlan').is(':visible')) {
        $('#navWeek').click();
    }
    if ($('#monthPlan').is(':visible')) {
        $('#navMonth').click();
    }
});

//when anything is selected, the instructions displayed on the page will be hidden
$('body').on('click', 'button', function() {
    $('#instructions').hide();
});


//add editable text box in dayplan table on click. removes td for that row to prevent multiple click events for the row
//submit change button commits text and removes button and input box
$('#dayPlan').on('click focus', 'td', function() {

    var text = $(this).text();
    $(this).replaceWith('<input tabindex="0" style="margin-right: 10px;" class="dayPlanEntry" type=text value="'
                            + text + '">');

    $('input').focus();
    $('input').select();
});


$('#dayPlan').on('focusout', '.dayPlanEntry', function() {

    var text = $(this).val();
    var inputBox = $(this);
    $(this).replaceWith('<td tabindex="0">' + text + '</td>');
    inputBox.remove();
});

//edit time on click
$('#dayPlanBody').on('click', 'th', function(){

    var text = $(this).text();
    $(this).replaceWith('<input size="8" type=text class="dayPlanTime" value="'
                            + text + '">');

    $('input').focus();
    $('input').select();
});

$('#dayPlanBody').on('focusout', '.dayPlanTime', function() {

    var text = $(this).val();
    var inputBox = $(this);
    $(this).replaceWith('<th class="col-md-1">' + text + '</th>');
    inputBox.remove();
});



/*
*
*the following section is for the week planner
*
*/

$('#weekPlan').on('click', '#addRow', function(){

    $('#weekPlan').find('tbody').append(
                    '<tr height="40px">' +
                        '<td class="editText"><span></span></td>' +
                        '<td class="editText"><span></span></td>' +
                        '<td class="editText"><span></span></td>' +
                        '<td class="editText"><span></span></td>' +
                        '<td class="editText"><span></span></td>' +
                        '<td class="editText"><span></span></td>' +
                        '<td class="editText"><span></span></td>' +
                    '<tr>'
    );
});




//provides functionality for the print button in the navbar
function printPage() {
    window.print();
}


/*
*
*the following function is for Notes
*adds note as new element in page, as well as a functioning delete button
*
*/


$('#noteBtn').click(function() {
    var text = $('#inputBox').val();
    $('.noteBoard').append('<div class="newNote"><div class="well editText"><p><span>' + text + "</span></p></div>" + 
                           '<button type="button" class="deleteText btn btn-primary" style="margin-bottom: 30px" onclick="$(this).closest(' +
                           "'.newNote'" + ').remove();">Delete This Note</button></div>');
    $('#inputBox').val("");
});






/* The following code is for the gradebook
*   when the new class button is selected, a new table is created.
*   the new table will have functional new assignment and new student buttons
*   every field in the table will be editable on click
*/



var studentCount = 0;
var assignmentCount = 0;

//adds specified number of students to selected class
$('#gradeBook').on('click', '.addStudents', function(){
    var getValue = prompt("How many would you like to add?");
    var assignmentCountForThisClass = $(this).closest('.gradeTable').find('.assignmentCol').length;



    for(var i = 0; i < getValue; i++){
        var studentCountForThisClass = $(this).closest('.gradeTable').find('.studentRow').length;
        $(this).closest('.gradeTable').append('<tr class="studentRow" id="studentRow' + studentCount + '"><th tabindex="0" scope="row" class="editText"><p class="glyphicon glyphicon-remove"></p><span>Student ' + (studentCountForThisClass + 1) + '</span></th></tr>');
        for(var j = 0; j < assignmentCountForThisClass; j++){
            $('#studentRow' + studentCount).append('<td tabindex="0" class="gradeData editText center"><span>*</span></td>');
        }
        studentCount++;        
    }
});

$('#gradeBook').on('click', '.glyphicon-remove', function(){
    $(this).closest('tr').remove();
})

//adds assignment column to selected class
$('#gradeBook').on('click', '.addAssignment', function(){

    var thisClass = $(this).closest('.gradeTable');
    var assignmentsInThisClass = thisClass.find('.studentRow');
    var assignmentCountForThisClass = $(this).closest('.gradeTable').find('.assignmentCol').length;

    $(this).closest('tr').append('<th tabindex="0" class="editText center assignmentCol"><span>Assignment ' + (assignmentCountForThisClass + 1) + '</span></th>');
    assignmentCount++;

    $(assignmentsInThisClass).append('<td tabindex="0" class="gradeData editText center"><span>*</span></td>');


});

//add another class when new class button is clicked
$('#gradeBook').on('click', '#newClass', function(){
    $('#gradeBook').prepend('<div class="gradebookContainer"><table class="mainContent table table-striped gradeTable">' +
                    '<thead >' +
                        '<tr>' +
                            '<th scope="col" colspan="2"><span class="editText"><span><em>Name This Class</em></span></span></th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tr class="assignments">' +
                        '<th scope="row">' +
                            '<button type="button" class="btn btn-primary addAssignment">Add Assignment</button>' +
                            '<button type="button" class="btn btn-primary addStudents">Add Students</button>' +
                        '</th>' +
                    '</tr>' +
                '</table></div>');
})

/*
*
* This section contains reusable buttons and page-wide click functionality
*
*/

//any spanned area is converted to input for user to manipulate
//add the "editText" class in the section you want to be selectable, and span the area you want to be editable
//this only works when the editText class is in some parent element of the span
$(".mainContainer").on('click', '.editText', function() {

    var text = $(this).text();
    $(this).find('span').replaceWith('<input class="editTextInput" tabindex="0" type="text" value="' + text + '">');
    $('input').focus();
    $('input').select();
});

//change input back to text on focus out
$('.mainContainer').on('focusout', 'input', function() {
    var text = $(this).val();
    $(this).replaceWith('<span>' + text + '</span>');
});

//select input on focus in to table data
$('#gradeBook').on('focus', '.gradeData', function(){
    var text = $(this).text();
    $(this).find('span').replaceWith('<input size="5" tabindex="0" type="text" value="' + text + '">');
    $('input').focus();
    $('input').select();
});



