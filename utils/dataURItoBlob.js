// La fonction prend en entrée une chaîne de caractères représentant une image en base64
export default function dataURItoBlob(dataURI) {
  // On initialise une variable byteString qui contiendra les données binaires brutes de l'image
  var byteString;
  // On vérifie si la chaîne de caractères est encodée en base64 ou en URL
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    // Si elle est encodée en base64, on la décode avec la fonction atob() et on la stocke dans byteString
    byteString = atob(dataURI.split(",")[1]);
  else
    // Sinon, on la décode avec la fonction unescape() et on la stocke dans byteString
    byteString = unescape(dataURI.split(",")[1]);

  // On sépare la partie du type MIME de la chaîne de caractères, qui est utilisée pour spécifier le type de fichier
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // On crée un tableau d'octets (Uint8Array) de la même longueur que la chaîne de caractères
  var ia = new Uint8Array(byteString.length);
  // On parcourt chaque caractère de la chaîne de caractères
  for (var i = 0; i < byteString.length; i++) {
    // On utilise charCodeAt() pour obtenir la valeur numérique ASCII de chaque caractère, qu'on stocke dans le tableau d'octets
    ia[i] = byteString.charCodeAt(i);
  }

  // On crée un objet Blob à partir du tableau d'octets et du type MIME, et on le renvoie en tant que résultat de la fonction
  return new Blob([ia], { type: mimeString });
}
