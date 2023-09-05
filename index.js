import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://first-9107d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
   
    if(inputValue!="" && inputValue!=" " )
    {
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()}
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let ThingsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        // console.log(ThingsArray)
        
        for (let i = 0; i < ThingsArray.length; i++) {
            let currentThing = ThingsArray[i]
            let currentThingID = currentThing[0]
            let currentThingValue = currentThing[1]
            
            appendThingToShoppingListEl(currentThing)
        }    
    } else {
        shoppingListEl.innerHTML = "No Items here... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendThingToShoppingListEl(Thing) {
    let ThingID = Thing[0]
    let ThingValue = Thing[1]
    // console.log(ThingValue)
    
    let newEl = document.createElement("li")
    
    newEl.textContent = ThingValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfThingInDB = ref(database, `shoppingList/${ThingID}`)
        
        remove(exactLocationOfThingInDB)
    })
    
    shoppingListEl.append(newEl)
}