song = "";
scoreLeftWrist = "";
scorerightWrist = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";

function preload()
{
	song = loadSound("music.mp3");
}



function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();
	posenet=ml5.poseNet(video, modelLoaded);
	posenet.on("pose", gotPoses);

	
}
function modelLoaded()
{
	console.log("Posenet is initialized");
}
function gotPoses(results)
{
	if(results.length> 0)
	{
		console.log(results);
		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.leftWristy;
		console.log("leftWristx = " + leftWristX + " leftWristy = " + leftWristY);
		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;
		console.log("rightWristx = " + rightWristX + " righttWristy = " + righttWristY);
		scoreLeftWrist = results[0].pose.keypoints[9].score;
		
	}
}



function draw() {
	image(video, 0, 0, 600, 500);
	if(scoreLeftWrist > 0.2)
	{
		fill("orange");
		stroke("orange");
		circle(leftWristX, leftWristY, 20);
		volume=floor(Number(leftWristY));
		document.getElementById("volume").innerHTML= "volume = " + volume ;
		song.setVolume(volume);


	
	}
}

	
function play()
{
	song.play();
	song.rate(1);
	song.setVolume(1);
	
}
