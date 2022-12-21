function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

fetch('../products/menu.txt')
    .then(response => response.text())
    .then(text => {
        const lines = text.replace(/[\r]+/g, '').split("\n")
        const products = document.getElementById("products")
        let category = null
        for (let line of lines) {
            let comma_splitted = line.split(";")
            if (comma_splitted.length === 1) {
                category = create_div(["category"])
                products.appendChild(category)
                let category_title = create_div(["category-title"], comma_splitted[0])
                category.appendChild(category_title)
            } else if (comma_splitted.length >= 1) {
                let name = comma_splitted[0]
                let price = comma_splitted[1]
                let div_name = create_div(["name"].concat(comma_splitted.slice(2)), name)
                let div_price = create_div(["price"], price)
                let div_item = create_div(["item"])
                div_item.append(div_name, div_price)
                category.appendChild(div_item)
            }
        }

    })

function create_div(classes, content = null) {
    let div = document.createElement("div")
    for (let class_ of classes) {
        div.classList.add(class_)
    }
    if (content != null) {
        div.textContent = content
    }
    return div
}
