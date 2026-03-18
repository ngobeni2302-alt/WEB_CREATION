import qrcode
import socket
import sys
import os

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

def generate_qr():
    if len(sys.argv) > 1:
        url = sys.argv[1]
    else:
        ip = get_ip()
        url = f"http://{ip}:8000/app.html"
    
    # 1. Generate Terminal ASCII QR
    qr_ascii = qrcode.QRCode(version=1, box_size=1, border=2)
    qr_ascii.add_data(url)
    qr_ascii.make(fit=True)
    
    print("\n" + "="*40)
    print(" SCAN THIS TO OPEN ON YOUR PHONE ".center(40, "="))
    print("="*40 + "\n")
    qr_ascii.print_ascii(invert=True)
    print("\n" + "="*40)
    print(f" URL: {url} ".center(40, "="))
    print("="*40 + "\n")

    # 2. Generate Image file
    qr_img = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr_img.add_data(url)
    qr_img.make(fit=True)
    img = qr_img.make_image(fill_color="black", back_color="white")
    
    if not os.path.exists("assets"):
        os.makedirs("assets")
    img.save("assets/final_qr.png")

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    generate_qr()
