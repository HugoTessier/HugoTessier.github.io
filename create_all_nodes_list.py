import os
import json

if __name__ == '__main__':
    filenames = {'files': []}


    def parse_folder(path):
        for f in os.listdir(path):
            file_path = os.path.join(path, f)
            if os.path.isdir(file_path):
                parse_folder(file_path)
            elif file_path.endswith('.json'):
                filenames['files'].append(file_path)
            else:
                pass


    parse_folder('./nodes')
    with open('./all_nodes.json', 'w') as f:
        json.dump(filenames, f)
