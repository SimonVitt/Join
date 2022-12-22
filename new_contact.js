let contacts = [];
let alphabetList = [];
let sortedAlphabetList = [];
let activeContact;
let lastAddedContact;

/**
 * function to read the informations from display and implement to contacts-array
 * 
 * @type {string} name - This is the name of the contact you want to create
 * @type {string} email - This is the email-adress of the contact you want to create
 * @type {string} phone - This is the phone-number of the contact you want to create
 * @type {string} initials - This are the first letters of the parts of name of the contact
 */
function addNewContact() {
    let name = document.getElementById('contact-name');
    let email = document.getElementById('contact-email');
    let phone = document.getElementById('contact-phone');
    let randomColor = getRandomColor();
    let contact = {'name': name.value,'email': email.value,'phone': phone.value,'bg-color': randomColor}
    lastAddedContact = contact['name'];
    name.value = '';
    email.value = '';
    phone.value = '';
    contacts.push(contact);
    flyOutContact();
    pushAllContacts();
    checkContacts();
    showNewContact();
}

function showNewContact() {
    document.getElementById('complete-contact').classList.remove('d-none');
    let placeInArray = findJSONInArray();

    activeContact = placeInArray;

    contactName = contacts[placeInArray]['name'];
    contactEmail = contacts[placeInArray]['email'];
    contactPhone = contacts[placeInArray]['phone'];
    let initials = getInitials(contactName);

    showThisContactInfos(contactName, contactEmail, contactPhone, initials);
}

function findJSONInArray() {
    let i = -1;
    var index = contacts.findIndex(function (item, i) {
        return item.name === lastAddedContact
    });
    return index;
}

/**
 * function to push the next letter into backend
 * 
 */
//
function pushAllContacts() {
    backend.setItem('contact', JSON.stringify(contacts));
}

/**
 * function to create parameters the next functions need
 * 
 * @type {string} contactName - This is the name of the contact you want to check
 * @type {string} firstLetter - This is the first letter of the name of the contact
 */
function checkContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let thisContact = contacts[i];
        contactName = thisContact['name'];

        let firstLetter = getFirstLetter(contactName);

        checkAlphabetBox(firstLetter);
    }
    sortAlphabetList();
    createAlphabetBox();
    renderContacts();
    
}

/**
 * function to check if the letter for alphabet-boxes already exists and if not, push him to array[alphabetList]
 * 
 * @param {string} firstLetter - This is the first letter of the name of the contact
 * @type {Array} alphabetList - This is the array with all fist letters of the contacts
 */
function checkAlphabetBox(firstLetter) {
    if (!alphabetList.includes(firstLetter)) {
        alphabetList.push(firstLetter)
    }
}

/**
 * function to sort the letters in alphabetList by alphabet
 * 
 * @type {string} letter - This is the first letter which gets pushed to array  
 * @type {Array} sortedAlphabetList - This is the array with all fist letters of the contacts, sorted by alphabet
 */
function sortAlphabetList() {
    alphabetList.sort();
    sortedAlphabetList = [];

    for (let i = 0; i < alphabetList.length; i++) {
        let letter = alphabetList[i];
        sortedAlphabetList.push(letter);
    }
}

/**
 * function to create the contact-boxes with the right letters, where the contacts gets inserted
 * 
 * @type {Element} contactList - This is the place, new contact-boxes will be created
 * @type {Array} sortedAlphabetList - This is the array with all fist letters of the contacts, sorted by alphabet
 * @type {string} letter - This is the letter, the box will be created with
 */
function createAlphabetBox() {
    let contactList = document.getElementById('all-contacts');

    contactList.innerHTML = '';

    for (let i = 0; i < sortedAlphabetList.length; i++) {
        let letter = sortedAlphabetList[i];

        contactList.innerHTML += generateLetterBox(letter);
    }
}

/**
 * function to return the html code for the boxes
 * 
 * @param {string} letter - This is the letter, the box will be created with
 */
function generateLetterBox(letter) {
    return `
    <div class="alphabet-box">
        <div class="first-letter-box">
            <h3>${letter}</h3>
        </div>

        <div class="line"></div>

        <div style="width: 100%;" id="single-contact${letter}"></div>

    </div>`;
}


/**
 * function to render all contacts to the list
 * 
 * @type {string} thisContact - This is the contact for which the element will be created
 * @type {string} contactName - This is the name of the contact
 * @type {string} contactEmail - This is the email-adress of the contact
 * @type {string} contactPhone - This is the phone-number of the contact
 * @type {string} firstLetter - This is the first letter of the name of the contact
 * @type {string} initials - This are the first letters of the parts of name of the contact
 */
function renderContacts() {
    contacts.sort(sortContacts('name'));

    for (let i = 0; i < contacts.length; i++) {
        let thisContact = contacts[i];
        contactName = thisContact['name'];
        contactEmail = thisContact['email'];
        contactPhone = thisContact['phone'];

        let firstLetter = getFirstLetter(contactName);
        let initials = getInitials(contactName);

        document.getElementById('single-contact' + firstLetter).innerHTML += generateSingleContacts(i, contactName, contactEmail, contactPhone, initials);
        document.getElementById('initials' + i).style.backgroundColor = contacts[i]['bg-color'];
    }
}

/**
 * function to render all contacts to the list
 * 
 * @param {number} i - This is the number of the selected contact
 * @param {string} contactName - This is the name of the contact
 * @param {string} contactEmail - This is the email-adress of the contact
 * @param {string} contactPhone - This is the phone-number of the contact
 * @param {string} initials - This are the first letters of the parts of name of the contact
 */
function generateSingleContacts(i, contactName, contactEmail, contactPhone, initials) {
    return `
    <div onclick="openSingleContact(), setActiveUser(${i}), showThisContactInfos('${contactName}', '${contactEmail}', ${contactPhone}, '${initials}')" class="single-contact">
                            <div id="initials${i}" class="initials">${initials}</div>
                            <div class="name-email">
                                <div class="name-small">${contactName}</div>
                                <div class="email-small">${contactEmail}</div>
                            </div>
                        </div>`;
}

function setActiveUser(i){
    activeContact = i;
}

/**
 * function to show the empty screen after loading 
 * 
 */
function showEmptyContact() {
    document.getElementById('complete-contact').classList.add('d-none');
}


/**
 * function to sort the contacts by its names 
 * 
 * @param {string} contactName - This is the name of the contact
 * 
 */
function sortContacts(contactName) {
    return function (a, b) {
        if (a[contactName] > b[contactName]) {
            return 1;
        } else if (a[contactName] < b[contactName]) {
            return -1;
        }
        return 0;
    }
}

/**
 * function to get the first letters of all names 
 * 
 * @param {string} name - This is the name of the contact
 * @type {string} initials - This are the first letters of the parts of name of the contact
 * @type {string} parts - That are all parts of the contact-name
 */
function getInitials(name) {
    let parts = name.split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0]
        }
    }
    return initials;
}

/**
 * function to get the first letter
 * 
 * @param {string} name - This is the name of the contact
 */
function getFirstLetter(name) {
    return name.charAt(0);
}

/**
 * function to get a random color
 * 
 * @type {string} letters - This is a List of usable letters
 * @type {string} color - This is a random created color
 */
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


/* Zum leeren der Kontakte*/

async function deleteUser() {
    await backend.deleteItem('contact',);
}


function dataForShowInfo(){
    let name = contacts[activeContact]['name'];
    let email = contacts[activeContact]['email'];
    let phone = contacts[activeContact]['phone'];
    let initials = getInitials(name);

    showThisContactInfos(name, email, phone, initials);
}

/**
 * function to show the contact on big screen you clicked on 
 * 
 * @type {array} contacts - This is the array with all contacts
 * @param {number} i - This is the number of the contacts-place in the array
 * @param {string} contactName - This is the name of the contact
 * @param {string} contactEmail - This is the email-adress of the contact
 * @param {string} contactPhone - This is the phone-number of the contact
 * @param {string} initials - This are the first letters of the parts of name of the contact
 * @type {string} activeContact - This is the actual contact showed by details on big screen
 */
function showThisContactInfos(contactName, contactEmail, contactPhone, initials) {
        document.getElementById('bigContactInitials').innerHTML = initials;
        document.getElementById('bigContactName').innerHTML = contactName;
        document.getElementById('bigContactEmail').innerHTML = contactEmail;
        document.getElementById('bigContactPhone').innerHTML = contactPhone;
        document.getElementById('bigInitials').style.backgroundColor = contacts[activeContact]['bg-color'];
        document.getElementById('addTask-button-contacts').setAttribute("onclick", `showAddTaskContactlist('${contactName}')`);
}

/**
 * function to edit contact infos after creating
 * 
 * @type {array} contacts - This is the array with all contacts
 * @type {string} newName - This is the new name of the contact which will be changed
 * @type {string} newEmail - This is the new email-adress of the contact which will be changed
 * @type {string} newPhone - This is the new phone-number of the contact which will be changed
 * @type {string} activeContact - This is the actual contact showed by details on big screen
 * 
 */
function editContact() {
    let newName = document.getElementById('edit-name');
    let newEmail = document.getElementById('edit-email');
    let newPhone = document.getElementById('edit-phone');
    contacts[activeContact]['name'] = newName.value;
    contacts[activeContact]['email'] = newEmail.value;
    contacts[activeContact]['phone'] = newPhone.value;
    pushAllContacts();
    checkContacts();
    flyOutContact();
    dataForShowInfo();
    newName.value = '';
    newEmail.value = '';
    newPhone.value = '';
}

/**
 * function to change the contact-color 
 * 
 * @type {array} contacts - This is the array with all contacts
 * @type {string} activeContact - This is the actual contact showed by details on big screen
 * 
 */
function changeContactColor() {
    contacts[activeContact]['bg-color'] = getRandomColor();

    let name = contacts[activeContact]['name'];
    let email = contacts[activeContact]['email'];
    let phone = contacts[activeContact]['phone'];
    let initials = getInitials(name);

    pushAllContacts();
    checkContacts();
    showThisContactInfos(name, email, phone, initials);
    updateColorContactsinTasks();
}

/**
 * function to update the color of the assigned contacts depending on the colorchange in the contactsection
 */
async function updateColorContactsinTasks() {
    tasks.forEach(task => {
        let updatedContactsArray = [];
        task['assigned-contacts'].forEach(contactAssigned => {
            contacts.forEach(contact => {
                if (contact['name'] === contactAssigned['name']) {
                    updatedContactsArray.push(contact);
                }
            });
        });
        task['assigned-contacts'] = updatedContactsArray;
    });
    await backend.setItem('tasks', JSON.stringify(tasks));
}