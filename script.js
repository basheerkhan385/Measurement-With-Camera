// const homeScreen = document.getElementById("home-screen");
// const cameraScreen = document.getElementById("camera-screen");

// const startBtn = document.getElementById("start-btn");
// const historyBtn = document.getElementById("history-btn");

// const addPointBtn = document.getElementById("add-point-btn");
// const resetBtn = document.getElementById("reset-btn");

// const camera = document.getElementById("camera");

// const pointA = document.getElementById("point-a");
// const pointB = document.getElementById("point-b");

// const measurementLine =
//     document.getElementById("measurement-line");

// const measurementInfo =
//     document.getElementById("measurement-info");

// const measurementValue =
//     document.getElementById("measurement-value");

// const centerTarget =
//     document.getElementById("center-target");

// const trackingCanvas =
//     document.getElementById("tracking-canvas");

// const trackingContext =
//     trackingCanvas.getContext("2d");


// let cameraStream = null;


// // =====================================
// // POINT VARIABLES
// // =====================================

// let pointACoordinates = null;
// let pointBCoordinates = null;

// let pointCount = 0;


// // =====================================
// // TARGET POSITION
// // =====================================

// let targetX = 0;
// let targetY = 0;


// // =====================================
// // TRACKING VARIABLES
// // =====================================

// let trackingPoint = null;

// let previousGray = null;

// let trackingActive = false;

// let animationFrame = null;


// // =====================================
// // START CAMERA
// // =====================================

// startBtn.addEventListener("click", async () => {

//     try {

//         cameraStream =
//             await navigator.mediaDevices.getUserMedia({

//                 video: {
//                     facingMode: {
//                         ideal: "environment"
//                     }
//                 },

//                 audio: false

//             });


//         camera.srcObject = cameraStream;


//         homeScreen.classList.add("hidden");

//         cameraScreen.classList.remove("hidden");


//         camera.addEventListener(
//             "loadedmetadata",
//             () => {

//                 trackingCanvas.width =
//                     camera.videoWidth;

//                 trackingCanvas.height =
//                     camera.videoHeight;


//                 targetX =
//                     cameraScreen.clientWidth / 2;

//                 targetY =
//                     cameraScreen.clientHeight / 2;


//                 moveTarget(
//                     targetX,
//                     targetY
//                 );

//             },
//             {
//                 once: true
//             }
//         );


//     } catch (error) {

//         console.error(
//             "Camera Error:",
//             error
//         );

//         alert(
//             `Camera access failed.

// Error: ${error.name}

// ${error.message}`
//         );

//     }

// });


// // =====================================
// // VIEW HISTORY
// // =====================================

// historyBtn.addEventListener("click", () => {

//     alert(
//         "View History functionality baad mein add karenge."
//     );

// });


// // =====================================
// // TAP CAMERA
// // =====================================

// cameraScreen.addEventListener(
//     "click",
//     (event) => {

//         if (
//             event.target.closest(".camera-controls")
//         ) {
//             return;
//         }


//         const rect =
//             cameraScreen.getBoundingClientRect();


//         targetX =
//             event.clientX - rect.left;

//         targetY =
//             event.clientY - rect.top;


//         moveTarget(
//             targetX,
//             targetY
//         );

//     }
// );


// // =====================================
// // MOVE RED TARGET
// // =====================================

// function moveTarget(x, y) {

//     centerTarget.style.left =
//         `${x}px`;

//     centerTarget.style.top =
//         `${y}px`;

// }


// // =====================================
// // ADD POINT
// // =====================================

// addPointBtn.addEventListener(
//     "click",
//     () => {

//         // =================================
//         // FIRST POINT
//         // =================================

//         if (pointCount === 0) {

//             pointACoordinates = {

//                 x: targetX,

//                 y: targetY

//             };


//             showPoint(
//                 pointA,
//                 targetX,
//                 targetY
//             );


//             pointCount = 1;


//             // Start tracking Point A
//             startPointTracking();


//             console.log(
//                 "Point A locked:",
//                 pointACoordinates
//             );


//             return;
//         }


//         // =================================
//         // SECOND POINT
//         // =================================

//         if (pointCount === 1) {

//             pointBCoordinates = {

//                 x: targetX,

//                 y: targetY

//             };


//             showPoint(
//                 pointB,
//                 targetX,
//                 targetY
//             );


//             drawLine(
//                 pointACoordinates,
//                 pointBCoordinates
//             );


//             pointCount = 2;


//             stopPointTracking();


//             console.log(
//                 "Point B:",
//                 pointBCoordinates
//             );


//             return;
//         }


//         // =================================
//         // THIRD POINT
//         // =================================

//         alert(
//             "Sirf 2 points allowed hain. Reset karein."
//         );

//     }
// );


// // =====================================
// // SHOW POINT
// // =====================================

// function showPoint(
//     element,
//     x,
//     y
// ) {

//     element.style.left =
//         `${x}px`;

//     element.style.top =
//         `${y}px`;

//     element.classList.remove(
//         "hidden"
//     );

// }


// // =====================================
// // START POINT A TRACKING
// // =====================================

// function startPointTracking() {

//     if (
//         typeof cv === "undefined"
//     ) {

//         alert(
//             "OpenCV abhi load nahi hua. Thori dair wait karke dobara Add Point press karein."
//         );

//         return;
//     }


//     trackingActive = true;


//     console.log(
//         "Point A tracking started"
//     );


//     trackPoint();
// }


// // =====================================
// // TRACK POINT
// // =====================================

// function trackPoint() {

//     if (!trackingActive) {
//         return;
//     }


//     if (
//         camera.readyState <
//         HTMLMediaElement.HAVE_CURRENT_DATA
//     ) {

//         animationFrame =
//             requestAnimationFrame(
//                 trackPoint
//             );

//         return;
//     }


//     const width =
//         trackingCanvas.width;

//     const height =
//         trackingCanvas.height;


//     // Camera frame canvas mein draw karo

//     trackingContext.drawImage(
//         camera,
//         0,
//         0,
//         width,
//         height
//     );


//     // Current frame

//     const currentFrame =
//         cv.imread(trackingCanvas);


//     const currentGray =
//         new cv.Mat();


//     cv.cvtColor(
//         currentFrame,
//         currentGray,
//         cv.COLOR_RGBA2GRAY
//     );


//     // First frame

//     if (!previousGray) {

//         previousGray =
//             currentGray.clone();

//         currentFrame.delete();

//         currentGray.delete();

//         animationFrame =
//             requestAnimationFrame(
//                 trackPoint
//             );

//         return;
//     }


//     // =================================
//     // Previous Point
//     // =================================

//     const previousPoint =
//         cv.matFromArray(
//             1,
//             1,
//             cv.CV_32FC2,
//             [
//                 convertScreenToVideoX(
//                     pointACoordinates.x
//                 ),

//                 convertScreenToVideoY(
//                     pointACoordinates.y
//                 )
//             ]
//         );


//     const nextPoint =
//         new cv.Mat();


//     const status =
//         new cv.Mat();


//     const error =
//         new cv.Mat();


//     // =================================
//     // Optical Flow
//     // =================================

//     cv.calcOpticalFlowPyrLK(
//         previousGray,
//         currentGray,
//         previousPoint,
//         nextPoint,
//         status,
//         error
//     );


//     const trackingStatus =
//         status.data[0];


//     if (trackingStatus === 1) {

//         const newX =
//             nextPoint.data32F[0];

//         const newY =
//             nextPoint.data32F[1];


//         // Video coordinates ko
//         // screen coordinates mein convert karo

//         const screenX =
//             convertVideoToScreenX(
//                 newX
//             );

//         const screenY =
//             convertVideoToScreenY(
//                 newY
//             );


//         pointACoordinates.x =
//             screenX;

//         pointACoordinates.y =
//             screenY;


//         // Point A move karo

//         showPoint(
//             pointA,
//             screenX,
//             screenY
//         );


//         console.log(
//             "Tracking A:",
//             screenX.toFixed(1),
//             screenY.toFixed(1)
//         );

//     }


//     // Previous frame update

//     previousGray.delete();

//     previousGray =
//         currentGray.clone();


//     // Cleanup

//     currentFrame.delete();

//     currentGray.delete();

//     previousPoint.delete();

//     nextPoint.delete();

//     status.delete();

//     error.delete();


//     animationFrame =
//         requestAnimationFrame(
//             trackPoint
//         );

// }


// // =====================================
// // SCREEN → VIDEO X
// // =====================================

// function convertScreenToVideoX(
//     screenX
// ) {

//     return (
//         screenX /
//         cameraScreen.clientWidth
//     ) *
//     trackingCanvas.width;

// }


// // =====================================
// // SCREEN → VIDEO Y
// // =====================================

// function convertScreenToVideoY(
//     screenY
// ) {

//     return (
//         screenY /
//         cameraScreen.clientHeight
//     ) *
//     trackingCanvas.height;

// }


// // =====================================
// // VIDEO → SCREEN X
// // =====================================

// function convertVideoToScreenX(
//     videoX
// ) {

//     return (
//         videoX /
//         trackingCanvas.width
//     ) *
//     cameraScreen.clientWidth;

// }


// // =====================================
// // VIDEO → SCREEN Y
// // =====================================

// function convertVideoToScreenY(
//     videoY
// ) {

//     return (
//         videoY /
//         trackingCanvas.height
//     ) *
//     cameraScreen.clientHeight;

// }


// // =====================================
// // STOP TRACKING
// // =====================================

// function stopPointTracking() {

//     trackingActive = false;


//     if (animationFrame) {

//         cancelAnimationFrame(
//             animationFrame
//         );

//         animationFrame = null;
//     }


//     if (previousGray) {

//         previousGray.delete();

//         previousGray = null;
//     }


//     console.log(
//         "Point tracking stopped"
//     );

// }


// // =====================================
// // DRAW LINE
// // =====================================

// function drawLine(
//     pointA,
//     pointB
// ) {

//     const deltaX =
//         pointB.x - pointA.x;

//     const deltaY =
//         pointB.y - pointA.y;


//     const distance =
//         Math.sqrt(
//             deltaX * deltaX +
//             deltaY * deltaY
//         );


//     const angle =
//         Math.atan2(
//             deltaY,
//             deltaX
//         ) *
//         (180 / Math.PI);


//     measurementLine.style.width =
//         `${distance}px`;

//     measurementLine.style.left =
//         `${pointA.x}px`;

//     measurementLine.style.top =
//         `${pointA.y}px`;

//     measurementLine.style.transform =
//         `rotate(${angle}deg)`;

//     measurementLine.style.display =
//         "block";


//     measurementValue.textContent =
//         `${distance.toFixed(1)} px`;


//     measurementInfo.classList.remove(
//         "hidden"
//     );

// }


// // =====================================
// // RESET
// // =====================================

// resetBtn.addEventListener(
//     "click",
//     () => {

//         stopPointTracking();


//         pointACoordinates = null;

//         pointBCoordinates = null;

//         pointCount = 0;


//         pointA.classList.add(
//             "hidden"
//         );

//         pointB.classList.add(
//             "hidden"
//         );


//         measurementLine.style.display =
//             "none";


//         measurementInfo.classList.add(
//             "hidden"
//         );


//         targetX =
//             cameraScreen.clientWidth / 2;

//         targetY =
//             cameraScreen.clientHeight / 2;


//         moveTarget(
//             targetX,
//             targetY
//         );


//         console.log(
//             "Everything reset"
//         );

//     }
// );



import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


const homeScreen =
    document.getElementById("home-screen");

const arScreen =
    document.getElementById("ar-screen");

const startBtn =
    document.getElementById("start-btn");

const historyBtn =
    document.getElementById("history-btn");

const addPointBtn =
    document.getElementById("add-point-btn");

const resetBtn =
    document.getElementById("reset-btn");

const exitBtn =
    document.getElementById("exit-btn");

const reticle =
    document.getElementById("reticle");

const statusBox =
    document.getElementById("status-box");

const measurementBox =
    document.getElementById("measurement-box");

const measurementValue =
    document.getElementById("measurement-value");

const measurementConversions =
    document.getElementById(
        "measurement-conversions"
    );

const supportMessage =
    document.getElementById(
        "support-message"
    );


// =====================================
// THREE.JS VARIABLES
// =====================================

let scene;

let camera;

let renderer;

let controller;

let reticle3D;

let hitTestSource = null;

let hitTestSourceRequested = false;


// =====================================
// AR SESSION
// =====================================

let xrSession = null;


// =====================================
// POINTS
// =====================================

let pointA = null;

let pointB = null;


// =====================================
// LINE
// =====================================

let measurementLine = null;


// =====================================
// RETICLE STATE
// =====================================

let reticleVisible = false;


// =====================================
// START BUTTON
// =====================================

startBtn.addEventListener(
    "click",
    startAR
);


// =====================================
// HISTORY
// =====================================

historyBtn.addEventListener(
    "click",
    () => {

        alert(
            "History functionality baad mein add karenge."
        );

    }
);


// =====================================
// START AR
// =====================================

async function startAR() {

    supportMessage.textContent = "";


    // Browser support check

    if (
        !navigator.xr
    ) {

        supportMessage.textContent =
            "Is browser mein WebXR AR available nahi hai. Android Chrome par test karein.";

        return;

    }


    try {

        const supported =
            await navigator.xr.isSessionSupported(
                "immersive-ar"
            );


        if (!supported) {

            supportMessage.textContent =
                "Is device/browser par AR supported nahi hai. Android Chrome par try karein.";

            return;

        }


        setupThreeJS();


        xrSession =
            await navigator.xr.requestSession(
                "immersive-ar",
                {
                    requiredFeatures: [
                        "hit-test"
                    ],

                    optionalFeatures: [
                        "local-floor",
                        "dom-overlay"
                    ],

                    domOverlay: {
                        root: arScreen
                    }
                }
            );


        await renderer.xr.setSession(
            xrSession
        );


        homeScreen.classList.add(
            "hidden"
        );

        arScreen.classList.remove(
            "hidden"
        );


        statusBox.textContent =
            "Move your phone slowly to detect a surface.";


        xrSession.addEventListener(
            "end",
            onSessionEnd
        );


    } catch (error) {

        console.error(
            "AR Error:",
            error
        );


        supportMessage.textContent =
            `AR start nahi ho saka.

${error.name}: ${error.message}`;

    }

}


// =====================================
// SETUP THREE.JS
// =====================================

function setupThreeJS() {

    if (renderer) {

        return;

    }


    scene =
        new THREE.Scene();


    camera =
        new THREE.PerspectiveCamera(
            70,
            window.innerWidth /
                window.innerHeight,
            0.01,
            20
        );


    renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: true

        });


    renderer.setPixelRatio(
        window.devicePixelRatio
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.xr.enabled = true;


    renderer.setClearColor(
        0x000000,
        0
    );


    arScreen.appendChild(
        renderer.domElement
    );


    // =================================
    // RETICLE
    // =================================

    const ringGeometry =
        new THREE.RingGeometry(
            0.08,
            0.1,
            32
        );


    const ringMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xffffff,

            side: THREE.DoubleSide

        });


    reticle3D =
        new THREE.Mesh(
            ringGeometry,
            ringMaterial
        );


    reticle3D.rotation.x =
        -Math.PI / 2;


    reticle3D.matrixAutoUpdate =
        false;


    reticle3D.visible =
        false;


    scene.add(
        reticle3D
    );


    // =================================
    // CONTROLLER
    // =================================

    controller =
        renderer.xr.getController(0);


    controller.addEventListener(
        "select",
        onARSelect
    );


    scene.add(
        controller
    );


    // =================================
    // RESIZE
    // =================================

    window.addEventListener(
        "resize",
        onWindowResize
    );


    // =================================
    // RENDER LOOP
    // =================================

    renderer.setAnimationLoop(
        render
    );

}


// =====================================
// RENDER
// =====================================

function render(
    timestamp,
    frame
) {

    if (!frame) {

        return;

    }


    const session =
        renderer.xr.getSession();


    const referenceSpace =
        renderer.xr.getReferenceSpace();


    if (
        !hitTestSourceRequested
    ) {

        requestHitTestSource(
            session
        );

    }


    if (
        hitTestSource
    ) {

        const hitTestResults =
            frame.getHitTestResults(
                hitTestSource
            );


        if (
            hitTestResults.length > 0
        ) {

            const hit =
                hitTestResults[0];


            const pose =
                hit.getPose(
                    referenceSpace
                );


            if (pose) {

                reticle3D.visible =
                    true;

                reticle3D.matrix.fromArray(
                    pose.transform.matrix
                );


                reticleVisible =
                    true;


                statusBox.textContent =
                    "Surface detected. Point par red target rakhein.";

            }

        } else {

            reticle3D.visible =
                false;

            reticleVisible =
                false;


            statusBox.textContent =
                "Move your phone slowly to detect a surface.";

        }

    }


    renderer.render(
        scene,
        camera
    );

}


// =====================================
// HIT TEST SOURCE
// =====================================

async function requestHitTestSource(
    session
) {

    try {

        const viewerSpace =
            await session.requestReferenceSpace(
                "viewer"
            );


        hitTestSource =
            await session.requestHitTestSource({
                space: viewerSpace
            });


        hitTestSourceRequested =
            true;


        session.addEventListener(
            "end",
            () => {

                hitTestSourceRequested =
                    false;

                hitTestSource =
                    null;

            }
        );


    } catch (error) {

        console.error(
            "Hit Test Error:",
            error
        );

    }

}


// =====================================
// AR SCREEN TAP / CONTROLLER SELECT
// =====================================

function onARSelect() {

    addMeasurementPoint();

}


// =====================================
// ADD POINT BUTTON
// =====================================

addPointBtn.addEventListener(
    "click",
    () => {

        addMeasurementPoint();

    }
);


// =====================================
// ADD MEASUREMENT POINT
// =====================================

function addMeasurementPoint() {

    if (
        !reticleVisible
    ) {

        statusBox.textContent =
            "Pehle surface detect hone dein.";

        return;

    }


    // =================================
    // POINT A
    // =================================

    if (!pointA) {

        pointA =
            createPoint(
                0xff0000
            );


        pointA.position.setFromMatrixPosition(
            reticle3D.matrix
        );


        scene.add(
            pointA
        );


        statusBox.textContent =
            "Point A locked. Ab mobile ko move karein aur Point B select karein.";


        console.log(
            "Point A:",
            pointA.position
        );


        return;

    }


    // =================================
    // POINT B
    // =================================

    if (!pointB) {

        pointB =
            createPoint(
                0x00ff00
            );


        pointB.position.setFromMatrixPosition(
            reticle3D.matrix
        );


        scene.add(
            pointB
        );


        drawMeasurementLine();


        calculateDistance();


        statusBox.textContent =
            "Measurement complete.";


        return;

    }


    statusBox.textContent =
        "2 points already added. Reset karke dobara karein.";

}


// =====================================
// CREATE POINT
// =====================================

function createPoint(
    color
) {

    const geometry =
        new THREE.SphereGeometry(
            0.025,
            20,
            20
        );


    const material =
        new THREE.MeshBasicMaterial({
            color: color
        });


    return new THREE.Mesh(
        geometry,
        material
    );

}


// =====================================
// DRAW LINE
// =====================================

function drawMeasurementLine() {

    if (
        !pointA ||
        !pointB
    ) {

        return;

    }


    const points = [
        pointA.position.clone(),
        pointB.position.clone()
    ];


    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);


    const material =
        new THREE.LineBasicMaterial({

            color: 0xffff00,

            linewidth: 3

        });


    measurementLine =
        new THREE.Line(
            geometry,
            material
        );


    scene.add(
        measurementLine
    );

}


// =====================================
// CALCULATE DISTANCE
// =====================================

function calculateDistance() {

    const distance =
        pointA.position.distanceTo(
            pointB.position
        );


    // Meters

    const meters =
        distance;


    // Centimeters

    const centimeters =
        meters * 100;


    // Feet

    const feet =
        meters * 3.28084;


    measurementValue.textContent =
        `${meters.toFixed(3)} m`;


    measurementConversions.textContent =
        `${centimeters.toFixed(1)} cm | ${feet.toFixed(2)} ft`;


    measurementBox.classList.remove(
        "hidden"
    );


    console.log(
        "Distance:",
        meters,
        "meters"
    );

}


// =====================================
// RESET
// =====================================

resetBtn.addEventListener(
    "click",
    () => {

        // Remove Point A

        if (pointA) {

            scene.remove(
                pointA
            );

            pointA.geometry.dispose();

            pointA.material.dispose();

            pointA = null;

        }


        // Remove Point B

        if (pointB) {

            scene.remove(
                pointB
            );

            pointB.geometry.dispose();

            pointB.material.dispose();

            pointB = null;

        }


        // Remove line

        if (measurementLine) {

            scene.remove(
                measurementLine
            );

            measurementLine.geometry.dispose();

            measurementLine.material.dispose();

            measurementLine = null;

        }


        measurementBox.classList.add(
            "hidden"
        );


        statusBox.textContent =
            "Move your phone slowly to detect a surface.";

    }
);


// =====================================
// EXIT AR
// =====================================

exitBtn.addEventListener(
    "click",
    async () => {

        if (xrSession) {

            await xrSession.end();

        }

    }
);


// =====================================
// SESSION END
// =====================================

function onSessionEnd() {

    xrSession = null;


    if (renderer) {

        renderer.setAnimationLoop(
            null
        );

    }


    arScreen.classList.add(
        "hidden"
    );


    homeScreen.classList.remove(
        "hidden"
    );


    resetMeasurement();

}


// =====================================
// RESET AFTER EXIT
// =====================================

function resetMeasurement() {

    pointA = null;

    pointB = null;

    measurementLine = null;


    measurementBox.classList.add(
        "hidden"
    );

}


// =====================================
// WINDOW RESIZE
// =====================================

function onWindowResize() {

    if (!camera || !renderer) {

        return;

    }


    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

}