function catArticles(article) {
    var content = "";
    article.slice(1).forEach((data) => {content += data; content += " ";});
    return content;
}

function showArticle(article_key) {
    if (article_key in raw_data[current_id].articles) {
        updateButtonsStyle(article_key+"_button");
        current_section = article_key;
        let current_description = raw_data[current_id].articles[article_key];
        if (mode == "english") {
            document.getElementById("description_content").innerHTML = catArticles(current_description.english);
        } else {
            document.getElementById("description_content").innerHTML = catArticles(current_description.french);
        }
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    } else {
        updateButtonsStyle(null);
        current_section = null;
        document.getElementById("description_content").textContent = '';
    }
}

function showLinks() {
    updateButtonsStyle("links_button");

    current_section = 'links';

    let ul = `<ul style="list-style-type:none;padding:0;margin:0">${raw_data[current_id].links.map(data =>
    `<li><a href="${data}" target="_blank" rel="noopener noreferrer">${data}</a></li>`).join('')}</ul>`;
    document.getElementById("description_content").innerHTML = ul;
}


function showRelatedOrReferenceNodes(related_or_reference) {
    updateButtonsStyle(`${related_or_reference}_button`);
    current_section = related_or_reference;

    let ul = `<ul style="list-style-type:none;padding:0;margin:0">`;
    if (related_or_reference == 'related') {
        raw_data[current_id].edge_to.forEach(edgeToForEach);
    } else {
        raw_data[current_id].referenced_by.forEach(edgeToForEach);
    }

    function edgeToForEach(edgeto) {
        if (ids.indexOf(edgeto) != -1) {
            let node_name = null;
            if(mode=='english') {
                node_name = raw_data[ids.indexOf(edgeto)].label.english;
            } else {
                node_name = raw_data[ids.indexOf(edgeto)].label.french;
            }
            ul += `<li><span class="edge-item" id="span_${edgeto}" style="color: DodgerBlue; cursor: pointer">${node_name}</span></li>`
        }
    }

    ul += `</ul>`;
    document.getElementById("description_content").innerHTML = ul;

    document.querySelectorAll('.edge-item').forEach(item => {
        item.addEventListener('click', function(event) {
            network.selectNodes([item.id.replace('span_', '')], [false]);
            prepareDescription(ids.indexOf(item.id.replace('span_', '')));
        });
    });

    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
