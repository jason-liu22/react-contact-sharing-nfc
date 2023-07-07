import { QRCodeCanvas } from "qrcode.react";

function QRCode({ uid, size, id }: { uid: string; size: number, id:string }) {
  return (
    <QRCodeCanvas
      id={id}
      level={"H"}
      size={size}
      includeMargin={true}
      value={
        window.location.protocol +
        "//" +
        window.location.hostname +
        "/card/" +
        uid
      }
    />
  );
}

export default QRCode;
