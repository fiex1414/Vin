var id = document.URL.split('=')[1];

function postList(pageNr) {
    if (pageNr <= 0) return;
    if (pageNr > totalPages) return;

    $("#product_area").empty();
    $.ajax({
        url: 'https://winewebshop.azurewebsites.net/api/wines/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (posts) {
            postBuildTableRow(posts);
        }
    });
}

function postBuildTableRow(post) {
    var ret = "<div id=\"product_price\">\n" +
        "<h1>" + post.price + " DKK</h1>\n" +
        "</div>\n" +
        "<div id=\"product_title\">\n" +
        "<h2>Bourgogne</h2>\n" +
        "</div>\n" +
        "<div id=\"product_description\">\n" +
        "<p>Text about product here\n" +
        "<br/>\n" +
        "Text about product here\n" +
        "<br/>\n" +
        "Text about product here\n" +
        "</p>\n" +
        "</div>\n" +
        "\n" +
        "<div id=\"product_type\">\n" +
        "<p>Type: Red Wine</p>\n" +
        "</div>\n" +
        "\n" +
        "<div id=\"product_year\">\n" +
        "<p>Year: 1985</p>\n" +
        "</div>\n" +
        "\n" +
        "<div id=\"product_buy\">\n" +
        "<a href=\"#\">Add to bag</a>\n" +
        "</div>\n" +
        "<div id=\"product_stock\">\n" +
        "<p>8 in stock</p>\n" +
        "</div>";
    return ret;
}