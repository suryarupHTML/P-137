status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Ststus: DETECTING OBJECTS!!";
    inp_val = document.getElementById("inp1").value;
}

function modelLoaded() {
    console.log("Model is laoded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "" )
    {
        objectDetector.detect(gotResult)
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Ststus: Detecting Objects!";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected: " + objects.length;
            if(objects[i].label == inp_val)
            {
                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                document.getElementById("status").innerHTML = "Detected: " + objects[i].label;
            }
        }
    }
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}