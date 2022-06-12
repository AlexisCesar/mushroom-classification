// Training phase
const trainClassifierModel = () => {
    // Read dataset file
    const dataSet = JSON.parse(data);

    // dataSet.forEach(mushroom => {
    //     console.log(mushroom);
    // });

    console.log("Training classifier...");
};

// Receives input
const retrieveMushroomData = () => {

    let mushroom = {};

    mushroom.cap_surface = document.getElementById('cap-surface').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;
    mushroom. = document.getElementById('').value;


    console.log(mushroom);

    return mushroom;

};

// Perform classification
const classifyAndReturnResult = () => {
    let mushroom = retrieveMushroomData();

    // classification logic

    // return result (edible (1) - poisonous (0))
    return 0;
};

// Show result
const classifyMushroom = () => {
    let classification = classifyAndReturnResult();

    document.getElementById('classificationResult').innerHTML = "Result: " + (classification == 1 ? 'edible' : 'poisonous');
    document.getElementById('classificationResult').style.display = 'block';
};


window.onload = function () {
    trainClassifierModel();
};