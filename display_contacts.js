/*initialize contacts*/
async function initContacts(){
    await init();
    render('contacts'); 
    showContacts();
    checkContacts(); 
    showEmptyContact();
}

/**
 * function to open the div to create a contact
 * 
 */
function openNewContact() {
    document.getElementById('add-contact').classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
}

/**
 * function to open the div to edit a contact
 * 
 */
function openEditContact() {
    document.getElementById('edit-contact').classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');

    document.getElementById('edit-name').value = (contacts[activeContact]['name']);
    document.getElementById('edit-email').value = (contacts[activeContact]['email']);
    document.getElementById('edit-phone').value = (contacts[activeContact]['phone']);
}

/**
 * function to show all contacts in a list
 * 
 */
function showContacts() {
    if (window.innerWidth < 1024) {
        document.getElementById('complete-contact').classList.add('d-none');
        document.getElementById('contact-list').classList.remove('d-none');
    }
    else {
        document.getElementById('complete-contact').classList.remove('d-none');
        document.getElementById('contact-list').classList.remove('d-none');
    }
}

/**
 * function to show the details of a contact on big screen
 * 
 */
function openSingleContact() {
    if (window.innerWidth < 1024) {
        document.getElementById('complete-contact').classList.remove('d-none');
        document.getElementById('contact-list').classList.add('d-none');
    }
    else {
        document.getElementById('complete-contact').classList.remove('d-none');
        document.getElementById('contact-list').classList.remove('d-none');
    }
}

/**
 * function to close the details of a contact on big screen
 * 
 */
function closeSingleContact() {
    document.getElementById('complete-contact').classList.add('d-none');
    document.getElementById('contact-list').classList.remove('d-none');
}

/**
 * function to not close the div by click
 * 
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * function to close div by pressing escape
 * 
 */
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeEditNewContact();     
    }
});

/**
 * function to animate the div for flying out
 * 
 */
function flyOutContact() {
    document.getElementById('add-contact-flyOut').classList.remove('addedit-contact');
    document.getElementById('add-contact-flyOut').classList.add('new-addedit-contact');
    document.getElementById('edit-contact-flyOut').classList.remove('addedit-contact');
    document.getElementById('edit-contact-flyOut').classList.add('new-addedit-contact');
    setTimeout(displayNoneContacts, 800);
}

/**
 * function to set the div on d-none after animating
 * 
 */
function displayNoneContacts(){
    document.getElementById('edit-contact').classList.add('d-none');
    document.getElementById('add-contact').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('add-contact-flyOut').classList.add('addedit-contact');
    document.getElementById('add-contact-flyOut').classList.remove('new-addedit-contact');
    document.getElementById('edit-contact-flyOut').classList.add('addedit-contact');
    document.getElementById('edit-contact-flyOut').classList.remove('new-addedit-contact');
}


