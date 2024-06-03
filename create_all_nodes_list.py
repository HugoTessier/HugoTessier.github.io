import os
import json

if __name__ == '__main__':
    path = './nodes'
    filenames = {'files': [os.path.join(path, f) for f in os.listdir(path)]}
    with open('./all_nodes.json', 'w') as f:
        json.dump(filenames, f)
