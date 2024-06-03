function updateButtonsTranslation() {
    Object.keys(textTranslation).forEach((key) => {
        let value = textTranslation[key];
        let element = document.getElementById(key);
        if (element) {
            if ('placeholder' in element) {
                element.placeholder = value[mode];
            } else if ('textContent' in element) {
                element.textContent = value[mode];
            } else if ('value' in element) {
                element.value = value[mode];
            }
        }
    });
}

function updateDescriptionLanguage() {
    if (current_id != -1) {
        let current_data = raw_data[current_id];

        if (current_section in current_data.articles) {
            document.getElementById("description_content").innerHTML = catArticles(current_data.articles[current_section][mode]);
        } else if (current_section == 'related' || current_section == 'reference') {
            document.querySelectorAll('.edge-item').forEach(item => {
                item.textContent = raw_data[ids.indexOf(item.id.replace('span_', ''))].label[mode];
            });
        }
    }
}

function updateNodesLabels() {
    nodes_dataset.forEach((item) => {
        let id = ids.indexOf(item.id);
        network_data.nodes.update({"id":raw_data[id].id, "label":raw_data[id].label[mode]});
    });
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function updateArticleButtons() {
    Object.keys(buttons_list).forEach((key) => {
        let value = buttons_list[key];
        document.getElementById(key).textContent = value[mode];
    });
}

function toFrench() {
    mode = "french";

    document.getElementById("english_button").classList.remove('active');
    document.getElementById("french_button").classList.add('active');

    updateButtonsTranslation();
    updateDescriptionLanguage();
    updateNodesLabels();
    updateArticleButtons();
}

function toEnglish() {
    mode = "english";

    document.getElementById("french_button").classList.remove('active');
    document.getElementById("english_button").classList.add('active');

    updateButtonsTranslation();
    updateDescriptionLanguage();
    updateNodesLabels();
    updateArticleButtons();
}
