

function toFrench() {
    mode = "french";
    document.getElementById("english_button").classList.remove('active');
    document.getElementById("french_button").classList.add('active');

    document.getElementById("french_button").textContent = "Français";
    document.getElementById("english_button").textContent = "Anglais";

    document.getElementById("vulgarized_button").textContent = "Vulgarisé";
    document.getElementById("definition_button").textContent = "Définition";
    document.getElementById("details_button").textContent = "Détails";
    document.getElementById("links_button").textContent = "Liens";
    document.getElementById("linked_nodes_button").textContent = "Dépend de...";
    document.getElementById("reference_nodes_button").textContent = "Référencé par...";

    document.getElementById("formSubmit").value = "Envoyer";
    document.getElementById("formInput").placeholder = "Rechercher une notion...";

    if(current_description != null && typeof current_description != 'string'  && typeof current_description != 'array') {
        document.getElementById("description_content").textContent = current_description.french;
    } else if(current_description == 'linked_nodes') {
        document.querySelectorAll('.edge-item').forEach(item => {
            item.textContent = raw_data[ids.indexOf(item.id.replace('span_', ''))].label.french;
        });
    }

    nodes_dataset.forEach(frenchForEach);

    function frenchForEach(item) {
        var id = ids.indexOf(item.id);
        network_data.nodes.update({"id":raw_data[id].id, "label":raw_data[id].label.french});
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function toEnglish() {
    mode = "english";
    document.getElementById("english_button").classList.add('active');
    document.getElementById("french_button").classList.remove('active');

    document.getElementById("french_button").textContent = "French";
    document.getElementById("english_button").textContent = "English";

    document.getElementById("vulgarized_button").textContent = "Vulgarized";
    document.getElementById("definition_button").textContent = "Definition";
    document.getElementById("details_button").textContent = "Details";
    document.getElementById("links_button").textContent = "Links";
    document.getElementById("linked_nodes_button").textContent = "Related to...";
    document.getElementById("reference_nodes_button").textContent = "Referenced by...";

    document.getElementById("formSubmit").value = "Submit";
    document.getElementById("formInput").placeholder = "Search for a notion...";

    if(current_description != null && typeof current_description != 'string' && typeof current_description != 'array') {
        document.getElementById("description_content").textContent = current_description.english;
    } else if(current_description == 'linked_nodes') {
        document.querySelectorAll('.edge-item').forEach(item => {
            item.textContent = raw_data[ids.indexOf(item.id.replace('span_', ''))].label.english;
        });
    }

    nodes_dataset.forEach(englishForEach);

    function englishForEach(item) {
        var id = ids.indexOf(item.id);
        network_data.nodes.update({"id":raw_data[id].id, "label":raw_data[id].label.english});
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
