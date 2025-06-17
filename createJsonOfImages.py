#the intention of this file is to create a json file of the name of images in the /images directory
#requires local installation of python
import os
import json

def get_filenames(directory):
    # Get all file names in the specified directory
    filenames = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
    return filenames

#get the directory that this python file is stored in
directory = os.path.dirname(os.path.abspath(__file__))

try:
    # Open the json file in write mode
    file = open(directory + '\\imageslist.json', 'w')

    # Write the list of file names into the json file
    file.write(json.dumps(get_filenames(directory + "\\images")))

    # Close the file
    file.close()
    
    print("File saved successfully.")

#catch errors
except FileNotFoundError as e:
    print(f"Error: The specified directory or file was not found. {e}")

except PermissionError as e:
    print(f"Error: Permission denied. {e}")

except Exception as e:
    print(f"An unexpected error occurred: {e}")\

#once done, use a service such as https://bulkimagecompressor.com/ to bulk compress the image files. My settings are: quality=50 maxsize=0.01 maxwidth=300 maxheight=300
#put them in images-lite