// Read dataset file
const dataSet = JSON.parse(data);

// Training phase
const trainClassifierModel = () => {
    dataSet.forEach(mushroom => {
        console.log(mushroom);
    });
};

// Receives input
const retrieveMushroomData = () => {

    let mushroom = {};

    mushroom.cap_surface = document.getElementById('cap-surface').value;

    console.log(mushroom);

    return mushroom;

};

// Perform classification


// Show result

