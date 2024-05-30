
function setDescription(id) {
    var current_data = raw_data[id]
    var description_container = document.getElementById("description");
    description_container.style.display = "block";

    current_description = raw_data[id].vulgarized;
    current_id = id;

    updateButtonsStyle("none")

    if("vulgarized" in current_data) {
        document.getElementById("vulgarized_button").style.display = "inline-block";
        document.getElementById("vulgarized_button").style.borderStyle = "inset";
        if(mode == "english") {
            document.getElementById("description_content").textContent = current_description.english;
        } else {
            document.getElementById("description_content").textContent = current_description.french;
        }
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    } else {
        document.getElementById("vulgarized_button").style.display = "none";
    }

    if("definition" in current_data) {
        document.getElementById("definition_button").style.display = "inline-block";
    } else {
        document.getElementById("definition_button").style.display = "none";
    }

    if("details" in current_data) {
        document.getElementById("details_button").style.display = "inline-block";
    } else {
        document.getElementById("details_button").style.display = "none";
    }

    if("links" in current_data) {
        document.getElementById("links_button").style.display = "inline-block";
    } else {
        document.getElementById("links_button").style.display = "none";
    }

    if(current_data.edge_to.length != 0) {
        document.getElementById("linked_nodes_button").style.display = "inline-block";
    } else {
        document.getElementById("linked_nodes_button").style.display = "none";
    }

    if(current_data.referenced_by.length != 0) {
        document.getElementById("reference_nodes_button").style.display = "inline-block";
    } else {
        document.getElementById("reference_nodes_button").style.display = "none";
    }
}
