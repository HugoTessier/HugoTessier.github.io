function initialize_network() {

    fetch('all_nodes.json')
    .then(response => response.json())
    .then(data => {
        const filesList = data.files;
        const fetchPromises = filesList.map(fileName => {
            return fetch(fileName)
            .then(response => response.json())
            .then(fileData => {
                if (!Array.isArray(raw_data)) {
                    raw_data = [];
                }
                if (!Array.isArray(nodes)) {
                    nodes = [];
                }
                if (!Array.isArray(edges)) {
                    edges = [];
                }
                if (!Array.isArray(ids)) {
                    ids = [];
                }
                fileData.referenced_by = [];
                raw_data.push(fileData);
                nodes.push({id: fileData.id, label: fileData.label.english});
                ids.push(fileData.id);
                for (let edge_data of fileData.edge_to) {
                    edges.push({from: fileData.id,
                                to: edge_data,
                                arrows: {
                                    to: {
                                        enabled: true,
                                        type: "arrow",
                                    },
                                }
                    });
                }
            });
        });
        return Promise.all(fetchPromises);
    })
    .then(() => {
        raw_data.forEach( (data_entry) => {
            data_entry.edge_to.forEach( (edge_to) => {
                let index = ids.indexOf(edge_to);
                if (index != -1) {
                    raw_data[index].referenced_by.push(data_entry.id);
                }
            });
        });
        raw_data.forEach( (data_entry) => {
            data_entry.complexity_level = getDependencies(data_entry);
        });

        nodes.forEach((node) => {
            let data_entry = raw_data[ids.indexOf(node.id)];
            node.font = {'size' : 14 * (Math.log10(data_entry.complexity_level)+1)};
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
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
        });


        nodes_dataset = new vis.DataSet(nodes);
        edges_dataset = new vis.DataSet(edges);

        var container = document.getElementById("mynetwork");
        network_data = {
          nodes: nodes_dataset,
          edges: edges_dataset,
        };

        var options = {
            "physics": {
                "barnesHut": {
                    "springConstant": 0.015,
                    "avoidOverlap": 0.5
                },
                "stabilization": {
                    "enabled": true,
                    "iterations": 100
                }
            }
        };
        network = new vis.Network(container, network_data, options);

        network.on("stabilizationIterationsDone", function () {
            network.setOptions( { 'physics': false } );
        });

        network.on("click", function(clickProperties) {
            if(clickProperties.nodes.length == 1) {
                var id = ids.indexOf(clickProperties.nodes[0]);
                prepareDescription(id);
            } else if(clickProperties.nodes.length == 0) {
                document.getElementById("description").style.display = 'none';
                current_id = -1;
            }
        });

        if (mode == 'french') {
            toFrench();
        } else {
            toEnglish();
        }
    });
}