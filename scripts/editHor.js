var inpId = document.getElementById('inpEditId')
var inpData = document.getElementById('inpEditData')
var inpHora = document.getElementById('inpEditHora')
var inpTipo = document.getElementById('inpEditTipo')
var inpPreco = document.getElementById('inpEditPreco')

function errorHandler(transaction, error){

    console.log(`Ops! Error was ${error.message} (Code ${error.code})`)

}

var errorId = document.getElementById('noIdError')
var errorData = document.getElementById('noDataError')
var errorHora = document.getElementById('noHoraError')
var errorTipo = document.getElementById('noTipoError')
var errorPreco = document.getElementById('noPrecoError')


function insertPlaceholders(){


    if(inpId.value!=''){

        errorId.innerHTML = ''

        db.transaction(
            function(transaction){    

                transaction.executeSql('SELECT * FROM horario WHERE id=?', [inpId.value], function(transaction, result){
                    var rows = result.rows
                    for(var i = 0; i< rows.length; i++){

                        let myId = rows[i].id
                        let myNome = rows[i].nome
                        let myData = rows[i].data
                        let myHora = rows[i].hora
                        let myTipo = rows[i].tipo
                        let myPreco = rows[i].preco
                        
                        inpData.value = myData
                        inpTipo.value = myTipo
                        inpPreco.value = myPreco
                        inpHora.value = myHora

                    }
                })

            }
        )

    }
    else{

        errorId.style = 'color: red; font-size: 10pt;'
        errorId.innerHTML = 'Digite um ID válido antes de continuar'

    }
}

function addEditedHor(){

    var drop = document.getElementById("myDrop");

    var nome = drop.options[drop.selectedIndex].text;

    if(inpId.value!='' && inpTipo.value!='' && inpData.value!='' && inpPreco.value !='' && inpHora.value !=''){
        db.transaction(
            function(transaction){
                transaction.executeSql('INSERT INTO horario (nome, data, tipo, preco, hora) VALUES(?,?,?,?,?)',[nome, inpData.value, inpTipo.value, inpPreco.value, inpHora.value],null, errorHandler)
            }
        )
        deleteEditedHor()
    }
    else{

        if(inpId.value==''){
            errorId.style = 'color: red; font-size: 10pt;'
            errorId.innerHTML = 'Digite um ID válido antes de continuar'
        }
        else{

            errorId.innerHTML = ''

        }
        if(inpData.value==''){
            errorData.style = 'color: red; font-size: 10pt;'
            errorData.innerHTML = 'Digite uma DATA válida antes de continuar'
        }
        else{

            errorData.innerHTML = ''

        }
        if(inpData.value==''){
            errorHora.style = 'color: red; font-size: 10pt;'
            errorHora.innerHTML = 'Digite uma HORA válida antes de continuar'
        }
        else{

            errorHora.innerHTML = ''

        }
        if(inpTipo.value==''){
            errorTipo.style = 'color: red; font-size: 10pt;'
            errorTipo.innerHTML = 'Digite um TIPO válido antes de continuar'
        }
        else{

            errorTipo.innerHTML = ''

        }
        if(inpPreco.value==''){
            errorPreco.style = 'color: red; font-size: 10pt;'
            errorPreco.innerHTML = 'Digite um VALOR válido antes de continuar'
        }
        else{

            errorPreco.innerHTML = ''

        }

    }

}
function deleteEditedHor(){

    db.transaction(
        function(transaction){
            transaction.executeSql('DELETE FROM horario WHERE id = ?', [inpId.value]);
            window.close()
        }
    )
}