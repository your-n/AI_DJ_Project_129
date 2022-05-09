song= "";
left_wrist_x=0;
left_wrist_y=0;

right_wrist_x=0;
right_wrist_y=0;

score_right_wrist=0;
score_left_wrist=0;
function play() {
song.play();
song.setVolume(1);
song.rate(1);
}

function setup() {
canvas= createCanvas(600, 500);
canvas.center();

video= createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function draw() {
image(video, 0, 0, 600, 500);

fill("#FF000");
stroke("#FF000");

if(score_left_wrist > 0.2){
rect(left_wrist_x, left_wrist_y, 20);
InNumberleft_wrist_y = Number(left_wrist_y);
remove_decimals = floor(InNumberleft_wrist_y);
volume= remove_decimals/500;
document.getElementById("D_V").innerHTML= "Volume = "+ volume;
song.setVolume(volume);
}

}

function preload(){
song = loadSound("Lovely.mp3");
}

function modelLoaded(){
console.log("modelLoaded");
}

function gotPoses(results){
if(results.length > 0){
console.log(results);

score_left_wrist=results[0].pose.keypoints[9].score; 
console.log("score_left_wrist = "+ score_left_wrist);
left_wrist_x =results[0].pose.leftWrist.x;
left_wrist_y =results[0].pose.leftWrist.y;
console.log("leftWristX "+left_wrist_x+ " leftWristY "+left_wrist_y);

score_right_wrist=results[0].pose.keypoints[10].score;
console.log("score_right_wrist = "+ score_right_wrist);
right_wrist_x =results[0].pose.rightWrist.x;
right_wrist_y =results[0].pose.rightWrist.y;
console.log("rightWristX "+right_wrist_x+ " rightWristY "+right_wrist_y);
}
}