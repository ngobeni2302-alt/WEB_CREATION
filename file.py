import qrcode

APP_URL = "http://10.142.142.81:8000/"


def main():
    print(f"Scan this QR code or open: {APP_URL}\n")
    qr = qrcode.QRCode(border=2)
    qr.add_data(APP_URL)
    qr.make(fit=True)
    qr.print_ascii(invert=True)


if __name__ == "__main__":
    main()
