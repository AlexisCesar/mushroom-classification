// Training phase
const trainClassifierModel = () => {
    // Read dataset file
    let cogumelos = JSON.parse(data);

    cogumelos.forEach((elemento, index) => {
        cogumelos[index] = elemento.split(',');
    });

    let baseDeTreino = [];

    for(let i = 0; i < Math.floor(cogumelos.length * 0.66); i++) {
        baseDeTreino.push(cogumelos[i]);
    }

    let baseDeTeste = [];

    for(let i = Math.floor(cogumelos.length * 0.66); i < Math.floor(cogumelos.length); i++) {
        baseDeTeste.push(cogumelos[i]);
    }

    //console.log(cogumelos);

    console.log("Training classifier...");

    // Mochila de atributos
    var mochilasDeAtributos = []; // [{'x', 100, 25, 75}])

    for (let i = 0; i < 23; i++) {
        mochilasDeAtributos.push([]);
    }

    let cogumelosLidos = 0;

    //Para cada cogumelo na lista
    baseDeTreino.forEach(cog => {

        cogumelosLidos++;

        let tipo = '?';

        cog.forEach((atributo, index) => {

            //console.log(index);

            //Pega o tipo do cogumelo
            if (index == 0) {
                if (atributo == 'e') {
                    tipo = 'comestivel';
                } else if (atributo == 'p') {
                    tipo = 'venenoso';
                } else {
                    console.log("A missing class training data was found.");
                }
            } else {

                let jaCadastrado = false;
                let jaCadastradoIndex = -1;


                mochilasDeAtributos[index].forEach((atributoCadastrado, index) => {
                    if (atributo == atributoCadastrado.atributo) {
                        jaCadastrado = true;
                        jaCadastradoIndex = index;
                    }
                });


                if (!jaCadastrado) {
                    //Adiciona o atributo a mochila de atributos
                    if (tipo == 'comestivel') {
                        mochilasDeAtributos[index].push({
                            atributo: atributo,
                            ocorrencias_total: 3,
                            ocorrencias_venenoso: 1, //black box
                            ocorrencias_comestivel: 2
                        })
                    } else {
                        mochilasDeAtributos[index].push({
                            atributo: atributo,
                            ocorrencias_total: 3,
                            ocorrencias_venenoso: 2,
                            ocorrencias_comestivel: 1 //black box
                        })
                    }
                } else {
                    mochilasDeAtributos[index][jaCadastradoIndex].ocorrencias_total++;
                    tipo == 'venenoso' ? mochilasDeAtributos[index][jaCadastradoIndex].ocorrencias_venenoso++ : mochilasDeAtributos[index][jaCadastradoIndex].ocorrencias_comestivel++;
                }


            }


        });

    });    

    console.log(cogumelosLidos);
    console.log(mochilasDeAtributos);
    
    //Cálculo das probabilidades
    mochilasDeAtributos.forEach((mochila, indexMochila) => {

        mochila.forEach((atributo, indexAtributo) => {
            
            mochilasDeAtributos[indexMochila][indexAtributo].prob_venenoso = atributo.ocorrencias_venenoso / atributo.ocorrencias_total;
            mochilasDeAtributos[indexMochila][indexAtributo].prob_comestivel = atributo.ocorrencias_comestivel / atributo.ocorrencias_total;
        
        })

    });

    // Testa e retorna acurácia

};

// Receives input
const retrieveMushroomData = () => {

    let mushroom = document.getElementsByTagName('select');


    console.log(mushroom);

    console.log('*****************');

    console.log(mushroom.cap_shape.value);

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