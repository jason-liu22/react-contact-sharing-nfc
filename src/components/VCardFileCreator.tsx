import Typography from "@mui/material/Typography";

function VCardFileCreator({
  firstName,
  lastName,
  title,
  email,
  mobile,
  location,
  company,
  website,
}: {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  mobile: string;
  location: string;
  company: string;
  website: string;
}) {
  const handleClick = () => {
    var file = new Blob(
      [
        `BEGIN:VCARD
VERSION:3.0
N;CHARSET=utf-8:${firstName};${lastName};;;
FN;CHARSET=utf-8:${lastName} ${firstName}
ORG;CHARSET=utf-8:${company}
TITLE;CHARSET=utf-8:${title}
email;type=internet;type=pref:${email}
TEL;type=CELL;type=VOICE;type=pref:${mobile}
ADR;type=WORK;type=pref:;;;${location} ;;;
URL:${website}
END:VCARD`,
      ],
      { type: "text/vcard;charset=utf-8" }
    );
    let downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = `${firstName}${lastName}.vcf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <Typography
      component="a"
      textAlign="center"
      color="white"
      role="button"
      tabIndex={-1}
      onClick={handleClick}
      sx={{ cursor: "pointer" }}
    >
      Download Contact file(vcf)
    </Typography>
  );
}

export default VCardFileCreator;
