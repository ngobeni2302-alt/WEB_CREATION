import qrcode
import sys

def generate_qr():
    # Detect the active port from the user's running command (3002)
    url = "http://172.26.200.61:8000"
    
    # 1. Generate Terminal ASCII QR
    qr_ascii = qrcode.QRCode(version=1, box_size=1, border=2)
    qr_ascii.add_data(url)
    qr_ascii.make(fit=True)
    
    print("\n" + "="*40)
    print(" SCAN THIS CODE ON YOUR PHONE ".center(40, "="))
    print("="*40 + "\n")
    qr_ascii.print_ascii(invert=True)
    print("\n" + "="*40)
    print(f" URL: {url} ".center(40, "="))
    print("="*40 + "\n")

    # 2. Generate Image file for easy scanning in the chat
    qr_img = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr_img.add_data(url)
    qr_img.make(fit=True)
    img = qr_img.make_image(fill_color="black", back_color="white")
    img.save("assets/final_qr.png")

if __name__ == "__main__":
    generate_qr()
