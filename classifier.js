var deducaoComestivelInicial = 0;
var deducaoVenenosoInicial = 0;
var mochilasDeAtributos = [];

// Training phase
const trainClassifierModel = () => {
    // Read dataset file
    let cogumelos = JSON.parse(data);

    cogumelos.forEach((elemento, index) => {
        cogumelos[index] = elemento.split(',');
    });

    let baseDeTreino = [];

    for (let i = 0; i < Math.floor(cogumelos.length * 0.66); i++) {
        baseDeTreino.push(cogumelos[i]);
    }

    let baseDeTeste = [];

    for (let i = Math.floor(cogumelos.length * 0.66); i < Math.floor(cogumelos.length); i++) {
        baseDeTeste.push(cogumelos[i]);
    }

    // Mochila de atributos
    for (let i = 0; i < 23; i++) {
        mochilasDeAtributos.push([]);
    }

    let cogumelosLidos = 0;
    let totalVenenoso = 0;
    let totalComestivel = 0;

    //Para cada cogumelo na lista
    baseDeTreino.forEach(cog => {

        cogumelosLidos++;

        let tipo = '?';

        cog.forEach((atributo, index) => {

            //Pega o tipo do cogumelo
            if (index == 0) {
                if (atributo == 'e') {
                    tipo = 'comestivel';
                    totalComestivel++;
                } else if (atributo == 'p') {
                    tipo = 'venenoso';
                    totalVenenoso++;
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

    // Qual a chance de qualquer coisa ser venenoso ou comestível?
    deducaoComestivelInicial = totalComestivel / cogumelosLidos;
    deducaoVenenosoInicial = totalVenenoso / cogumelosLidos;

    //Cálculo das probabilidades
    mochilasDeAtributos.forEach((mochila, indexMochila) => {

        mochila.forEach((atributo, indexAtributo) => {

            mochilasDeAtributos[indexMochila][indexAtributo].prob_venenoso = atributo.ocorrencias_venenoso / atributo.ocorrencias_total;
            mochilasDeAtributos[indexMochila][indexAtributo].prob_comestivel = atributo.ocorrencias_comestivel / atributo.ocorrencias_total;

        })

    });

    // Testa e retorna acurácia
    let cogumelosTestados = 0;
    let classificacoesCorretas = 0;

    baseDeTeste.forEach(cog => {

        probabilidadeDeSerComestivel = deducaoComestivelInicial;
        probabilidadeDeSerVenenoso = deducaoVenenosoInicial;

        cogumelosTestados++;

        let tipoReal = '?';
        let tipoClassificado = '?';

        cog.forEach((atributo, index) => {

            if (index == 0) {
                if (atributo == 'e') {
                    tipoReal = 'comestivel';
                } else if (atributo == 'p') {
                    tipoReal = 'venenoso';
                } else {
                    console.log("A missing class testing data was found.");
                }
            } else {

                // procura o atributo na mochila correspondente
                mochilasDeAtributos[index].forEach(atributoRegistrado => {
                    if (atributo == atributoRegistrado.atributo) {
                        //adiciona na multiplicação de probablidade
                        probabilidadeDeSerComestivel *= atributoRegistrado.prob_comestivel;
                        probabilidadeDeSerVenenoso *= atributoRegistrado.prob_venenoso;
                    }
                });

            }

        });

        // Classifica
        if (probabilidadeDeSerComestivel > probabilidadeDeSerVenenoso) {
            tipoClassificado = 'comestivel';
        } else {
            tipoClassificado = 'venenoso';
        }

        if (tipoClassificado == tipoReal) {
            classificacoesCorretas++;
        }

    });

    let acuracia = classificacoesCorretas / cogumelosTestados * 100;

    console.log("Acurácia: " + acuracia.toFixed(2));

};

// Receives input
const retrieveMushroomData = () => {

    let mushroom = document.getElementsByTagName('select');

    console.log(mushroom);

    return mushroom;

};

// Perform classification
const classifyAndReturnResult = () => {

    // Fazer: lógica da classificação

    /*
    let mushroom = retrieveMushroomData();

    // classification logic
    probabilidadeDeSerComestivel = deducaoComestivelInicial;
    probabilidadeDeSerVenenoso = deducaoVenenosoInicial;

    mushroom.forEach((atributo, index) => {

        // procura o atributo na mochila correspondente
        mochilasDeAtributos[index].forEach(atributoRegistrado => {
            if (atributo == atributoRegistrado.atributo) {
                //adiciona na multiplicação de probablidade
                probabilidadeDeSerComestivel *= atributoRegistrado.prob_comestivel;
                probabilidadeDeSerVenenoso *= atributoRegistrado.prob_venenoso;
            }
        });

    });

    // Classifica
    if (probabilidadeDeSerComestivel > probabilidadeDeSerVenenoso) {
        return 1;
    } else {
        return 0;
    }

    // return result (edible (1) - poisonous (0))
    return -1;
    */

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