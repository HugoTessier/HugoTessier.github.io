
function getDependencies(data_element) {
    let reviewed_nodes = {};
    function parseElement(element) {
        if (element.id in reviewed_nodes) {
            return reviewed_nodes[element.id];
        }
        reviewed_nodes[element.id] = [element.id];

        if (element.referenced_by.length != 0) {
            element.referenced_by.forEach((id) => {
                index = ids.indexOf(id);
                if (index != -1) {
                    let parsed = parseElement(raw_data[index]);
                    parsed.forEach((p) => {
                        if (!reviewed_nodes[element.id].includes(p)) {
                            reviewed_nodes[element.id].push(p);
                        }
                    });
                }
            });
        }
        return reviewed_nodes[element.id];
    }

    return parseElement(data_element).length;
}

function updateButtonsStyle(name) {
    const button_ids = ['vulgarized_button', "definition_button", "details_button", "links_button", "linked_nodes_button", "reference_nodes_button"]
    button_ids.forEach((id) => {
        if (name == id) {
            document.getElementById(id).classList.add('active');
        } else {
            document.getElementById(id).classList.remove('active');
        }
    });
}


function autocomplete() {
    var inp = document.getElementById("formInput");
    var currentFocus;

    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < raw_data.length; i++) {
            let element = raw_data[i];
            let label;
            if (mode == 'french') {
                label = element.label.french;
            } else {
                label = element.label.english;
            }
            if (simplifyFrench(label).toUpperCase().includes(simplifyFrench(val).toUpperCase())) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + label.substr(0, val.length) + "</strong>";
                b.innerHTML += label.substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + label + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
              if (x) x[currentFocus].click();
            }
            document.getElementById('formSubmit').click();
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function simplifyFrench(frenchStr) {
        return frenchStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('œ', 'oe')
    }

function formSelectAction() {
    const input_label = document.getElementById('formInput').value;
    let id = null;
    for (i = 0; i < raw_data.length; i++) {
        let label;
        if (mode == 'french') {
            label = raw_data[i].label.french;
        } else {
            label = raw_data[i].label.english;
        }
        if (simplifyFrench(label).toUpperCase() == simplifyFrench(input_label).toUpperCase()) {
            id = raw_data[i].id;
            break;
        }
    }
    if (id != null) {
        network.selectNodes([id], [false]);
        setDescription(ids.indexOf(id));
    }
    document.getElementById('myForm').reset();
}