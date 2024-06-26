
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
    const button_ids = ["links_button", "related_button", "reference_button"]
    button_ids.forEach((id) => {
        let current_button = document.getElementById(id);
        if (current_button) {
            if (name == id) {
                document.getElementById(id).classList.add('active');
            } else {
                document.getElementById(id).classList.remove('active');
            }
        }
    });
    Object.keys(buttons_list).forEach((id) => {
        let current_button = document.getElementById(id);
        if (current_button) {
            if (name == id) {
                document.getElementById(id).classList.add('active');
            } else {
                document.getElementById(id).classList.remove('active');
            }
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
                let substr_index = simplifyFrench(label).toUpperCase().indexOf(simplifyFrench(val).toUpperCase())
                b.innerHTML = label.substr(0, substr_index)
                b.innerHTML += "<strong>" + label.substr(substr_index, val.length) + "</strong>";
                b.innerHTML += label.substr(substr_index+val.length);
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
        prepareDescription(ids.indexOf(id));
    }
    document.getElementById('myForm').reset();
}

function darkModeEvent(isDark) {
    network_data.nodes.forEach((node) => {
        let data_entry = raw_data[ids.indexOf(node.id)];
        node.font = {'size' : 14 * (Math.log10(data_entry.complexity_level)+1)};
        if (isDark) {
            node.font['color'] = 'white';
            var colors = colors_dark;
        } else {
            node.font['color'] = 'black';
            var colors = colors_light;
        }
        if ('field' in data_entry) {
            if (data_entry.field in colors) {
                node.color = colors[data_entry.field];
            } else {
                node.color = colors['default'];
            }
        } else {
            node.color = colors['default'];
        }
        network_data.nodes.update(node);
    });
}
