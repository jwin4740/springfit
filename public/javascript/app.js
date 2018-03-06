    // //Create a stage by getting a reference to the canvas
    // stage = new createjs.Stage("myCanvas");
    // //Create a Shape DisplayObject.
    // circle = new createjs.Shape();
    // circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    // //Set position of Shape instance.
    // circle.x = circle.y = 50;
    // //Add Shape instance to stage display list.
    // stage.addChild(circle);
    // //Update stage will render next frame
    // stage.update();
    // $(document).ready(function () {
    //     const canvas = document.getElementById('myCanvas');
    //     const context = canvas.getContext('2d');
    //     const imageObj = new Image();
    //     imageObj.onload = function () {
    //         context.drawImage(imageObj, 0, 0);
    //     };
    //     imageObj.src = 'public/images/humanoutline.jpg';
    // });

    window.onload = function () {
        //     //try and create a canvas element
        //     var testCanvas = document.createElement('canvas');

        //     //check if object supports getContext() method  
        //     if (testCanvas.getContext !== undefined) {
        //         var canvas = document.getElementById("effectsCanvas");
        //         var context = canvas.getContext("2d");

        //         canvas.style.border = "2px solid blue";




        //         initializeCanvas()
        //     } else {
        //         document.writeln('You are plum outta luck, cuz your browser does not support the canvas element.');
        //     }
        let stage = new createjs.Stage("effectsCanvas")
        let canvas = document.getElementById('effectsCanvas');

        const data = {
            images: ["public/images/humanoutline.jpg"],
            frames: {
                width: 50,
                height: 50
            },
            animations: {
                stand: 0,
                run: [1, 5],
                jump: [6, 8, "run"]
            }
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        let context = canvas.getContext('2d');
        // canvas.style.border = "solid 3px blue";
        const topBorder = 3;
        const bottomBorder = 3;
        const leftBorder = 3;
        const rightBorder = 3;
        const totalWidth = canvas.width;
        const totalHeight = canvas.height;
        console.log(totalWidth);



        let originX = 0;
        let originY = 0;
        let imageObj = new Image();

        imageObj.onload = function () {
            context.drawImage(imageObj, originX, originY);
            context.beginPath();
            context.arc(105.5, 390, 10, 0, Math.PI, true); // Outer circle


            context.moveTo(126.5, 390);
            // context.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
            // context.moveTo(65, 65);
            // context.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
            // context.moveTo(95, 65);
            // context.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
            context.stroke();


            // var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            // var pixels = imgData.data;
            // console.log(pixels);

            // for (var i = 0, n = pixels.length; i < n; i += 4) {
            //     var grayscale = pixels[i] * .3 + pixels[i + 1] * .59 + pixels[i + 2] * .11;
            //     pixels[i] = grayscale; // red
            //     pixels[i + 1] = grayscale; // green
            //     pixels[i + 2] = grayscale; // blue
            //     // alpha
            // }
            // context.putImageData(imgData, 0, 0);
        };
        imageObj.src = 'public/images/humanoutline.jpg';

        function writeMessage(location, message) {
            $(location).html(message);
        }

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }


        function initializeCanvas() {
            canvas.addEventListener('mousemove', function (evt) {
                var mousePos = getMousePos(canvas, evt);
                var message = mousePos.x + ',' + mousePos.y;
                let toolDiv = "#toolDiv";
                writeMessage(toolDiv, message);
            }, false);
        }
        initializeCanvas();
    };