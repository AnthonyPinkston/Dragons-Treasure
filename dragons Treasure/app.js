

let dungeonEvent = document.getElementById("dungeon-event")
let enterBtn = document.getElementById("keep-going")
let goldFound = document.getElementById("gold-found")
let healthEl = document.getElementById("health-el")
let adventurerImgEl = document.getElementById("adventurer-img")
let adventurerTextEl = document.getElementById("adventurer-text")
let testDisplay = document.getElementById("test-display")
let cardDisplayEl = document.getElementById("card-display")

const gameDeck = ["gold", "gold", "gold", "gold", "gold", "gold",
    "monster", "monster", "monster", "monster","monster", "monster",
    "trap", "trap", "trap", "trap", "trap", "trap", 
    "Dragon", "Dragon", "dragon"
]
let dungeon = [...gameDeck]

let foundGold = []
let randomCard = ""
let adventurer = ""
let adventurerText = "";
let adventurerImg = "";
let health = 20
let alive = true
let pullCardDisplay = ""
let goldCardImg = `<img id="adventurer" src="goldCard.png"></img>`
let dragonImg = `<img id="adventurer" src="Dragon.png"></img>`
let skeletonImg = `<img id="adventurer" src="Skeleton.png"></img>`
let trapImg = `<img id="adventurer" src="trap.png"></img>`

// Choose adventurer buttons 
function warrior() {
    adventurer = "warrior"
    adventurerImg = `<img id="adventurer" src="warrior.png"></img>`
    adventurerText = "Warriors can survive 1 battle with a monster and escape one trap"
    AdventurerDisplay()
    // alert(adventurer)
    // healthDisplay()
}
function wizard() {
    adventurer = "wizard"
    adventurerImg = `<img id="adventurer" src="wizard.png"></img>`;
    adventurerText = `Wizards can survive 2 battles with monsters but are defeated by traps.`
    AdventurerDisplay()
    // console.log(adventurer)
    // healthLogic()
}
function thief() {
    adventurer = "thief"
    adventurerImg= `<img id="adventurer" src="thief.png"></img>`
    adventurerText= `Thiefs can survive 2 traps but can not defeat by monsters`
    AdventurerDisplay()
    // console.log(adventurer)
    // healthLogic()
}
//display
function AdventurerDisplay() {
    adventurerImgEl.innerHTML =  adventurerImg;
    adventurerTextEl.innerHTML = adventurerText;
}
function cardDisplay() {
    cardDisplayEl.innerHTML =  pullCardDisplay;
}

function healthDamage() {
  health--
  healthDisplay()
}

function healthDisplay() {
    healthEl.innerText = `Health: ${health}`
    if (health === 0){
        reset()
    }
}

// card response
function dragonLogic() {
 //reset() 
 //one dragon must alway be in the dungion so if the lowercase d dragon gets pulled this puts it back
    testDisplay.innerText = "dragon finds you"
    reset()
    if (randomCard ==="dragon") {
        dungeon.push("dragon")
    }
    
}
function goldLogic() {
    foundGold.push("gold")
    goldDisplay()
}
function goldDisplay() {
    goldFound.innerText = `gold: ${foundGold.length}`
}
function monsterLogic() {
    if (adventurer === "wizard") {
        testDisplay.innerText =("Your Wizard defeated the monster but took 1 damage")
        healthDamage()
    } else if (adventurer === "warrior"){
        testDisplay.innerText =('Your Worrior defeated the monster but was hurt')
        healthDamage()
    } else if (adventurer === "thief") {
        health = 0
        reset()
        testDisplay.innerText =("Your Thief was defeated by the monster")
        //reset()  
    }
}
function trapLogic() {
    if (adventurer === "thief "){
        console.log('Your Thief escaped the trap')
        healthDamage()
        
    }else if (adventurer === "warrior"){
        console.log('Your Warrior got past the trap but was hurt')
        healthDamage()
        
    } else if (adventurer === "wizard"){
        health = 0
        
        console.log("Your Wizard was defeated by the monster")
        //reset()
    }
}

function pullCard() {
    healthDisplay()
    enterBtn.innerText = 'Keep Going'
    randomCardGenerator()
    return gameLogic()
}
function randomCardGenerator() {

    let randomNumber = Math.floor(Math.random() * dungeon.length)
    randomCard = dungeon[randomNumber]
    dungeonEvent.innerText = randomCard
    //deletes each card pulled
    dungeon.splice(randomNumber,1)
    
}
function gameLogic() {
    // testDisplay.innerText = randomCard
    if (randomCard === "gold") {
        pullCardDisplay = goldCardImg
        cardDisplay()
        goldLogic()
    }else if (randomCard === "monster") {
        // alert("test monster")
        pullCardDisplay = skeletonImg
        cardDisplay()
        monsterLogic()
    }else if (randomCard === "trap") {
        pullCardDisplay = trapImg
        cardDisplay()
        trapLogic()
        
    }else if (randomCard ==="dragon" || randomCard ==="Dragon") {
        pullCardDisplay = dragonImg
        cardDisplay()
        dragonLogic()
    }
    
}


function reset() {
    foundGold = []
    health = 0
    goldDisplay()
    testDisplay.innerText = "your adventurer has died and you have lost your gold"
    
}

//notes
/* 
-make health a non - number
-make the adventure buttons show the adventurer stats 
   and add a button that "hires" the selected adventurer.

-function AdventurerDisplay() set variables inside of adventures adventurerImageDisplay, 
    adventurerTextDisplay to warrior image. then let adventurerDisplay() display it with no logic.
*/