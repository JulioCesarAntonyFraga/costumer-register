db = openDatabase('MyDB', '1.0', 'DataBase', 65533)

var errorNome = document.getElementById('noNameError')
var errorTel = document.getElementById('noTelError')
var errorVei = document.getElementById('noVeiError')

var errorData = document.getElementById('noDataError')
var errorTipo = document.getElementById('noTipoError')
var errorPreco = document.getElementById('noPrecoError')


function procurarClientes(){

    var tabela = document.getElementById('tabela')
    var pesq = document.getElementById('pesqName')

    var error = document.getElementById('searchError')

    var drop = document.getElementById('dropTipo')

    if(pesq.value!=''){

        error.innerHTML = ''

        var tipo = drop.options[drop.selectedIndex].value;

        tabela.innerHTML = ''

        if(tipo=='id'){showClientesById(pesq.value)}
        if(tipo=='nome'){showClientesByNome(pesq.value)}

        if(tipo=='telefone'){showClientesByTelefone(pesq.value)}   
        
        if(tipo=='aniversario'){showClientesByAniversario(pesq.value)}
    }
    else{

        error.style = 'color: red; font-size: 10pt;'
        error.innerHTML = 'Digite o que deseja pesquisar primeiro'

    }

}
function procurarHorarios(){

    var tabela = document.getElementById('tBodyHor')
    var pesq = document.getElementById('pesqName')

    var drop = document.getElementById('dropTipo')
    var tipo = drop.options[drop.selectedIndex].value;

    var error = document.getElementById('searchError')

    if(pesq.value!=''){

        tabela.innerHTML=''

        if(tipo=='id'){showHorariosById(pesq.value)}

        if(tipo=='cliente'){showHorariosByCliente(pesq.value)}

        if(tipo=='data'){showHorariosByData(pesq.value)}

        if(tipo=='hora'){showHorariosByHora(pesq.value)}      

        if(tipo=='preco'){showHorariosByPreco(pesq.value)}
        
        if(tipo=='tipo'){showHorariosByTipo(pesq.value)}
    }
    else{

        error.style = 'color: red; font-size: 10pt;'
        error.innerHTML = 'Digite o que deseja pesquisar primeiro'

    }

}
function procurarHistoricos(){

    var tabela = document.getElementById('tBodyHis')
    var pesq = document.getElementById('pesqName')

    var drop = document.getElementById('dropTipo')
    var tipo = drop.options[drop.selectedIndex].value;

    var error = document.getElementById('searchError')

    if(pesq.value!=''){

        tabela.innerHTML=''

        if(tipo=='id'){showHistoricoById(pesq.value)}

        if(tipo=='cliente'){showHistoricoByCliente(pesq.value)}

        if(tipo=='data'){showHistoricoByData(pesq.value)}

        if(tipo=='hora'){showHistoricoByHora(pesq.value)}      

        if(tipo=='preco'){showHistoricoByPreco(pesq.value)}
        
        if(tipo=='tipo'){showHistoricoByTipo(pesq.value)}
    }
    else{

        error.style = 'color: red; font-size: 10pt;'
        error.innerHTML = 'Digite o que deseja pesquisar primeiro'

    }

}



///////////CRIAR TABELAS///////////
//Cria tabela clientes
db.transaction(
    function(transaction){

        transaction.executeSql(
            'CREATE TABLE IF NOT EXISTS cliente'+
            '(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
            'nome TEXT NOT NULL, fone TEXT NOT NULL, vei TEXT NOT NULL);'
        )

    }
)

//Cria tabela horários
db.transaction(
    function(transaction){

        transaction.executeSql(
            'CREATE TABLE IF NOT EXISTS horario'+
            '(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
            'nome TEXT NOT NULL, data TEXT NOT NULL, tipo TEXT NOT NULL, preco TEXT NOT NULL, hora TEXT NOT NULL);'
        )

    }
)
//Cria tabela histórico
db.transaction(
    function(transaction){

        transaction.executeSql(
            'CREATE TABLE IF NOT EXISTS historico'+
            '(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
            'nome TEXT NOT NULL, data TEXT NOT NULL, tipo TEXT NOT NULL, preco TEXT NOT NULL, hora TEXT NOT NULL);'
        )

    }
)


///////////CLIENTES///////////
//Função que retorna uma mensagem de erro se o database tiver algum erro
function errorHandler(transaction, error){

    console.log(`Ops! Error was ${error.message} (Code ${error.code})`)

}

//Adicionar clientes ao database
function addCliente(){

    var nome = document.getElementById('inpNome').value
    var tel = document.getElementById('inpTel').value
    var vei = document.getElementById('inpVei').value

    console.log(nome)
    console.log(tel)
    console.log(vei)

    if(nome!='' && vei!='' &&  tel != ''){
        db.transaction(
            function(transaction){
                transaction.executeSql('INSERT INTO cliente (nome, fone, vei) VALUES(?,?,?)',[nome, tel, vei],null, errorHandler)
                location.reload()
                showClientes()
            }
        )
    }

    else{

        if(nome==''){
            errorNome.style = 'color: red; font-size: 10pt;'
            errorNome.innerHTML = 'Digite um NOME válido antes de continuar'
        }
        else{

            errorNome.innerHTML = ''

        }
        if(tel==''){
            errorTel.style = 'color: red; font-size: 10pt;'
            errorTel.innerHTML = 'Digite um TELEFONE válido antes de continuar'
        }
        else{

            errorTel.innerHTML = ''

        }
        if(vei==''){
            errorVei.style = 'color: red; font-size: 10pt;'
            errorVei.innerHTML = 'Digite um ANIVERSÁRIO válido antes de continuar'
        }
        else{

            errorVei.innerHTML = ''

        }

    }

}

//Mostrar os clientes na tabela
function showClientes(){

    db.transaction(

        function(transaction){

            var tableRef = document.getElementById('myTable').getElementsByTagName('tBody')[0];

            transaction.executeSql('SELECT * FROM cliente', [], function(transaction, result){
                var rows = result.rows
                var tr = ''
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id

                    //Criação de mais uma coluna
                    var newRow   = tableRef.insertRow();
                    newRow.style = "name"

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbNome  = newRow.insertCell(1);
                    var tbTel  = newRow.insertCell(2);
                    var tbVei  = newRow.insertCell(3);
                    var tbInputs  = newRow.insertCell(4);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var tel  = document.createTextNode(rows[i].fone);
                    var vei  = document.createTextNode(rows[i].vei);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -50px;"
                    inputEdit.addEventListener('click', function(){openEditWindow()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.id = "inpDelte"
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px; margin-right: -50px;"
                    
                    inputDelete.addEventListener("click", function(){
                        deleteCliente(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbNome.appendChild(nome);
                    tbTel.appendChild(tel);
                    tbVei.appendChild(vei)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}
function showClientesById(id){

    db.transaction(

        function(transaction){

            var tableRef = document.getElementById('myTable')

            transaction.executeSql('SELECT * FROM cliente WHERE id=?', [id], function(transaction, result){
                var rows = result.rows
                var tr = ''
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id

                    //Criação de mais uma coluna
                    var newRow   = tableRef.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbNome  = newRow.insertCell(1);
                    var tbTel  = newRow.insertCell(2);
                    var tbVei  = newRow.insertCell(3);
                    var tbInputs  = newRow.insertCell(4);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var tel  = document.createTextNode(rows[i].fone);
                    var vei  = document.createTextNode(rows[i].vei);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -50px;"
                    inputEdit.addEventListener('click', function(){openEditWindow()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.id = "inpDelte"
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px; margin-right: -50px;"
                    
                    inputDelete.addEventListener("click", function(){
                        deleteCliente(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbNome.appendChild(nome);
                    tbTel.appendChild(tel);
                    tbVei.appendChild(vei)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}
function showClientesByNome(nome){

    db.transaction(

        function(transaction){

            var tableRef = document.getElementById('myTable').getElementsByTagName('tBody')[0];

            transaction.executeSql('SELECT * FROM cliente WHERE nome=?', [nome], function(transaction, result){
                var rows = result.rows
                var tr = ''
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id

                    //Criação de mais uma coluna
                    var newRow   = tableRef.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbNome  = newRow.insertCell(1);
                    var tbTel  = newRow.insertCell(2);
                    var tbVei  = newRow.insertCell(3);
                    var tbInputs  = newRow.insertCell(4);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var tel  = document.createTextNode(rows[i].fone);
                    var vei  = document.createTextNode(rows[i].vei);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -50px;"
                    inputEdit.addEventListener('click', function(){openEditWindow()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.id = "inpDelte"
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px; margin-right: -50px;"
                    
                    inputDelete.addEventListener("click", function(){
                        deleteCliente(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbNome.appendChild(nome);
                    tbTel.appendChild(tel);
                    tbVei.appendChild(vei)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}
function showClientesByTelefone(telefone){

    db.transaction(

        function(transaction){

            var tableRef = document.getElementById('myTable').getElementsByTagName('tBody')[0];

            transaction.executeSql('SELECT * FROM cliente WHERE fone=?', [telefone], function(transaction, result){
                var rows = result.rows
                var tr = ''
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id

                    //Criação de mais uma coluna
                    var newRow   = tableRef.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbNome  = newRow.insertCell(1);
                    var tbTel  = newRow.insertCell(2);
                    var tbVei  = newRow.insertCell(3);
                    var tbInputs  = newRow.insertCell(4);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var tel  = document.createTextNode(rows[i].fone);
                    var vei  = document.createTextNode(rows[i].vei);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -50px;"
                    inputEdit.addEventListener('click', function(){openEditWindow()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.id = "inpDelte"
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px; margin-right: -50px;"
                    
                    inputDelete.addEventListener("click", function(){
                        deleteCliente(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbNome.appendChild(nome);
                    tbTel.appendChild(tel);
                    tbVei.appendChild(vei)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}
function showClientesByAniversario(aniversario){

    db.transaction(

        function(transaction){

            var tableRef = document.getElementById('myTable').getElementsByTagName('tBody')[0];

            transaction.executeSql('SELECT * FROM cliente WHERE vei=?', [aniversario], function(transaction, result){
                var rows = result.rows
                var tr = ''
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id

                    //Criação de mais uma coluna
                    var newRow   = tableRef.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbNome  = newRow.insertCell(1);
                    var tbTel  = newRow.insertCell(2);
                    var tbVei  = newRow.insertCell(3);
                    var tbInputs  = newRow.insertCell(4);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var tel  = document.createTextNode(rows[i].fone);
                    var vei  = document.createTextNode(rows[i].vei);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -50px;"
                    inputEdit.addEventListener('click', function(){openEditWindow()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.id = "inpDelte"
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px; margin-right: -50px;"
                    
                    inputDelete.addEventListener("click", function(){
                        deleteCliente(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbNome.appendChild(nome);
                    tbTel.appendChild(tel);
                    tbVei.appendChild(vei)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}


///////////HORÁRIOS///////////
//Adicionar os clientes no menu dos addHorários
function addInDropdown(){

    db.transaction(
        function(transaction){

            var drop = document.getElementById('myDrop')

            transaction.executeSql('SELECT * FROM cliente', [], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    var option = document.createElement('option')
                    option.text = option.value = rows[i].nome
                    drop.add(option,0)
                    console.log(rows[i].nome)

                }
            })

        }
    )

}

//Adicionar horários ao database
function addHorario(){

    var drop = document.getElementById("myDrop");

    var nome = drop.options[drop.selectedIndex].text;
    var data = document.getElementById('inpData').value
    var tipo = document.getElementById('inpTipo').value
    var preco = document.getElementById('inpPreco').value
    var hora = document.getElementById('inpHora').value

    if(tipo!='' && data!='' && preco!=''){
        db.transaction(
            function(transaction){
                transaction.executeSql('INSERT INTO horario (nome, data, tipo, preco, hora) VALUES(?,?,?,?,?)',[nome, data, tipo, preco, hora],null, errorHandler)
                location.reload()
            }
        )
    }
    else{

        if(data==''){
            errorData.style = 'color: red; font-size: 10pt;'
            errorData.innerHTML = 'Digite um HORÁRIO válido antes de continuar'
        }
        else{

            errorData.innerHTML = ''

        }
        if(tipo==''){
            errorTipo.style = 'color: red; font-size: 10pt;'
            errorTipo.innerHTML = 'Digite um TIPO válido antes de continuar'
        }
        else{

            errorTipo.innerHTML = ''

        }
        if(preco==''){
            errorPreco.style = 'color: red; font-size: 10pt;'
            errorPreco.innerHTML = 'Digite um PREÇO válido antes de continuar'
        }
        else{

            errorPreco.innerHTML = ''

        }

    }

}

//Mostrar os horários na tabela
function showHorarios(){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHor')

            transaction.executeSql('SELECT * FROM horario', [], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -20px;"
                    inputEdit.addEventListener('click', function(){openEditHor()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHorario(myId);
                    });

                    var inputDone = document.createElement ("input");   
                    inputDone.type = "image"
                    inputDone.src="../assets/images/icon_done.png"
                    inputDone.style="width: 45px; height: 37px; margin-right: -90px;"
                    inputDone.addEventListener("click", function(){
                        addHistorico(myId, myNome, myData, myTipo, myPreco, myHora);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDone)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}
function showHorariosById(id){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHor')

            transaction.executeSql('SELECT * FROM horario WHERE id=?', [id], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -20px;"
                    inputEdit.addEventListener('click', function(){openEditHor()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHorario(myId);
                    });

                    var inputDone = document.createElement ("input");   
                    inputDone.type = "image"
                    inputDone.src="../assets/images/icon_done.png"
                    inputDone.style="width: 45px; height: 37px; margin-right: -90px;"
                    inputDone.addEventListener("click", function(){
                        addHistorico(myId, myNome, myData, myTipo, myPreco, myHora);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDone)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

   
}
function showHorariosByTipo(tipo){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHor')

            transaction.executeSql('SELECT * FROM horario WHERE tipo=?', [tipo], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -20px;"
                    inputEdit.addEventListener('click', function(){openEditHor()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHorario(myId);
                    });

                    var inputDone = document.createElement ("input");   
                    inputDone.type = "image"
                    inputDone.src="../assets/images/icon_done.png"
                    inputDone.style="width: 45px; height: 37px; margin-right: -90px;"
                    inputDone.addEventListener("click", function(){
                        addHistorico(myId, myNome, myData, myTipo, myPreco, myHora);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDone)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

   
}
function showHorariosByData(data){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHor')

            transaction.executeSql('SELECT * FROM horario WHERE data=?', [data], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -20px;"
                    inputEdit.addEventListener('click', function(){openEditHor()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHorario(myId);
                    });

                    var inputDone = document.createElement ("input");   
                    inputDone.type = "image"
                    inputDone.src="../assets/images/icon_done.png"
                    inputDone.style="width: 45px; height: 37px; margin-right: -90px;"
                    inputDone.addEventListener("click", function(){
                        addHistorico(myId, myNome, myData, myTipo, myPreco, myHora);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDone)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )
}
function showHorariosByHora(hora){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHor')

            transaction.executeSql('SELECT * FROM horario WHERE hora=?', [hora], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -20px;"
                    inputEdit.addEventListener('click', function(){openEditHor()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHorario(myId);
                    });

                    var inputDone = document.createElement ("input");   
                    inputDone.type = "image"
                    inputDone.src="../assets/images/icon_done.png"
                    inputDone.style="width: 45px; height: 37px; margin-right: -90px;"
                    inputDone.addEventListener("click", function(){
                        addHistorico(myId, myNome, myData, myTipo, myPreco, myHora);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDone)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}
function showHorariosByPreco(preco){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHor')

            transaction.executeSql('SELECT * FROM horario WHERE preco=?', [preco], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -20px;"
                    inputEdit.addEventListener('click', function(){openEditHor()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHorario(myId);
                    });

                    var inputDone = document.createElement ("input");   
                    inputDone.type = "image"
                    inputDone.src="../assets/images/icon_done.png"
                    inputDone.style="width: 45px; height: 37px; margin-right: -90px;"
                    inputDone.addEventListener("click", function(){
                        addHistorico(myId, myNome, myData, myTipo, myPreco, myHora);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDone)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}
function showHorariosByCliente(cliente){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHor')

            transaction.executeSql('SELECT * FROM horario WHERE nome=?', [cliente], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputEdit = document.createElement ("input");   
                    inputEdit.type = "image"
                    inputEdit.src="../assets/images/icon_edit.png"
                    inputEdit.style="height: 30px; width: 30px; margin-bottom: 5px; margin-left: -20px;"
                    inputEdit.addEventListener('click', function(){openEditHor()})

                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHorario(myId);
                    });

                    var inputDone = document.createElement ("input");   
                    inputDone.type = "image"
                    inputDone.src="../assets/images/icon_done.png"
                    inputDone.style="width: 45px; height: 37px; margin-right: -90px;"
                    inputDone.addEventListener("click", function(){
                        addHistorico(myId, myNome, myData, myTipo, myPreco, myHora);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDone)
                    tbInputs.appendChild(inputEdit)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}



///////////DELETAR///////////

//Deletar clientes
function deleteCliente(id){

    console.log(id)

    db.transaction(
        function(transaction){
            transaction.executeSql('DELETE FROM cliente WHERE id = ?', [id]);
            location.reload()
            showClientes()
        }
    )
}

//Deletar horários
function deleteHorario(id){

    db.transaction(
        function(transaction){
            transaction.executeSql('DELETE FROM horario WHERE id = ?', [id]);
            location.reload()
            showHorarios()
        }
    )
}



///////////HISTÓRICO///////////

//Adiciona no histórico
function addHistorico(id,nome,data,tipo,preco,hora){

    db.transaction(
        function(transaction){
            transaction.executeSql('INSERT INTO historico (nome, data, tipo, preco, hora) VALUES(?,?,?,?,?)',[nome, data, tipo, preco, hora],null, errorHandler)
            transaction.executeSql('DELETE FROM horario WHERE id = ?', [id]);
            location.reload()
            showHistoricos()

        }
    )

}

//Mostra os históricos na tabela
function showHistoricos(){

    db.transaction(
        function(transaction){

            transaction.executeSql('SELECT * FROM historico', [], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id

                    var tableHor = document.getElementById('tBodyHis')
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px; margin-right: -30px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHistorico(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)

                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}
function showHistoricoById(id){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHis')

            transaction.executeSql('SELECT * FROM historico WHERE id=?', [id], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHistorico(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

   
}
function showHistoricoByTipo(tipo){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHis')

            transaction.executeSql('SELECT * FROM historico WHERE tipo=?', [tipo], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHistorico(myId);
                    });


                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

   
}
function showHistoricoByData(data){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHis')

            transaction.executeSql('SELECT * FROM historico WHERE data=?', [data], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHistorico(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )
}
function showHistoricoByHora(hora){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHis')

            transaction.executeSql('SELECT * FROM historico WHERE hora=?', [hora], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHistorico(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}
function showHistoricoByPreco(preco){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHis')

            transaction.executeSql('SELECT * FROM historico WHERE preco=?', [preco], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHistorico(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}
function showHistoricoByCliente(cliente){

    db.transaction(
        function(transaction){

            var tableHor = document.getElementById('tBodyHis')

            transaction.executeSql('SELECT * FROM historico WHERE nome=?', [cliente], function(transaction, result){
                var rows = result.rows
                for(var i = 0; i< rows.length; i++){

                    let myId = rows[i].id
                    let myNome = rows[i].nome
                    let myData = rows[i].data
                    let myTipo = rows[i].tipo
                    let myPreco = rows[i].preco
                    let myHora = rows[i].hora
                    
                    //Criação de mais uma coluna
                    var newRow   = tableHor.insertRow();

                    //Criação dos campos da tabela
                    var tbID  = newRow.insertCell(0);
                    var tbCliente  = newRow.insertCell(1);
                    var tbTipo  = newRow.insertCell(2);
                    var tbData  = newRow.insertCell(3);
                    var tbHora  = newRow.insertCell(4);
                    var tbPreco  = newRow.insertCell(5);
                    var tbInputs  = newRow.insertCell(6);

                    //Criação das variáveis que vão na tabela
                    var ID  = document.createTextNode(rows[i].id);
                    var nome  = document.createTextNode(rows[i].nome);
                    var data  = document.createTextNode(rows[i].data);
                    var hora  = document.createTextNode(rows[i].hora);
                    var tipo  = document.createTextNode(rows[i].tipo);
                    var preco  = document.createTextNode(rows[i].preco);

                    //Criação e costomização dos botões
                    var inputDelete = document.createElement ("input");   
                    inputDelete.type = "image"
                    inputDelete.src="../assets/images/false-2061132_1280.png"
                    inputDelete.style="width: 40px; height: 40px;"
                    inputDelete.addEventListener("click", function(){
                        deleteHistorico(myId);
                    });

                    //Bota os dados na tabela
                    tbID.appendChild(ID);
                    tbCliente.appendChild(nome);
                    tbData.appendChild(data);
                    tbHora.appendChild(hora);
                    tbTipo.appendChild(tipo)
                    tbPreco.appendChild(preco)
                    tbInputs.appendChild(inputDelete)

                }
            })

        }
    )

}




//Deleta os históricos da tabela
function deleteHistorico(id){

    db.transaction(
        function(transaction){
            transaction.executeSql('DELETE FROM historico WHERE id = ?', [id]);
            location.reload()
            showHistoricos()
        }
    )
}


function openEditWindow(){

    window.open('./editCliente.html','Editar Clientes','resizable=0,width=400px,height=490px')

}

function openEditHor(){

    window.open('./editHorario.html','Editar Horarios','resizable=0,width=400px,height=490px')

}