let inputDir={x:0, y:0}
let speed= 2
let score=0, highScore
let lastRenderTime,secondsSinceLastRender,food
let snakeBody=[{x:12, y:12}]
let foodObject={x:8, y:8}
highScore= localStorage.getItem("highScore")

let foodSound = new Audio('foodSound.mp3')
let moveSound = new Audio('moveSound.wav')
let gameOverSound = new Audio('gameOverSound.mp3')

function main(currentTime){
    secondsSinceLastRender= (currentTime-lastRenderTime)/1000
    window.requestAnimationFrame(main)
    if(secondsSinceLastRender<1/speed){return}
    lastRenderTime = currentTime
    gameEngine()
}
window.requestAnimationFrame(main)
    // defining ifCollide function
    function ifCollide(snakeBody){
        for(let i=1; i < snakeBody.length; i++){
            if(snakeBody[i].x===snakeBody[0].x && snakeBody[i].y===snakeBody[0].y){
                return true;
            }
        }
        if(snakeBody[0].x<=0 || snakeBody[0].x>=23 || snakeBody[0].y<=0 || snakeBody[0].y>=23){return true;}}
    

    function gameEngine(){
    // //   updating snake and food

    // if snake collides with body walls or itself
    if(ifCollide(snakeBody)){
        gameOverSound.play()
        alert("Game Over! Press OK to Restart")
        inputDir={x:0, y:0}
        snakeBody=[{x:12, y:12}]
        score=0
        speed=2
    }

    // increament in snakeBody after eating food    
    if(snakeBody[0].x===foodObject.x && snakeBody[0].y===foodObject.y){
            foodSound.play()
            snakeBody.unshift({x:snakeBody[0].x+inputDir.x , y: snakeBody[0].y+inputDir.y})
            foodObject.x= Math.floor(Math.random()*21)+2
            foodObject.y= Math.floor(Math.random()*21)+2
            score+=1
            speed+=1
            if(score>highScore){
                highScore=score
                localStorage.setItem("highScore", highScore)
            }
            
            
        }

    // updating snake direction based on btn pressed
    for(let i= snakeBody.length-2; i>=0; i--){
        snakeBody[i+1]={...snakeBody[i]}
    }
    snakeBody[0].x += inputDir.x
    snakeBody[0].y += inputDir.y
    
    // creating snake and food
    document.getElementById("board").textContent=""
    snakeBody.forEach ((segment) =>{
        let snakeElement=document.createElement("div")
        snakeElement.classList.add("snakeElement")
        snakeElement.style.gridRowStart=segment.y
        snakeElement.style.gridColumnStart=segment.x
        document.getElementById("board").appendChild(snakeElement)

    })

    food=document.createElement("div")
    food.classList.add("food")
    food.style.gridRowStart= foodObject.y
    food.style.gridColumnStart=foodObject.x
    document.getElementById("board").appendChild(food)


    document.getElementById("score").textContent= `Score: ${score}`
    document.getElementById("highScore").textContent= `High Score: ${highScore}`


}

    //  btns logic
    window.addEventListener("keydown", function (e){
        moveSound.play()
        inputDir={x:0, y:-1}
        switch(e.key){
            case "ArrowUp" : inputDir={x:0,y:-1};
            break;
            case "ArrowDown" : inputDir={x:0,y:1};    
            break;
            case "ArrowLeft" : inputDir={x:-1,y:0};    
            break;
            case "ArrowRight" : inputDir={x:1,y:0};        
            break;
        }
    })

    document