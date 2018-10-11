function postSingleWine(Wine) {
    $('#Wine-table tbody').append(createTableRow(Wine));
}

function loadAllWines() {
    $.ajax({
        dataType: 'json',
        url: 'https://winewebshop.azurewebsites.net/api/wines/?all=true',
        success: wines => postListSuccess(wines.wines)
    })
}

function postListSuccess(wines) {
    console.log(wines);
    $('#Wine-table tbody').html('');
    $.each(wines, (index, wine) => {
        $('#Wine-table tbody').append(createTableRow(wine))
    })
}

function createTableRow(Wine) {
    var row = `<tr id="tr${Wine.id}">
  <td>${Wine.id}</td>
  <td>${Wine.name}</td>
  <td>${Wine.price}</td>
  <td>${Wine.description}</td>
  <td>${Wine.stock}</td>
  <td>${Wine.PicUrl}</td>
  <td>N/A</td>
  <td>
  <button onclick="deleteWine(${Wine.id})">DELETE</button>
  </td>
  </tr>`
    return row

    //   <button onclick="editWineLoad(${Wine.id})">EDIT</button>
}

function deleteWine(id) {
    $.ajax({
        url: "https://winewebshop.azurewebsites.net/api/wines/" + id,
        type: 'DELETE',
        data: JSON.stringify({
            "id": id
        }),
        processData: false,
        contentType: 'application/json',
        success: function (comments) {
            success: $(`#Wine-table tbody #tr${id}`).html('')

        }
    });
}


$(function () {

    $("#loadAllWines-button").click(() => {
        loadAllWines();
    })
    $("#createWine-button").click(() => {
        createNewWine();
    })

    $("#editWine-button").click(() => {
        editWine($("#editID").val());
    })

    $("#saveEdit").click(() => {
        saveEdits($("#EditID").val());
    })

})

function createNewWine() {
    $.ajax({
        dataType: 'json',
        url: 'https://winewebshop.azurewebsites.net/api/wines/',
        contentType: 'application/json',
        type: 'post',
        data: JSON.stringify({
            "name": $("#cName").val(),
            "stock": $("#cStock").val(),
            "price": $("#cPrice").val(),
            "description": $("#cDescription").val(),
            "type": {"id": $("#cType").val()},
            "picture": $("#cURL").val()
        }),
        processData: false,
        success: data => {
            postSingleWine(data)
            $("#cName").val("Cheetah Wines")
            $("#cStock").val("")
            $("#cPrice").val("")
            $("#cDescription").val("")
            $("#cURL").val("")
        },
        error: http => alert(`${http.responseText}`)
    })
}

function editWine(id) {
    loadWineOnId(id);
}

function loadWineOnId(id) {
    $.ajax({
        dataType: 'json',
        url: `https://winewebshop.azurewebsites.net/api/wines/${id}`,
        //success: Wine => makeRowEditable(Wine)
        success: Wine => createEditFields(Wine)
    })
}

function createEditFields(Wine) {
    $("#editDiv").html('').append(`
                <label>Brand: <input id="eName" value="${Wine.name}"></label>
                <label>Model: <input id="eStock" value="${Wine.stock}"></label>
                <label>Price: <input id="ePrice" type="number" min="1" value="${Wine.price}"></label>
                <label>Description: <input id="eDescription" value="${Wine.description}"></label>
                <label>Gender: <select id="eType" value="${Wine.type.id}">
                    <option value="1">Red</option>
                    <option value="2">Rosé</option>
                    <option value="3">White</option>
                </select></label>
                <label>URL:<input id="eURL" value="${Wine.picUrl}"></label>
                <br>
    `)
}

function saveEdits(id) {
    $.ajax({
        dataType: 'json',
        url: 'https://winewebshop.azurewebsites.net/api/wines/'+ id,
        contentType: 'application/json',
            type: 'PUT',
        data: JSON.stringify({
            "name": $("#eName").val(),
            "stock": $("#eStock").val(),
            "price": $("#ePrice").val(),
            "description": $("#eDescription").val(),
            "type": {"id": $("#eType").val()},
            "picture": $("#eURL").val()
        }),
        processData: false,
        success: data => {
            postSingleWine(data)
            $("#eName").val("Cheetah Wines")
            $("#eStock").val("")
            $("#ePrice").val("")
            $("#eDescription").val("")
            $("#eURL").val("")
        },
        error: http => alert(`${http.responseText}`)
    })
}

/*function getSizes(Wine){

    var sizeRows = '';

    $.each(Wine.sizes, (index, size) => {
        sizeRows += `
        <tr> 
            <td>${size.size.sizeNumber}</td>
            <td>${size.stock}</td>
         </tr>
        `
    })

    return  ` 
                        <table id="size-table-${Wine.id}" class="table">
                            <thead>
                            <tr>
                                <tr>Size</tr>
                                <tr>Stock</tr>
                            </tr>
                            </thead>
                            <tbody>
                                ${sizeRows}
                            </tbody>
                        </table>
                    `

}*/
/*function editWineLoad(id){
    makeRowEditable(loadWineOnId(id))
}*/
/*function makeRowEditable(Wine){
    $(`#tr${Wine.id}`).html('').append(`
        <td>${Wine.id}</td>
        <td><input id = "eBrand" value="${Wine.brand}"></td>
        <td><input id = "eModel" value="${Wine.model}"></td>
        <td><input id = "ePrice" value="${Wine.price}"></td>
        <td><input id = "eGender" value="${Wine.gender}"></td>
        <td><input id = "eDescription" value="${Wine.description}"></td>
        <td>TO BE IMPL</td>
        <td><button>SAVE</button></td>
    `);
}*/