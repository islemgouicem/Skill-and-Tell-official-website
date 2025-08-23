from PIL import Image
import os

# Input and output folders
input_folder = "."
output_folder = "."

os.makedirs(output_folder, exist_ok=True)

# Compression settings
QUALITY = 85  # 100 = no loss, 85 is good balance for web

for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".jpeg", ".png")):
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path)
        
        output_path = os.path.join(output_folder, filename)

        if filename.lower().endswith((".jpg", ".jpeg")):
            img.save(output_path, "JPEG", optimize=True, quality=QUALITY)
        else:  # PNG
            img.save(output_path, "PNG", optimize=True)

        print(f"Compressed: {filename}")
