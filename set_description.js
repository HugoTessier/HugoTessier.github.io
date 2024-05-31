
function setPrimaryButton(id, name, button_function) {
    document.getElementById('primary_description_buttons').innerHTML += `<button class="col btn btn-primary btn-lg" id="${id}" onclick="${button_function}">${name}</button>`
}

function setSecondaryButton(id, name, button_function) {
    document.getElementById('secondary_description_buttons').innerHTML += `<button class="col btn btn-secondary btn-lg" id="${id}" onclick="${button_function}">${name}</button>`
}

function verifyEdge(id_list) {
    let found_any = false;
    id_list.forEach((id) => {
        if(ids.includes(id)) {
            found_any = true;
        }
    });
    return found_any;
}

function prepareDescription(id) {
    current_id = id;
    current_section = null;

    document.getElementById('primary_description_buttons').innerHTML = '';
    document.getElementById('secondary_description_buttons').innerHTML = '';
    document.getElementById('description_content').innerHTML = '';

    let current_data = raw_data[id];
    let description_container = document.getElementById("description");
    description_container.style.display = "block";

    buttons_list = {};

    if("links" in current_data) {
        setSecondaryButton('links_button', textTranslation['links_button'][mode], "showLinks()");
    }
    if(verifyEdge(current_data.edge_to)) {
        setSecondaryButton('related_button', textTranslation['related_button'][mode], "showRelatedOrReferenceNodes('related')");
    }
    if(verifyEdge(current_data.referenced_by)) {
        setSecondaryButton('reference_button', textTranslation['reference_button'][mode], "showRelatedOrReferenceNodes('reference')");
    }

    if ("articles" in current_data) {
        let isFirst = true;
        Object.keys(current_data.articles).forEach((key) => {
            let value = current_data.articles[key];
            setPrimaryButton(`${key}_button`, value[mode][0], `showArticle('${key}')`);
            buttons_list[`${key}_button`] = {'french':value.french[0], 'english': value.english[0]};
            if (isFirst) {
                showArticle(key);
                current_section = key;
                isFirst = false;
            }
        });
    }
}
