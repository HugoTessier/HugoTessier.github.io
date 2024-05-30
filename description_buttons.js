
function showVulgarized() {
    updateButtonsStyle("vulgarized_button")

    current_description = raw_data[current_id].vulgarized;
    if(mode == "english") {
        document.getElementById("description_content").textContent = current_description.english;
    } else {
        document.getElementById("description_content").textContent = current_description.french;
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function showDefinition() {
    updateButtonsStyle("definition_button")

    current_description = raw_data[current_id].definition;
    if(mode == "english") {
        document.getElementById("description_content").textContent = current_description.english;
    } else {
        document.getElementById("description_content").textContent = current_description.french;
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function showDetails() {
    updateButtonsStyle("details_button")

    current_description = raw_data[current_id].details;
    if(mode == "english") {
        document.getElementById("description_content").textContent = current_description.english;
    } else {
        document.getElementById("description_content").textContent = current_description.french;
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function showLinks() {
    updateButtonsStyle("links_button")

    current_description = null;

    let ul = `<ul style="list-style-type:none;padding:0;margin:0">${raw_data[current_id].links.map(data =>
    `<li><a href="${data}" target="_blank" rel="noopener noreferrer">${data}</a></li>`).join('')}</ul>`;
    document.getElementById("description_content").innerHTML = ul;
}

function showLinkedNodes() {
    updateButtonsStyle("linked_nodes_button")

    let ul = `<ul style="list-style-type:none;padding:0;margin:0">`;
    raw_data[current_id].edge_to.forEach(edgeToForEach);

    function edgeToForEach(edgeto) {
        if (ids.indexOf(edgeto) != -1) {
            let node_name = null;
            if(mode=='english') {
                node_name = raw_data[ids.indexOf(edgeto)].label.english;
            } else {
                node_name = raw_data[ids.indexOf(edgeto)].label.french;
            }
            ul += `<li><span class="edge-item" id="span_${edgeto}" style="color: blue; cursor: pointer">${node_name}</span></li>`
        }
    }

    ul += `</ul>`;
    document.getElementById("description_content").innerHTML = ul;

    document.querySelectorAll('.edge-item').forEach(item => {
        item.addEventListener('click', function(event) {
            network.selectNodes([item.id.replace('span_', '')], [false]);
            setDescription(ids.indexOf(item.id.replace('span_', '')));
        });
    });
    current_description = 'linked_nodes';
}

function showReferenceNodes() {
    updateButtonsStyle("reference_nodes_button")

    let ul = `<ul style="list-style-type:none;padding:0;margin:0">`;
    raw_data[current_id].referenced_by.forEach(referencedByForEach);

    function referencedByForEach(refby) {
        if (ids.indexOf(refby) != -1) {
            let node_name = null;
            if(mode=='english') {
                node_name = raw_data[ids.indexOf(refby)].label.english;
            } else {
                node_name = raw_data[ids.indexOf(refby)].label.french;
            }
            ul += `<li><span class="edge-item" id="span_${refby}" style="color: blue; cursor: pointer">${node_name}</span></li>`
        }
    }

    ul += `</ul>`;
    document.getElementById("description_content").innerHTML = ul;

    document.querySelectorAll('.edge-item').forEach(item => {
        item.addEventListener('click', function(event) {
            network.selectNodes([item.id.replace('span_', '')], [false]);
            setDescription(ids.indexOf(item.id.replace('span_', '')));
        });
    });
    current_description = 'linked_nodes';
}