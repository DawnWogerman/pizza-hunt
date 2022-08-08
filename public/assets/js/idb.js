//create variable to hold db connection
let db;
//estabish a connection to indexeddb databse called 'pizzhung; set it to version 1
const request = indexedDB.open('pizza_hunt', 1);

//event will emit if the db version changess
request.onupgradeneeded = function(event){
    //save ref to db
    const db = event.target.result;
    //create an object (table) called 'new_pizza' set to increment pkeys
    db.createObjectStore('new_pizza', { autoIncrement : true });
};

//upon success
request.onsuccess = function(event){
    db = event.target.result;

    //check if online
    if(navigator.onLine){
        uploadPizza();
    }
};

request.onerror = function(event) {
    //log error here
    console.log(event.target.errorCode);
};

//this function will be executed if we attempt to submit a new pizza and there is no internet connection
function saveRecord(record){
    //open a new transaction with the db read and writ permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');
    //access the object store for 'new_pizza'
    const pizzaObjectStore = transaction.objectStore('new_pizza');
    //add record to your store with add method
    pizzaObjectStore.add(record);
}

function uploadPizza() {
    //open a transaction on your db
    const transaction = db.transaction(['new_pizza'], 'readwrite');
    //access your object store
    const pizzaObjectStore = transaction.objectStore('new_pizza');
    //get all recoreds from store and set to a variable
    const getAll = pizzaObjectStore.getAll();
    //upon a successful getall run this function
    getAll.onsuccess = function(){
        //if there was data in indexdb send to api server
        if(getAll.result.length >0) {
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if(serverResponse.message){
                    throw new Error(serverResponse);
                }
                //open one more transaction
                const transaction = db.transaction(['new_pizza'], 'readwrite');
                //access the new_pizza object store
                const pizzaObjectStore = transaction.objectStore('new_pizza');
                //clear all items in your store
                pizzaObjectStore.clear();

                alert('All save pizza has been submitted');
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
}

//listen for app coming back online
window.addEventListener('online', uploadPizza);