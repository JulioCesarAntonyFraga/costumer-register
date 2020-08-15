var inpId = document.getElementById('inpEditId')
var inpNome = document.getElementById('inpEditNome')
var inpTel = document.getElementById('inpEditTel')
var inpVei = document.getElementById('inpEditVei')

function errorHandler(transaction, error){

    console.log(`Ops! Error was ${error.message} (Code ${error.code})`)

}

var errorId = document.getElementById('noIdError')
var errorNome = document.getElementById('noNameError')
var errorTel = document.getElementById('noTelError')
var errorVei = document.getElementById('noVeiError')


function insertPlaceholders(){

    if(inpId.value!=''){
        db.transaction(
            function(transaction){    

                transaction.executeSql('SELECT * FROM cliente WHERE id=?', [inpId.value], function(transaction, result){
                    var rows = result.rows
                    for(var i = 0; i< rows.length; i++){

                        let myId = rows[i].id
                        let myNome = rows[i].nome
                        let myTel = rows[i].fone
                        let myVei = rows[i].vei
                        
                        inpNome.value = myNome
                        inpTel.value = myTel
                        inpVei.value = myVei

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

function addEditedCliente(){

    console.log(inpTel.value)
    console.log(inpNome.value)
    console.log(inpVei.value)

    if(inpId.value!='' && inpNome.value!='' && inpVei.value!='' &&  inpTel.value != ''){
        db.transaction(
            function(transaction){
                transaction.executeSql('INSERT INTO cliente (nome, fone, vei) VALUES(?,?,?)',[inpNome.value, inpTel.value, inpVei.value],null, errorHandler)
            }
        )
        deleteEditedCliente()
    }
    else{

        if(inpId.value==''){
            errorId.style = 'color: red; font-size: 10pt;'
            errorId.innerHTML = 'Digite um ID válido antes de continuar'
        }
        else{

            errorId.innerHTML = ''

        }
        if(inpNome.value==''){
            errorNome.style = 'color: red; font-size: 10pt;'
            errorNome.innerHTML = 'Digite um NOME válido antes de continuar'
        }
        else{

            errorNome.innerHTML = ''

        }
        if(inpTel.value==''){
            errorTel.style = 'color: red; font-size: 10pt;'
            errorTel.innerHTML = 'Digite um TELEFONE válido antes de continuar'
        }
        else{

            errorTel.innerHTML = ''

        }
        if(inpVei.value==''){
            errorVei.style = 'color: red; font-size: 10pt;'
            errorVei.innerHTML = 'Digite um ANIVERSÁRIO válido antes de continuar'
        }
        else{

            errorVei.innerHTML = ''

        }

    }

}
function deleteEditedCliente(){

    db.transaction(
        function(transaction){
            transaction.executeSql('DELETE FROM cliente WHERE id = ?', [inpId.value]);
            window.close()
        }
    )
}