var edibleInitialGuess = 0;
var poisonousInitialGuess = 0;
var attributesBags = [];

// Training phase
const trainClassifierModel = () => {
    // Read dataset file
    let mushrooms = JSON.parse(data);

    mushrooms.forEach((attribute, index) => {
        mushrooms[index] = attribute.split(',');
    });

    let trainingDataset = [];

    for (let i = 0; i < Math.floor(mushrooms.length * 0.75); i++) {
        trainingDataset.push(mushrooms[i]);
    }

    let testingDataset = [];

    for (let i = Math.floor(mushrooms.length * 0.75); i < Math.floor(mushrooms.length); i++) {
        testingDataset.push(mushrooms[i]);
    }

    for (let i = 0; i < 23; i++) {
        attributesBags.push([]);
    }

    let totalMushroomsRead = 0;
    let totalPoisonous = 0;
    let totalEdible = 0;

    trainingDataset.forEach(cog => {

        totalMushroomsRead++;

        let type = '?';

        cog.forEach((attribute, index) => {

            // Gets mushroom type
            if (index == 0) {
                if (attribute == 'e') {
                    type = 'edible';
                    totalEdible++;
                } else if (attribute == 'p') {
                    type = 'poisonous';
                    totalPoisonous++;
                } else {
                    console.log("A missing class training data was found.");
                }
            } else {

                let alreadyRegistered = false;
                let alreadyRegisteredIndex = -1;


                attributesBags[index].forEach((registeredAttribute, index) => {
                    if (attribute == registeredAttribute.atributo) {
                        alreadyRegistered = true;
                        alreadyRegisteredIndex = index;
                    }
                });


                if (!alreadyRegistered) {
                    // Add to the attribute bag
                    if (type == 'edible') {
                        attributesBags[index].push({
                            atributo: attribute,
                            ocorrencias_total: 3,
                            ocorrencias_venenoso: 1, //black box
                            ocorrencias_comestivel: 2
                        })
                    } else {
                        attributesBags[index].push({
                            atributo: attribute,
                            ocorrencias_total: 3,
                            ocorrencias_venenoso: 2,
                            ocorrencias_comestivel: 1 //black box
                        })
                    }
                } else {
                    attributesBags[index][alreadyRegisteredIndex].ocorrencias_total++;
                    type == 'poisonous' ? attributesBags[index][alreadyRegisteredIndex].ocorrencias_venenoso++ : attributesBags[index][alreadyRegisteredIndex].ocorrencias_comestivel++;
                }


            }


        });

    });

    edibleInitialGuess = totalEdible / totalMushroomsRead;
    poisonousInitialGuess = totalPoisonous / totalMushroomsRead;

    // Probabilities calc
    attributesBags.forEach((bag, bagIndex) => {

        bag.forEach((attribute, attributeIndex) => {

            attributesBags[bagIndex][attributeIndex].prob_venenoso = attribute.ocorrencias_venenoso / attribute.ocorrencias_total;
            attributesBags[bagIndex][attributeIndex].prob_comestivel = attribute.ocorrencias_comestivel / attribute.ocorrencias_total;

        })

    });

    // Test and accuracy
    let testedMushrooms = 0;
    let correctClassifications = 0;

    testingDataset.forEach(mushr => {

        let probOfBeingEdible = edibleInitialGuess;
        let probOfBeingPoisonous = poisonousInitialGuess;

        testedMushrooms++;

        let actualType = '?';
        let classifiedType = '?';

        mushr.forEach((attribute, index) => {

            if (index == 0) {
                if (attribute == 'e') {
                    actualType = 'edible';
                } else if (attribute == 'p') {
                    actualType = 'poisonous';
                } else {
                    console.log("A missing class testing data was found.");
                }
            } else {

                // searches for the attribute in the corresponding bag
                attributesBags[index].forEach(registeredAttribute => {
                    if (attribute == registeredAttribute.atributo) {
                        // add to the multiplication
                        probOfBeingEdible *= registeredAttribute.prob_comestivel;
                        probOfBeingPoisonous *= registeredAttribute.prob_venenoso;
                    }
                });

            }

        });

        // Classify
        if (probOfBeingEdible > probOfBeingPoisonous) {
            classifiedType = 'edible';
        } else {
            classifiedType = 'poisonous';
        }

        if (classifiedType == actualType) {
            correctClassifications++;
        }

    });

    let accuracy = correctClassifications / testedMushrooms * 100;

    console.log("Accuracy: " + accuracy.toFixed(2));

};

// Receives input
const retrieveMushroomData = () => {

    let mushroom = document.getElementsByTagName('select');

    return mushroom;

};

const generateAttributeList = (mushroom) => {
    let atrList = [];
    atrList.push('?');

    atrList.push(mushroom.cap_shape.value);
    atrList.push(mushroom.cap_surface.value);
    atrList.push(mushroom.cap_color.value);
    atrList.push(mushroom.bruises.value);
    atrList.push(mushroom.odor.value);
    atrList.push(mushroom.gill_attachment.value);
    atrList.push(mushroom.gill_spacing.value);
    atrList.push(mushroom.gill_size.value);
    atrList.push(mushroom.gill_color.value);
    atrList.push(mushroom.stalk_shape.value);
    atrList.push(mushroom.stalk_root.value);
    atrList.push(mushroom.stalk_surface_above_ring.value);
    atrList.push(mushroom.stalk_surface_below_ring.value);
    atrList.push(mushroom.stalk_color_below_ring.value);
    atrList.push(mushroom.stalk_color_below_ring.value);
    atrList.push(mushroom.veil_type.value);
    atrList.push(mushroom.veil_color.value);
    atrList.push(mushroom.ring_number.value);
    atrList.push(mushroom.ring_type.value);
    atrList.push(mushroom.spore_print_color.value);
    atrList.push(mushroom.population.value);
    atrList.push(mushroom.habitat.value);

    return atrList;
};

// Perform classification
const classifyAndReturnResult = () => {
    let mushroom = retrieveMushroomData();

    let mushroomAttributesList = generateAttributeList(mushroom);

    // classification logic
    let probOfBeingEdible = edibleInitialGuess;
    let probOfBeingPoisonous = poisonousInitialGuess;

    mushroomAttributesList.forEach((attribute, index) => {

        if (index != 0) {
            attributesBags[index].forEach(registeredAttribute => {
                if (attribute == registeredAttribute.atributo) {
                    probOfBeingEdible *= registeredAttribute.prob_comestivel;
                    probOfBeingPoisonous *= registeredAttribute.prob_venenoso;
                }
            });
        }

    });

    // Classify
    if (probOfBeingEdible > probOfBeingPoisonous) {
        return 1;
    } else {
        return 0;
    }
};

// Show result
const classifyMushroom = () => {
    let classification = classifyAndReturnResult();

    document.getElementById('classificationResult').innerHTML = "Resultado: " + (classification == 1 ? '<span style=\"color: #dcff8a;\">Comestível</span>' : '<span style=\"color: #ff5e29;\">Venenoso</span>');
    document.getElementById('classificationResult').style.display = 'block';
};

window.onload = function () {
    trainClassifierModel();
};