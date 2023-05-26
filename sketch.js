var Ball, database;
var position;


function setup(){
//1° Agregar la referencia a la base de datos al usar el comando 
// firebase.database().
database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  Ball = createSprite(250,250,10,10);
  Ball.shapeColor = "red";
/*2 Agregar firebase.database().ref() para referirnos a la locacidon
raiz o hijo en la base de datos.*/
var BallPosition = database.ref('ball/position');
BallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}
/*4° Cambian la posicion cuando las flechas del teclado
son presionadas*/
function writePosition(x,y){
 database.ref('ball/position').set({
  'x': position.x + x ,
  'y': position.y + y
 })
}
/*3° Agregar readPosition para cambiar los valores en la 
base de datos. */
function readPosition(data){
 position = data.val();
 Ball.x = position.x;
 Ball.y = position.y;
}
/*5° Dentro de la funcion showError escribe el siguiente 
mensaje de consola. */
function showError(){
  console.log("Error al escribir n la base de datos");
}
